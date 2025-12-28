'use client';

import { clearAllStorage, setEmailSubmitted, setAudioCompleted } from '@/lib/storage';

// Composant de navigation DEV - À SUPPRIMER EN PRODUCTION
export default function DevNav() {
  // Ne s'affiche qu'en développement
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleReset = () => {
    clearAllStorage();
    window.location.href = '/';
  };

  const goToHome = () => {
    clearAllStorage();
    window.location.href = '/';
  };

  const goToListen = () => {
    setEmailSubmitted(true);
    window.location.href = '/listen';
  };

  const goToTirage = () => {
    setEmailSubmitted(true);
    setAudioCompleted(true);
    window.location.href = '/tirage';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex gap-2 bg-black/80 p-3 rounded-xl border border-primary">
      <span className="text-xs text-gray self-center mr-2">DEV:</span>
      <button
        onClick={goToHome}
        className="px-3 py-1 text-xs bg-primary text-white rounded-lg hover:bg-primary-light"
      >
        Home
      </button>
      <button
        onClick={goToListen}
        className="px-3 py-1 text-xs bg-secondary text-white rounded-lg hover:bg-secondary-light"
      >
        Listen
      </button>
      <button
        onClick={goToTirage}
        className="px-3 py-1 text-xs bg-tertiary text-white rounded-lg hover:bg-tertiary-light"
      >
        Tirage
      </button>
      <button
        onClick={handleReset}
        className="px-3 py-1 text-xs bg-error text-white rounded-lg hover:opacity-80"
      >
        Reset
      </button>
    </div>
  );
}
