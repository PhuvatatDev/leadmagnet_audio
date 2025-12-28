'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmailForm from '@/components/EmailForm';
import { getEmailSubmitted, getAudioCompleted } from '@/lib/storage';

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà soumis son email
    const emailSubmitted = getEmailSubmitted();
    const audioCompleted = getAudioCompleted();

    if (emailSubmitted) {
      // Si audio complété → tirage, sinon → listen
      router.replace(audioCompleted ? '/tirage' : '/listen');
      return;
    }

    setIsChecking(false);
  }, [router]);

  // Loading pendant la vérification
  if (isChecking) {
    return (
      <main className="min-h-screen gradient-mystique flex items-center justify-center">
        <div className="text-primary text-4xl animate-pulse">✦</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen gradient-mystique flex flex-col items-center justify-center px-4 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-8">
        {/* Symbole décoratif */}
        <div className="text-6xl text-primary mb-4" aria-hidden="true">
          ✦
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Accède à cet{' '}
          <span className="text-primary">audio exclusif</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-charcoal leading-relaxed">
          Explore tes blocages inconscients grâce au tarot et transforme ta vie !
        </p>

        <p className="text-lg text-secondary font-medium">
          Découvre une approche qui va faire évoluer ta manière d'accompagner.
        </p>

        {/* Promesse */}
        <div className="bg-cream/60 rounded-2xl p-6 border border-beige">
          <ul className="space-y-3 text-left text-charcoal">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">✦</span>
              <span>Audio de guidance exclusif</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">✦</span>
              <span>Tirage gratuit des Arcanes Majeurs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-0.5">✦</span>
              <span>Message personnalisé pour toi</span>
            </li>
          </ul>
        </div>

        {/* Formulaire */}
        <div className="pt-4">
          <EmailForm />
        </div>

        {/* Mention légale */}
        <p className="text-sm text-gray">
          Vos données restent confidentielles. Pas de spam, promis.
        </p>
      </div>
    </main>
  );
}
