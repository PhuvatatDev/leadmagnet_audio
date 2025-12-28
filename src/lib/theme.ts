// === THÈME LEADMAGNET AUDIO - TAROT ===
// Palette mystique élégante

export const theme = {
  colors: {
    // === COULEURS PRINCIPALES ===
    background: '#F5F0E8',      // Beige chaleureux
    foreground: '#1A1A1A',      // Noir texte

    // === PRIMARY - Doré (identité tarot) ===
    primary: {
      DEFAULT: '#A68245',       // Or principal
      light: '#C9A66B',         // Or clair (hover)
      dark: '#8B6914',          // Or foncé (pressed)
      muted: '#D4C4A8',         // Or désaturé (disabled)
    },

    // === SECONDARY - Brun profond (ancrage, mystère) ===
    secondary: {
      DEFAULT: '#4A3728',       // Brun chocolat
      light: '#6B5344',         // Brun clair
      dark: '#2E2218',          // Brun très foncé
      muted: '#8B7355',         // Brun moyen
    },

    // === TERTIARY - Bordeaux (spiritualité, profondeur) ===
    tertiary: {
      DEFAULT: '#722F37',       // Bordeaux mystique
      light: '#9A4A54',         // Bordeaux clair
      dark: '#4A1F24',          // Bordeaux foncé
      muted: '#A67478',         // Bordeaux désaturé
    },

    // === NEUTRES ===
    neutral: {
      white: '#FFFFFF',
      cream: '#FAF7F2',         // Blanc cassé
      beige: '#E8E0D5',         // Beige moyen
      gray: '#9A9590',          // Gris chaud
      charcoal: '#3D3A37',      // Gris foncé
      black: '#0A0A0A',         // Noir profond
    },

    // === ÉTATS ===
    state: {
      success: '#4A7C59',       // Vert sauge
      error: '#A63D40',         // Rouge brique
      warning: '#D4A03E',       // Ambre
      info: '#5B7B8C',          // Bleu-gris
    },
  },

  // === OMBRES ===
  shadows: {
    sm: '0 2px 8px rgba(26, 26, 26, 0.08)',
    md: '0 4px 16px rgba(26, 26, 26, 0.12)',
    lg: '0 8px 32px rgba(26, 26, 26, 0.16)',
    gold: '0 4px 20px rgba(166, 130, 69, 0.3)',
  },

  // === GRADIENTS ===
  gradients: {
    gold: 'linear-gradient(135deg, #C9A66B 0%, #A68245 50%, #8B6914 100%)',
    dark: 'linear-gradient(135deg, #4A3728 0%, #2E2218 100%)',
    mystique: 'linear-gradient(180deg, #F5F0E8 0%, #E8E0D5 100%)',
  },

  // === BORDURES ===
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
} as const;

// Type pour TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
