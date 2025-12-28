'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { setAudioCompleted, getAudioCompleted } from '@/lib/storage';

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

  // Vérifier si l'audio a déjà été complété (permet le seeking libre)
  useEffect(() => {
    const alreadyCompleted = getAudioCompleted();
    if (alreadyCompleted) {
      setIsCompleted(true);
      setMaxListenedTime(Infinity); // Permet de naviguer partout
    }
  }, []);

  // Cleanup effect
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
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
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);

    // Track max listened time (anti-skip)
    if (audio.currentTime > maxListenedTime) {
      setMaxListenedTime(audio.currentTime);
    }
  }, [maxListenedTime]);

  // Handle seeking (libre si complété, sinon limité au max écouté)
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const seekTime = clickPercent * duration;

    // Si audio déjà complété → seeking libre, sinon limité
    if (isCompleted || seekTime <= maxListenedTime) {
      audio.currentTime = seekTime;
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
            className="absolute h-full bg-primary-muted rounded-full transition-all duration-100"
            style={{ width: `${(maxListenedTime / duration) * 100 || 0}%` }}
          />
          {/* Current position (gold) */}
          <div
            className="absolute h-full gradient-gold rounded-full transition-all duration-100"
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
              // Play icon
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
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
