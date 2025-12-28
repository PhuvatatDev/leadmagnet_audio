// === HELPERS LOCALSTORAGE ===
// Gestion sécurisée de l'état local (UX only, pas sécurité)

const STORAGE_KEYS = {
  EMAIL_SUBMITTED: 'emailSubmitted',
  AUDIO_COMPLETED: 'audioCompleted',
  LAST_DRAWN_CARD: 'lastDrawnCard',
} as const;

// Type-safe check for localStorage availability
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// === EMAIL SUBMITTED ===

export function setEmailSubmitted(value: boolean): void {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.EMAIL_SUBMITTED, JSON.stringify(value));
}

export function getEmailSubmitted(): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    const value = localStorage.getItem(STORAGE_KEYS.EMAIL_SUBMITTED);
    return value ? JSON.parse(value) === true : false;
  } catch {
    return false;
  }
}

// === AUDIO COMPLETED ===

export function setAudioCompleted(value: boolean): void {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.AUDIO_COMPLETED, JSON.stringify(value));
}

export function getAudioCompleted(): boolean {
  if (!isLocalStorageAvailable()) return false;
  try {
    const value = localStorage.getItem(STORAGE_KEYS.AUDIO_COMPLETED);
    return value ? JSON.parse(value) === true : false;
  } catch {
    return false;
  }
}

// === LAST DRAWN CARD ===

interface DrawnCard {
  id: number;
  name: string;
  drawnAt: string;
}

export function setLastDrawnCard(card: DrawnCard): void {
  if (!isLocalStorageAvailable()) return;
  localStorage.setItem(STORAGE_KEYS.LAST_DRAWN_CARD, JSON.stringify(card));
}

export function getLastDrawnCard(): DrawnCard | null {
  if (!isLocalStorageAvailable()) return null;
  try {
    const value = localStorage.getItem(STORAGE_KEYS.LAST_DRAWN_CARD);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

// === CLEAR ALL ===

export function clearAllStorage(): void {
  if (!isLocalStorageAvailable()) return;
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
