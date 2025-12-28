# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Objectif du Projet

Landing page de capture d'emails pour accéder à un audio exclusif.
Après écoute complète → accès au tirage de carte tarot.
Emails envoyés directement à Mailchimp (plan Standard).

## Stack Technique

- **Framework**: Next.js 16 (App Router) + React 19
- **Langage**: TypeScript
- **Styling**: Tailwind CSS 4
- **Hosting**: Vercel
- **API**: Mailchimp Marketing API

## Commandes

```bash
npm run dev      # Lancer en développement (localhost:3000)
npm run build    # Build production
npm run lint     # ESLint
npm start        # Serveur production (après build)
```

## Flow Utilisateur

```
Landing (/) → Email → /listen → Audio 100% → /tirage → Carte révélée
```

## Architecture

```
src/
├── app/
│   ├── api/subscribe/route.ts   # API Route → Mailchimp (server-side)
│   ├── listen/page.tsx          # Lecteur audio (protégé)
│   ├── tirage/page.tsx          # Tirage (protégé)
│   ├── layout.tsx               # Layout global
│   ├── page.tsx                 # Landing
│   └── globals.css              # Styles globaux + Tailwind
├── components/
│   ├── ui/                      # Composants réutilisables (Button, Input)
│   ├── AudioPlayer.tsx
│   ├── CardFlip.tsx
│   ├── EmailForm.tsx
│   └── TarotDraw.tsx
├── lib/
│   ├── theme.ts                 # Palette couleurs
│   ├── tarotDeck.ts             # 22 Arcanes Majeurs
│   ├── mailchimp.ts             # Client API (server-only)
│   └── storage.ts               # Helpers localStorage
└── hooks/
    └── useAudioProgress.ts      # Hook audio tracking
```

## Variables d'Environnement

Copier `.env.example` → `.env.local`:

```env
MAILCHIMP_API_KEY=xxx-us21
MAILCHIMP_AUDIENCE_ID=abc123
MAILCHIMP_SERVER_PREFIX=us21
```

Trouver ces valeurs:
- API Key: Mailchimp → Account → Extras → API Keys
- Audience ID: Audience → Settings → Audience name and defaults
- Server Prefix: Dans l'URL (ex: **us21**.admin.mailchimp.com)

## Design

**Style:** Élégant, mystique, minimaliste

**Palette (voir `lib/theme.ts`):**
- Background: #F5F0E8 (beige)
- Foreground: #1A1A1A (noir)
- Primary: #A68245 (doré)
- Secondary: #4A3728 (brun profond)
- Tertiary: #722F37 (bordeaux)

## Protection des Pages (localStorage)

```typescript
'emailSubmitted': boolean  // → débloque /listen
'audioCompleted': boolean  // → débloque /tirage
```

## Points Techniques Clés

- **Tirage aléatoire**: `crypto.getRandomValues()` (crypto-secure)
- **Animation flip**: CSS 3D rotateY avec perspective
- **AudioPlayer**: Événement `ended` déclenche déblocage tirage
- **API Route**: Mailchimp côté serveur uniquement (sécurité)

## Référence: LA-Tarot-Academie

Code source réutilisable: https://github.com/PhuvatatDev/la_tarot_academie
- Moteur de tirage (crypto + entropy souris)
- Animation flip 3D CSS
- Données 22 Arcanes Majeurs

---

## RÈGLES DE DÉVELOPPEMENT

### Structure Obligatoire

- **TOUJOURS** respecter l'architecture définie ci-dessus
- **JAMAIS** créer de fichiers en dehors de la structure
- Composants réutilisables → `components/ui/`
- Logique métier → `lib/`
- Hooks personnalisés → `hooks/`

### Sécurité

- **API Keys** → Côté serveur UNIQUEMENT (`app/api/` ou `lib/` avec `'use server'`)
- **JAMAIS** d'API keys, secrets ou tokens dans le code frontend
- **Validation** → Côté client ET côté serveur (double validation)
- **Sanitization** → Toujours échapper les inputs utilisateur

### Performance & Memory Leaks

- **useEffect cleanup** → TOUJOURS retourner une fonction de cleanup
  ```typescript
  useEffect(() => {
    const handler = () => {};
    window.addEventListener('event', handler);
    return () => window.removeEventListener('event', handler); // OBLIGATOIRE
  }, []);
  ```
- **Event listeners** → Toujours les supprimer au démontage
- **Timers** → Toujours `clearTimeout`/`clearInterval` au cleanup
- **Refs** → Vérifier `ref.current` avant utilisation

### Logique Critique

- **JAMAIS** de logique critique côté frontend (validation business, calculs sensibles)
- **Protection des routes** → localStorage = UX only, pas sécurité réelle
- **Données sensibles** → Traitement côté serveur uniquement
- **Appels API externes** → Via API Routes Next.js, jamais directement du client
