'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';
import TarotDraw from '@/components/TarotDraw';
import { getEmailSubmitted, getAudioCompleted } from '@/lib/storage';
import { config } from '@/lib/config';
import { TarotCard } from '@/lib/tarotDeck';


export default function ExperiencePage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canAccessTirage, setCanAccessTirage] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const tirageSectionRef = useRef<HTMLElement | null>(null);
  const justUnlockedRef = useRef(false);

  const handleCardDrawn = (card: TarotCard) => {
    setHasDrawn(true);
  };

  // Scroll vers la section tirage quand elle se débloque
  useEffect(() => {
    if (canAccessTirage && justUnlockedRef.current) {
      justUnlockedRef.current = false;
      setTimeout(() => {
        tirageSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [canAccessTirage]);

  useEffect(() => {
    // Vérifier si l'email a été soumis
    const emailSubmitted = getEmailSubmitted();

    if (!emailSubmitted) {
      router.replace('/');
      return;
    }

    // Vérifier si l'audio a été complété
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
    <main className="min-h-screen gradient-mystique px-4 py-16 overflow-x-hidden">
      <div className="max-w-2xl mx-auto space-y-12">

        {/* ============ SECTION AUDIO ============ */}
        <section className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/logo/logo_LaTarotAcademie.png"
                alt="La Tarot Académie"
                width={200}
                height={200}
                className="w-auto h-20 md:h-24"
                priority
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              L'expérience audio commence ici
            </h1>
          </div>

          {/* Description */}
          <div className="text-charcoal text-left">
            <p>
              Cet audio a été pensé pour s'écouter comme un podcast. Il t'aide à identifier tes blocages inconscients grâce à ma méthode du Tarot Conscient.
            </p>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <p className="text-lg text-foreground font-medium mb-2">
              Si tu es prête… Lance l'audio
            </p>
            <p className="text-primary text-xl">Enjoy !</p>
          </div>

          {/* Audio Player */}
          <AudioPlayer
            src="/audio/guidance.mp3"
            title="Déclic intérieur"
            onComplete={() => {
              justUnlockedRef.current = true;
              setCanAccessTirage(true);
            }}
          />

          {/* Signature + Instagram */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-secondary font-medium italic">
              Chiara Regazzoni
            </p>
            <a
              href={config.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @chiara.regazzoni_
            </a>
          </div>
        </section>

        {/* ============ DIVIDER ============ */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-beige"></div>
          <span className="text-primary text-2xl">✦</span>
          <div className="flex-1 h-px bg-beige"></div>
        </div>

        {/* ============ SECTION TIRAGE ============ */}
        <section
          ref={tirageSectionRef}
          className={`relative text-center space-y-8 transition-all duration-500 py-12 ${!canAccessTirage ? 'opacity-40 pointer-events-none' : ''}`}
        >
          {/* Cartes décoratives - fond de toute la section */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full max-w-2xl h-full">
              <Image
                src="/images/card-back-1.png"
                alt=""
                width={140}
                height={210}
                style={{ width: 'auto', height: 'auto' }}
                className="absolute left-1/2 top-1/2 -translate-x-[200%] -translate-y-1/2 -rotate-15 opacity-40 rounded-xl"
              />
              <Image
                src="/images/card-back-2.png"
                alt=""
                width={140}
                height={210}
                style={{ width: 'auto', height: 'auto' }}
                className="absolute left-1/2 top-1/2 -translate-x-[115%] -translate-y-1/2 -rotate-5 opacity-40 rounded-xl"
              />
              <Image
                src="/images/card-back-3.png"
                alt=""
                width={140}
                height={210}
                style={{ width: 'auto', height: 'auto' }}
                className="absolute left-1/2 top-1/2 translate-x-[15%] -translate-y-1/2 rotate-5 opacity-40 rounded-xl"
              />
              <Image
                src="/images/card-back-4.png"
                alt=""
                width={140}
                height={210}
                style={{ width: 'auto', height: 'auto' }}
                className="absolute left-1/2 top-1/2 translate-x-[100%] -translate-y-1/2 rotate-15 opacity-40 rounded-xl"
              />
            </div>
          </div>

          {/* Contenu au-dessus des cartes */}
          <div className="relative z-10 space-y-8">
            {/* Header tirage */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Ton tirage personnalisé
              </h2>
              {!canAccessTirage ? (
                <div className="flex items-center justify-center gap-2 text-gray">
                  <span className="text-xl">🔒</span>
                  <p>Écoute l'audio pour débloquer ton tirage</p>
                </div>
              ) : (
                <p className="text-charcoal">
                  Concentre-toi sur ton blocage, puis tire ta carte.
                </p>
              )}
            </div>

            {/* Tarot Draw Component */}
            <TarotDraw onCardDrawn={handleCardDrawn} />
          </div>
        </section>

        {/* ============ CTAs APRÈS TIRAGE ============ */}
        {hasDrawn && (
          <section className="relative mt-8">
            {/* Glassmorphism Card */}
            <div className="relative backdrop-blur-md bg-white/30 border border-primary/30 rounded-2xl p-8 shadow-lg overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />

              {/* Content */}
              <div className="relative z-10 text-center space-y-6">
                <div className="space-y-2">
                  <span className="text-primary text-2xl">✦</span>
                  <p className="text-xl text-secondary font-semibold">
                    Je souhaite aller plus loin avec cette approche
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <a
                    href={config.links.salesPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 gradient-gold text-white font-semibold rounded-xl shadow-md hover:shadow-gold hover:-translate-y-1 transition-all duration-300"
                  >
                    ✦ Je rejoins la formation
                  </a>
                  <a
                    href={config.links.callBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-secondary/90 backdrop-blur-sm text-white font-semibold rounded-xl shadow-md hover:bg-secondary hover:-translate-y-1 transition-all duration-300"
                  >
                    📞 Je réserve un call offert
                  </a>
                </div>

                {/* IPHM Accreditation */}
                <div className="flex flex-col items-center gap-3 pt-6 border-t border-primary/20">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/logo/IPHM_logo.jpg"
                      alt="IPHM - International Practitioners of Holistic Medicine"
                      width={50}
                      height={50}
                      className="rounded-lg shadow-sm"
                    />
                    <a
                      href="https://www.iphm.co.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 bg-white/50 text-secondary rounded-md hover:bg-white/80 transition-colors"
                    >
                      info
                    </a>
                  </div>
                  <p className="text-sm text-secondary/80 max-w-sm">
                    Formation accréditée IPHM
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
