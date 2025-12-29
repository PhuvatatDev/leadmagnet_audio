# Leadmagnet Audio - La Tarot Académie

Landing page de capture d'emails avec audio exclusif et tirage de tarot interactif.

## Apercu du Projet

Application web complete permettant aux visiteurs de :
1. S'inscrire via leur email (integration Mailchimp)
2. Acceder a un audio exclusif de guidance
3. Effectuer un tirage de carte tarot personnalise
4. Partager leur tirage sur Instagram (mobile)

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 16.1.1 | Framework React avec App Router |
| **React** | 19.2.3 | Bibliotheque UI |
| **TypeScript** | 5.x | Typage statique |
| **Tailwind CSS** | 4.x | Styling utility-first |
| **Vercel** | - | Hebergement & deploiement |

## Fonctionnalites Techniques

### 1. Integration API Mailchimp

```
src/app/api/subscribe/route.ts  -> API Route Next.js (server-side)
src/lib/mailchimp.ts            -> Client Mailchimp
```

- Inscription securisee cote serveur (API keys protegees)
- Validation email cote client ET serveur
- Gestion des erreurs (email deja inscrit, format invalide)

### 2. Moteur de Tirage Ultra-Securise

```typescript
// src/components/TarotDraw.tsx - Classe UltraRandomizer

class UltraRandomizer {
  // Combine 3 sources d'entropie :
  // 1. crypto.getRandomValues() - API Web Crypto
  // 2. Date.now() - Timestamp haute precision
  // 3. Mouvements souris - Entropie utilisateur
}
```

- **22 Arcanes Majeurs** avec donnees completes (nom, keywords, blocage, resonance)
- Animation de melange + flip 3D CSS
- Persistance localStorage du dernier tirage

### 3. Lecteur Audio Avance

```
src/components/AudioPlayer.tsx
src/hooks/useAudioProgress.ts
```

- Anti-skip : progression lineaire obligatoire
- Persistance de la progression (localStorage)
- Media Session API pour controles mobile
- Deblocage du tirage uniquement apres ecoute 100%

### 4. Generation d'Image pour Partage Instagram

```
src/components/ShareCard.tsx
```

- Canvas API pour generation d'image
- Format Instagram Story (1080x1920)
- Web Share API (mobile uniquement)
- Fallback telechargement si non supporte

### 5. Systeme de Protection des Pages

```
src/lib/storage.ts
```

| localStorage Key | Debloque |
|------------------|----------|
| `emailSubmitted` | `/listen` |
| `audioCompleted` | Section tirage |
| `audioProgress` | Reprise audio |

## Architecture

```
src/
├── app/
│   ├── api/subscribe/route.ts   # API Mailchimp (server-side)
│   ├── listen/page.tsx          # Page experience (audio + tirage)
│   ├── tirage/page.tsx          # Redirect vers /listen
│   ├── layout.tsx               # Layout global + metadata
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Theme + Tailwind
│
├── components/
│   ├── ui/                      # Composants reutilisables
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── AudioPlayer.tsx          # Lecteur audio custom
│   ├── CardFlip.tsx             # Animation flip 3D
│   ├── EmailForm.tsx            # Formulaire inscription
│   ├── ShareCard.tsx            # Generation image partage
│   ├── TarotDraw.tsx            # Moteur de tirage
│   └── DevNav.tsx               # Navigation dev (hidden en prod)
│
├── lib/
│   ├── config.ts                # URLs externes (sales, booking)
│   ├── mailchimp.ts             # Client API Mailchimp
│   ├── storage.ts               # Helpers localStorage
│   ├── tarotDeck.ts             # 22 Arcanes Majeurs data
│   └── theme.ts                 # Palette couleurs
│
└── hooks/
    └── useAudioProgress.ts      # Hook tracking audio
```

## Design System

### Palette Mystique

| Couleur | Hex | Usage |
|---------|-----|-------|
| Background | `#F5F0E8` | Beige chaleureux |
| Primary | `#A68245` | Dore (identite tarot) |
| Secondary | `#4A3728` | Brun profond |
| Tertiary | `#722F37` | Bordeaux mystique |

### Effets UI

- **Glassmorphisme** : Cards avec `backdrop-blur` + transparence
- **Gradients dores** : CTAs et elements d'action
- **Animations** : Flip 3D, transitions smooth, hover effects

## Installation

```bash
# Cloner le repo
git clone https://github.com/[username]/leadmagnet_audio.git
cd leadmagnet_audio

# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Editer .env.local avec vos cles Mailchimp

# Lancer en developpement
npm run dev
```

## Variables d'Environnement

```env
MAILCHIMP_API_KEY=xxx-us21
MAILCHIMP_AUDIENCE_ID=abc123
MAILCHIMP_SERVER_PREFIX=us21
```

## Deploiement Vercel

1. Push sur GitHub
2. Connecter le repo a Vercel
3. Ajouter les variables d'environnement
4. Deploy automatique

## Flow Utilisateur

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Landing   │ --> │   Listen    │ --> │   Tirage    │
│   (Email)   │     │   (Audio)   │     │   (Carte)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       v                   v                   v
   Mailchimp         localStorage         localStorage
   API call          audioProgress        lastDrawnCard
                     audioCompleted
```

## Securite

- API Keys uniquement cote serveur (API Routes)
- Validation double (client + serveur)
- Protection des routes par localStorage
- DevNav desactive en production (`NODE_ENV`)

## Licence

Projet prive - La Tarot Academie
