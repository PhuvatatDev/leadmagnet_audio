# Leadmagnet Audio - La Tarot Academie

Email capture landing page with exclusive audio content and interactive tarot card drawing.

## Project Overview

Complete web application allowing visitors to:
1. Subscribe via email (Mailchimp integration)
2. Access an exclusive audio guidance session
3. Perform a personalized tarot card reading
4. Share their reading on Instagram (mobile)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Static typing |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Vercel** | - | Hosting & deployment |

## Technical Features

### 1. Mailchimp API Integration

```
src/app/api/subscribe/route.ts  -> Next.js API Route (server-side)
src/lib/mailchimp.ts            -> Mailchimp client
```

- Secure server-side subscription (protected API keys)
- Client AND server-side email validation
- Error handling (already subscribed, invalid format)

### 2. Ultra-Secure Card Drawing Engine

```typescript
// src/components/TarotDraw.tsx - UltraRandomizer Class

class UltraRandomizer {
  // Combines 3 entropy sources:
  // 1. crypto.getRandomValues() - Web Crypto API
  // 2. Date.now() - High precision timestamp
  // 3. Mouse movements - User entropy
}
```

- **22 Major Arcana** with complete data (name, keywords, blockage, resonance)
- Shuffle animation + CSS 3D flip
- localStorage persistence of last drawn card

### 3. Advanced Audio Player

```
src/components/AudioPlayer.tsx
src/hooks/useAudioProgress.ts
```

- Anti-skip: linear progression required
- Progress persistence (localStorage)
- Media Session API for mobile controls
- Card drawing unlocked only after 100% completion

### 4. Instagram Story Image Generation

```
src/components/ShareCard.tsx
```

- Canvas API for image generation
- Instagram Story format (1080x1920)
- Web Share API (mobile only)
- Download fallback if not supported

### 5. Page Protection System

```
src/lib/storage.ts
```

| localStorage Key | Unlocks |
|------------------|---------|
| `emailSubmitted` | `/listen` |
| `audioCompleted` | Card drawing section |
| `audioProgress` | Audio resume |

## Architecture

```
src/
├── app/
│   ├── api/subscribe/route.ts   # Mailchimp API (server-side)
│   ├── listen/page.tsx          # Experience page (audio + drawing)
│   ├── tirage/page.tsx          # Redirect to /listen
│   ├── layout.tsx               # Global layout + metadata
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Theme + Tailwind
│
├── components/
│   ├── ui/                      # Reusable components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── AudioPlayer.tsx          # Custom audio player
│   ├── CardFlip.tsx             # 3D flip animation
│   ├── EmailForm.tsx            # Subscription form
│   ├── ShareCard.tsx            # Share image generation
│   ├── TarotDraw.tsx            # Card drawing engine
│   └── DevNav.tsx               # Dev navigation (hidden in prod)
│
├── lib/
│   ├── config.ts                # External URLs (sales, booking)
│   ├── mailchimp.ts             # Mailchimp API client
│   ├── storage.ts               # localStorage helpers
│   ├── tarotDeck.ts             # 22 Major Arcana data
│   └── theme.ts                 # Color palette
│
└── hooks/
    └── useAudioProgress.ts      # Audio tracking hook
```

## Design System

### Mystic Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#F5F0E8` | Warm beige |
| Primary | `#A68245` | Gold (tarot identity) |
| Secondary | `#4A3728` | Deep brown |
| Tertiary | `#722F37` | Mystic burgundy |

### UI Effects

- **Glassmorphism**: Cards with `backdrop-blur` + transparency
- **Gold gradients**: CTAs and action elements
- **Animations**: 3D flip, smooth transitions, hover effects

## Installation

```bash
# Clone the repo
git clone https://github.com/PhuvatatDev/leadmagnet_audio.git
cd leadmagnet_audio

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Mailchimp keys

# Run development server
npm run dev
```

## Environment Variables

```env
MAILCHIMP_API_KEY=xxx-us21
MAILCHIMP_AUDIENCE_ID=abc123
MAILCHIMP_SERVER_PREFIX=us21
```

## Vercel Deployment

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Automatic deployment

## User Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Landing   │ --> │   Listen    │ --> │  Card Draw  │
│   (Email)   │     │   (Audio)   │     │   (Tarot)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       v                   v                   v
   Mailchimp         localStorage         localStorage
   API call          audioProgress        lastDrawnCard
                     audioCompleted
```

## Security

- API Keys server-side only (API Routes)
- Double validation (client + server)
- Route protection via localStorage
- DevNav disabled in production (`NODE_ENV`)

