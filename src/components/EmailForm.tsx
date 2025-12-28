'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/ui';
import { setEmailSubmitted } from '@/lib/storage';

// Validation email côté client
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function EmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Anti-bot : si le honeypot est rempli, c'est un bot
    if (honeypot) {
      // Faire semblant que ça marche pour ne pas alerter le bot
      setIsLoading(true);
      setTimeout(() => {
        setEmailSubmitted(true);
        router.push('/listen');
      }, 1500);
      return;
    }

    // Validation côté client
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError('Entre ton adresse email');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError('Entre une adresse email valide');
      return;
    }

    if (!consent) {
      setError('Accepte de recevoir nos emails pour continuer');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Succès - marquer email soumis et rediriger
      setEmailSubmitted(true);
      router.push('/listen');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        type="email"
        name="email"
        placeholder="ton@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        disabled={isLoading}
        autoComplete="email"
        required
      />

      {/* Honeypot anti-bot - invisible pour les humains */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Checkbox consentement */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-2 border-beige bg-cream text-primary focus:ring-primary focus:ring-2 cursor-pointer"
        />
        <span className="text-sm text-charcoal leading-relaxed">
          J'accepte de recevoir des emails de La Tarot Académie.
          <span className="text-gray"> Désabonnement possible à tout moment.</span>
        </span>
      </label>

      <Button
        type="submit"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Accéder à l'audio exclusif
      </Button>
    </form>
  );
}
