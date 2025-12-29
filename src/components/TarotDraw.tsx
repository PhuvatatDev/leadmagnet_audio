'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import CardFlip from './CardFlip';
import ShareCard from './ShareCard';
import { TarotCard, tarotDeck } from '@/lib/tarotDeck';

// === SYSTÈME DE RANDOMISATION ULTRA-SÉCURISÉ ===
// Combine crypto.getRandomValues + mouvements de souris + timestamp
class UltraRandomizer {
  private entropy: number = 0;
  private mouseEntropy: number[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initMouseTracking();
    }
  }

  private initMouseTracking() {
    document.addEventListener('mousemove', (e) => {
      if (this.mouseEntropy.length < 100) {
        this.mouseEntropy.push(e.clientX + e.clientY);
      } else {
        this.mouseEntropy.shift();
        this.mouseEntropy.push(e.clientX + e.clientY);
      }
      this.entropy = this.mouseEntropy.reduce((a, b) => a + b, 0) % 1000;
    });
  }

  getRandomCard(): TarotCard {
    // Source 1: API Crypto sécurisée
    const cryptoArray = new Uint32Array(1);
    crypto.getRandomValues(cryptoArray);

    // Source 2: Timestamp
    const timestamp = Date.now();

    // Source 3: Entropie souris
    const mouseInfluence = this.entropy || Math.random() * 1000;

    // Combine toutes les sources
    const combinedRandom = (cryptoArray[0] + timestamp + mouseInfluence) % tarotDeck.length;

    return tarotDeck[Math.floor(combinedRandom)];
  }
}

interface TarotDrawProps {
  onCardDrawn?: (card: TarotCard) => void;
}

export default function TarotDraw({ onCardDrawn }: TarotDrawProps) {
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const randomizerRef = useRef<UltraRandomizer | null>(null);

  // Initialiser le randomizer côté client uniquement
  useEffect(() => {
    randomizerRef.current = new UltraRandomizer();
  }, []);

  const handleDraw = useCallback(() => {
    if (isShuffling || !randomizerRef.current) return;

    setIsShuffling(true);
    setIsFlipped(false);
    setShowInfo(false);

    // Animation de mélange (1.5s)
    setTimeout(() => {
      const card = randomizerRef.current!.getRandomCard();
      setSelectedCard(card);

      // Sauvegarder dans localStorage
      localStorage.setItem('lastDrawnCard', JSON.stringify({
        ...card,
        drawnAt: new Date().toISOString()
      }));

      // Flip la carte après un court délai
      setTimeout(() => {
        setIsFlipped(true);
        setIsShuffling(false);
        onCardDrawn?.(card);
      }, 100);
    }, 1500);
  }, [isShuffling, onCardDrawn]);

  const handleReset = () => {
    setIsFlipped(false);
    setShowInfo(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 500);
  };

  return (
    <div className="tarot-draw-container">
      {!selectedCard ? (
        // Bouton de tirage
        <button
          className={`draw-button ${isShuffling ? 'shuffling' : ''}`}
          onClick={handleDraw}
          disabled={isShuffling}
        >
          {isShuffling ? (
            <span className="spinning-star">✦</span>
          ) : (
            'TIRE TA CARTE'
          )}
        </button>
      ) : (
        // Affichage de la carte
        <div className="card-display">
          <CardFlip
            card={selectedCard}
            isFlipped={isFlipped}
          />

          {isFlipped && (
            <div className="card-actions">
              <button
                className="action-button info-button"
                onClick={() => setShowInfo(!showInfo)}
              >
                <span>ℹ️</span> Signification
              </button>
              <ShareCard card={selectedCard} />
              <button
                className="action-button close-button"
                onClick={handleReset}
              >
                <span>✕</span> Fermer
              </button>
            </div>
          )}

          {showInfo && selectedCard && (
            <div className="card-info-panel">
              <button
                className="info-close"
                onClick={() => setShowInfo(false)}
              >
                ✕
              </button>
              <h3>{selectedCard.name}</h3>
              <p className="keywords">{selectedCard.keywords}</p>

              <div className="blocage-section">
                <h4>Blocage inconscient</h4>
                <p>{selectedCard.blocage}</p>
              </div>

              <div className="resonance-section">
                <h4>Résonance personnelle</h4>
                <p>{selectedCard.resonance}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .tarot-draw-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          padding: 20px;
        }

        .draw-button {
          background: linear-gradient(135deg, #D4AF37 0%, #A68245 35%, #8B6914 70%, #6B5515 100%);
          color: #FFFFFF;
          border: none;
          padding: 20px 50px;
          font-size: 1.3rem;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(166, 130, 69, 0.3),
                      0 4px 10px rgba(0, 0, 0, 0.2);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .draw-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(166, 130, 69, 0.5);
        }

        .draw-button:disabled {
          opacity: 0.9;
          cursor: not-allowed;
        }

        .draw-button.shuffling {
          pointer-events: none;
        }

        .spinning-star {
          display: inline-block;
          font-size: 2.5rem;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .card-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .card-actions {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .action-button {
          background: linear-gradient(135deg, #A68245, #8B6914);
          color: #FFFFFF;
          border: 2px solid #A68245;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-button:hover {
          background: #FFFFFF;
          color: #A68245;
          transform: translateY(-2px);
        }

        .info-button {
          background: linear-gradient(135deg, #4A5568, #2D3748);
          border-color: #4A5568;
        }

        .info-button:hover {
          background: #FFFFFF;
          color: #4A5568;
        }

        .close-button {
          background: linear-gradient(135deg, #4B3621, #6B4E31);
          border-color: #6B4E31;
          color: #A68245;
        }

        .close-button:hover {
          background: #A68245;
          color: #0A0A0A;
        }

        .card-info-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(10, 10, 10, 0.98);
          border: 2px solid #A68245;
          border-radius: 20px;
          padding: 50px 30px 30px;
          max-width: 500px;
          max-height: 85vh;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
        }

        .info-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: linear-gradient(135deg, #4B3621, #6B4E31);
          border: 2px solid #6B4E31;
          color: #A68245;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .info-close:hover {
          background: #A68245;
          color: #0A0A0A;
        }

        .card-info-panel h3 {
          color: #A68245;
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .card-info-panel .keywords {
          color: #A68245;
          font-style: italic;
          margin-bottom: 20px;
          text-align: center;
          font-size: 1.1rem;
        }

        .blocage-section,
        .resonance-section {
          margin-top: 20px;
          padding: 15px;
          border-radius: 12px;
        }

        .blocage-section {
          background: rgba(114, 47, 55, 0.2);
          border-left: 3px solid #722F37;
        }

        .resonance-section {
          background: rgba(166, 130, 69, 0.15);
          border-left: 3px solid #A68245;
        }

        .blocage-section h4,
        .resonance-section h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .blocage-section h4 {
          color: #9A4A54;
        }

        .resonance-section h4 {
          color: #A68245;
        }

        .blocage-section p,
        .resonance-section p {
          line-height: 1.7;
          font-size: 0.95rem;
          color: #FFFFFF;
          text-align: justify;
        }

        .resonance-section p {
          font-style: italic;
        }

        @media (max-width: 768px) {
          .draw-button {
            padding: 15px 30px;
            font-size: 1rem;
          }

          .card-actions {
            flex-direction: column;
            gap: 10px;
            width: 100%;
            padding: 0 20px;
          }

          .action-button {
            width: 100%;
            justify-content: center;
          }

          .card-info-panel {
            width: 92%;
            padding: 45px 15px 20px;
          }
        }
      `}</style>
    </div>
  );
}
