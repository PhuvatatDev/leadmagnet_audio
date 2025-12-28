'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';
import { getEmailSubmitted, getAudioCompleted } from '@/lib/storage';

export default function ListenPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canAccessTirage, setCanAccessTirage] = useState(false);

  useEffect(() => {
    // Vérifier si l'email a été soumis
    const emailSubmitted = getEmailSubmitted();

    if (!emailSubmitted) {
      router.replace('/');
      return;
    }

    // Vérifier si l'audio a été complété (pour afficher le lien vers tirage)
    const audioCompleted = getAudioCompleted();
    setCanAccessTirage(audioCompleted);

    setIsAuthorized(true);
    setIsLoading(false);
  }, [router]);

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen gradient-mystique flex items-center justify-center">
        <div className="text-primary text-4xl animate-pulse">✦</div>
      </main>
    );
  }

  // Not authorized (shouldn't show, redirect happens)
  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen gradient-mystique flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-5xl text-primary" aria-hidden="true">
            ✦
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Ton audio exclusif
          </h1>
          <p className="text-charcoal">
            Prends un moment pour toi, installe-toi confortablement et laisse-toi guider.
          </p>
        </div>

        {/* Audio Player */}
        <AudioPlayer
          src="/audio/guidance.mp3"
          title="Guidance spirituelle"
          onComplete={() => setCanAccessTirage(true)}
        />

        {/* Encouragement */}
        <div className="bg-cream/60 rounded-xl p-4 border border-beige">
          <p className="text-sm text-charcoal italic">
            "Chaque carte tirée est un miroir de ton âme, un message de l'univers pour te guider sur ton chemin."
          </p>
        </div>

        {/* Navigation vers tirage */}
        <div className="pt-4">
          {canAccessTirage ? (
            <Link
              href="/tirage"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-gold text-white font-semibold rounded-xl hover:shadow-gold hover:-translate-y-0.5 transition-all"
            >
              ✦ Accéder à mon tirage
            </Link>
          ) : (
            <div className="space-y-2">
              <button
                disabled
                className="inline-flex items-center gap-2 px-6 py-3 bg-beige text-gray font-semibold rounded-xl cursor-not-allowed opacity-60"
              >
                🔒 Tirage verrouillé
              </button>
              <p className="text-xs text-gray">Écoute l'audio en entier pour débloquer</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
