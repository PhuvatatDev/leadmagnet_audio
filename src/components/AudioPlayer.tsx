'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { setAudioCompleted, getAudioCompleted, getAudioProgress, setAudioProgress } from '@/lib/storage';

interface AudioPlayerProps {
  src: string;
  title?: string;
  onComplete?: () => void;
}

export default function AudioPlayer({ src, title = 'Audio exclusif', onComplete }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [maxListenedTime, setMaxListenedTime] = useState(0);
  const isSeekingRef = useRef(false);
  const hasRestoredProgressRef = useRef(false);

  // Vérifier si l'audio a déjà été complété + charger la progression sauvegardée
  useEffect(() => {
    const alreadyCompleted = getAudioCompleted();
    if (alreadyCompleted) {
      setIsCompleted(true);
      setMaxListenedTime(Infinity); // Permet de naviguer partout
    } else {
      // Charger la progression sauvegardée
      const savedProgress = getAudioProgress();
      if (savedProgress > 0) {
        setMaxListenedTime(savedProgress);
        hasRestoredProgressRef.current = true;
        // Positionner l'audio une fois chargé
        const audio = audioRef.current;
        if (audio) {
          audio.currentTime = savedProgress;
        }
      }
    }
  }, []);

  // Positionner l'audio quand les métadonnées sont chargées (pour la reprise)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isCompleted) return;

    const handleCanPlay = () => {
      // Ne pas reset pendant un seek délibéré
      if (isSeekingRef.current) return;

      // Restaurer la progression UNE SEULE FOIS au chargement initial
      if (hasRestoredProgressRef.current) return;

      const savedProgress = getAudioProgress();
      if (savedProgress > 0 && audio.currentTime < savedProgress) {
        audio.currentTime = savedProgress;
        hasRestoredProgressRef.current = true;
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    return () => audio.removeEventListener('canplay', handleCanPlay);
  }, [isCompleted]);

  // Cleanup effect - sauvegarder quand on quitte la page
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        // Sauvegarder la progression avant de quitter
        if (audio.currentTime > 0 && !getAudioCompleted()) {
          setAudioProgress(audio.currentTime);
        }
        audio.pause();
      }
    };
  }, []);

  // Format time mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle time update
  const lastSavedRef = useRef(0);
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ne pas mettre à jour pendant un seek (évite les race conditions)
    if (isSeekingRef.current) return;

    setCurrentTime(audio.currentTime);

    // Track max listened time (anti-skip)
    if (audio.currentTime > maxListenedTime) {
      setMaxListenedTime(audio.currentTime);

      // Sauvegarder la progression toutes les 5 secondes
      if (audio.currentTime - lastSavedRef.current >= 5) {
        setAudioProgress(audio.currentTime);
        lastSavedRef.current = audio.currentTime;
      }
    }
  }, [maxListenedTime]);

  // Handle seeking (libre si complété, sinon peut revenir en arrière mais pas avancer)
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    // Utiliser e.currentTarget pour avoir le div parent (la barre complète)
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = clickPercent * duration;

    // Si audio déjà complété → seeking libre
    // Sinon → peut aller jusqu'à maxListenedTime (retour en arrière OK)
    if (isCompleted || seekTime <= maxListenedTime) {
      const wasPlaying = !audio.paused;

      // Marquer qu'on est en train de seek (évite le reset par canplay)
      isSeekingRef.current = true;

      // Pause, seek, puis reprend
      audio.pause();
      audio.currentTime = seekTime;

      // Stocker la position cible
      const targetTime = seekTime;

      // Attendre que le seek soit effectif avant de reprendre
      const handleSeeked = () => {
        audio.removeEventListener('seeked', handleSeeked);

        // Forcer la position une deuxième fois si nécessaire
        if (Math.abs(audio.currentTime - targetTime) > 0.5) {
          audio.currentTime = targetTime;
        }

        setCurrentTime(targetTime);

        // Petit délai pour s'assurer que le seek est stable
        setTimeout(() => {
          // Re-vérifier la position avant de reprendre
          if (Math.abs(audio.currentTime - targetTime) > 0.5) {
            audio.currentTime = targetTime;
          }
          isSeekingRef.current = false;
          if (wasPlaying) {
            audio.play();
          }
        }, 100);
      };
      audio.addEventListener('seeked', handleSeeked);
    }
  };

  // Handle audio ended
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setIsCompleted(true);
    setAudioCompleted(true);
    onComplete?.();
  }, [onComplete]);

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  // Media Session API - permet la lecture en arrière-plan sur mobile
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: 'La Tarot Académie',
        album: 'Guidance Spirituelle',
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioRef.current?.play();
        setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
    }

    return () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
      }
    };
  }, [title]);

  // Play/Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      // Sauvegarder la progression quand on met en pause
      if (!isCompleted) {
        setAudioProgress(audio.currentTime);
      }
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Audio element (hidden) */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Player card */}
      <div className="bg-cream rounded-2xl p-6 shadow-md border border-beige">
        {/* Title */}
        <h2 className="text-lg font-semibold text-secondary mb-4 text-center">
          {title}
        </h2>

        {/* Progress bar */}
        <div
          className="relative h-3 bg-beige rounded-full cursor-pointer mb-4 overflow-hidden"
          onClick={handleSeek}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Max listened indicator (darker) */}
          <div
            className="absolute h-full bg-primary-muted rounded-full transition-all duration-100 pointer-events-none"
            style={{ width: `${(maxListenedTime / duration) * 100 || 0}%` }}
          />
          {/* Current position (gold) */}
          <div
            className="absolute h-full gradient-gold rounded-full transition-all duration-100 pointer-events-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between text-sm text-gray mb-6">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Play/Pause button */}
        <div className="flex justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center shadow-gold hover:scale-105 transition-transform focus-ring"
            aria-label={isPlaying ? 'Pause' : 'Lecture'}
          >
            {isPlaying ? (
              // Pause icon
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play icon (décalé visuellement pour paraître centré)
              <svg className="w-6 h-6 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Anti-skip message */}
        {!isCompleted && maxListenedTime < duration * 0.9 && (
          <p className="text-xs text-gray text-center mt-4">
            Écoute l'audio en entier pour débloquer ton tirage
          </p>
        )}

        {/* Checkbox pour utilisateurs qui ont déjà écouté */}
        {!isCompleted && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setIsCompleted(true);
                  setMaxListenedTime(Infinity);
                  setAudioCompleted(true);
                  onComplete?.();
                }
              }}
              className="w-4 h-4 rounded border-2 border-beige bg-cream text-primary focus:ring-primary focus:ring-2 cursor-pointer"
            />
            <span className="text-xs text-gray">
              Je confirme que j'ai écouté tout l'audio
            </span>
          </div>
        )}
      </div>

      {/* Message de complétion */}
      {isCompleted && (
        <div className="mt-6 text-center animate-fade-in">
          <p className="text-lg text-secondary font-medium">
            ✓ Audio complété ! Ton tirage est prêt.
          </p>
        </div>
      )}
    </div>
  );
}
