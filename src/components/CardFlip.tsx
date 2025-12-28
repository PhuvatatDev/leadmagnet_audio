'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TarotCard, getImageUrl } from '@/lib/tarotDeck';

interface CardFlipProps {
  card: TarotCard | null;
  isFlipped: boolean;
  onFlip?: () => void;
}

export default function CardFlip({ card, isFlipped, onFlip }: CardFlipProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // Effet 3D tilt au survol
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFlipped || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const centerX = x - 0.5;
    const centerY = y - 0.5;

    const rotateY = centerX * 30;
    const rotateX = -centerY * 30;

    setTiltStyle({
      transform: `rotateY(${180 + rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    if (!isFlipped) return;
    setTiltStyle({
      transform: 'rotateY(180deg)',
      transition: 'transform 0.3s ease'
    });
  };

  // Touch support pour mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isFlipped || !cardRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;

    const centerX = x - 0.5;
    const centerY = y - 0.5;

    const rotateY = centerX * 30;
    const rotateX = -centerY * 30;

    setTiltStyle({
      transform: `rotateY(${180 + rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const imageUrls = card ? getImageUrl(card, '300w') : null;

  return (
    <div
      className="card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      onClick={onFlip}
    >
      <div
        ref={cardRef}
        className={`card-flip ${isFlipped ? 'flipped' : ''}`}
        style={isFlipped ? tiltStyle : {}}
      >
        {/* Dos de la carte */}
        <div className="card-back">
          <span className="card-back-symbol">✦</span>
        </div>

        {/* Face de la carte */}
        <div className="card-face">
          {card && imageUrls && (
            <picture>
              <source srcSet={imageUrls.webp} type="image/webp" />
              <img
                src={imageUrls.fallback}
                alt={card.name}
                className="card-image"
                loading="lazy"
              />
            </picture>
          )}
        </div>
      </div>

      <style jsx>{`
        .card-container {
          position: relative;
          width: 300px;
          height: 500px;
          perspective: 1200px;
          cursor: pointer;
        }

        .card-flip {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .card-flip.flipped {
          transform: rotateY(180deg);
        }

        .card-face,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .card-back {
          background: linear-gradient(135deg, #A68245 0%, #5C4A1F 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #A68245;
        }

        .card-back-symbol {
          font-size: 5rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .card-face {
          transform: rotateY(180deg);
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #A68245;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
        }

        @media (max-width: 768px) {
          .card-container {
            width: 240px;
            height: 380px;
          }
        }

        @media (max-width: 380px) {
          .card-container {
            width: 200px;
            height: 320px;
          }
        }
      `}</style>
    </div>
  );
}
