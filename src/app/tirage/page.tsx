'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TarotDraw from '@/components/TarotDraw';
import { getAudioCompleted } from '@/lib/storage';
import { config } from '@/lib/config';
import { TarotCard } from '@/lib/tarotDeck';

export default function TiragePage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasDrawn, setHasDrawn] = useState(false);

  const handleCardDrawn = (card: TarotCard) => {
    setHasDrawn(true);
  };

  useEffect(() => {
    // Vérifier si l'audio a été complété
    const audioCompleted = getAudioCompleted();

    if (!audioCompleted) {
      router.replace('/listen');
      return;
    }

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

  // Not authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen gradient-mystique flex flex-col items-center justify-center px-4 py-16">
      {/* Navigation retour */}
      <div className="absolute top-4 left-4">
        <Link
          href="/listen"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Réécouter l'audio
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="text-5xl text-primary" aria-hidden="true">
            ✦
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Ton tirage
          </h1>
          <p className="text-charcoal">
            Concentre-toi sur ta question ou intention, puis tire ta carte.
          </p>
        </div>

        {/* Tarot Draw Component */}
        <TarotDraw onCardDrawn={handleCardDrawn} />

        {/* Footer message */}
        <div className="pt-8">
          <p className="text-sm text-gray">
            Chaque tirage est unique, guidé par l'énergie du moment présent.
          </p>
        </div>

        {/* CTAs après tirage */}
        {hasDrawn && (
          <div className="pt-8 space-y-6 border-t border-beige mt-8">
            <p className="text-lg text-secondary font-medium pt-6">
              Envie d'aller plus loin dans ton cheminement ?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={config.links.callBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 gradient-gold text-white font-semibold rounded-xl hover:shadow-gold hover:-translate-y-0.5 transition-all"
              >
                📞 Réserver un appel découverte
              </a>
              <a
                href={config.links.salesPage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary-light hover:-translate-y-0.5 transition-all"
              >
                ✦ Découvrir la formation
              </a>
            </div>

            <a
              href={config.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Suivez-nous sur Instagram
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
