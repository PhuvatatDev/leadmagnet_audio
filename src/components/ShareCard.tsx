'use client';

import { useRef, useCallback } from 'react';
import { TarotCard } from '@/lib/tarotDeck';

interface ShareCardProps {
  card: TarotCard;
}

export default function ShareCard({ card }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateImage = useCallback(async (): Promise<Blob | null> => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Canvas dimensions - Instagram Story format (9:16)
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // Background gradient (mystique theme)
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#F5F0E8');
    gradient.addColorStop(0.5, '#EDE5DA');
    gradient.addColorStop(1, '#E8E0D5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative border
    ctx.strokeStyle = '#A68245';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Inner decorative corners
    ctx.strokeStyle = '#A68245';
    ctx.lineWidth = 2;
    // Top left
    ctx.beginPath();
    ctx.moveTo(70, 100); ctx.lineTo(70, 70); ctx.lineTo(100, 70);
    ctx.stroke();
    // Top right
    ctx.beginPath();
    ctx.moveTo(width - 100, 70); ctx.lineTo(width - 70, 70); ctx.lineTo(width - 70, 100);
    ctx.stroke();
    // Bottom left
    ctx.beginPath();
    ctx.moveTo(70, height - 100); ctx.lineTo(70, height - 70); ctx.lineTo(100, height - 70);
    ctx.stroke();
    // Bottom right
    ctx.beginPath();
    ctx.moveTo(width - 100, height - 70); ctx.lineTo(width - 70, height - 70); ctx.lineTo(width - 70, height - 100);
    ctx.stroke();

    // Load card image - use absolute URL
    const cardImg = new Image();
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    await new Promise<void>((resolve) => {
      cardImg.onload = () => resolve();
      cardImg.onerror = () => {
        console.error('Failed to load card image:', card.image);
        resolve();
      };
      // Ensure absolute URL - images are in /images/major/
      const imagePath = card.image.startsWith('/') ? card.image : `/images/major/${card.image}`;
      cardImg.src = `${baseUrl}${imagePath}`;
    });

    // Check if image loaded successfully
    if (!cardImg.complete || cardImg.naturalWidth === 0) {
      console.error('Card image not loaded properly');
    }

    // === LAYOUT CENTRÉ VERTICALEMENT ===
    // Carte : 500x750, Nom : 60px, Logo : 150px, Textes : ~80px
    // Total contenu : ~1180px → Marge haut/bas : (1920-1180)/2 = 370px

    // Card image - centered
    const cardWidth = 500;
    const cardHeight = 750;
    const cardX = (width - cardWidth) / 2;
    const cardY = 370;

    // Draw card with rounded corners
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 20);
    ctx.clip();
    ctx.drawImage(cardImg, cardX, cardY, cardWidth, cardHeight);
    ctx.restore();

    // Card border
    ctx.strokeStyle = '#A68245';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 20);
    ctx.stroke();

    // Decorative line above name
    const nameY = cardY + cardHeight + 80;
    ctx.strokeStyle = '#A68245';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 150, nameY - 30);
    ctx.lineTo(width / 2 + 150, nameY - 30);
    ctx.stroke();

    // Card name - centered
    ctx.fillStyle = '#4A3728';
    ctx.font = 'bold 56px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, width / 2, nameY);

    // Decorative line under name
    ctx.beginPath();
    ctx.moveTo(width / 2 - 150, nameY + 25);
    ctx.lineTo(width / 2 + 150, nameY + 25);
    ctx.stroke();

    // Load and draw logo - use absolute URL
    const logo = new Image();

    await new Promise<void>((resolve) => {
      logo.onload = () => resolve();
      logo.onerror = () => {
        console.error('Failed to load logo');
        resolve();
      };
      logo.src = `${baseUrl}/images/logo/logo_LaTarotAcademie.png`;
    });

    // Logo centered
    const logoSize = 150;
    const logoX = (width - logoSize) / 2;
    const logoY = nameY + 100;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Brand name
    ctx.fillStyle = '#4A3728';
    ctx.font = 'bold 40px Georgia, serif';
    ctx.fillText('La Tarot Académie', width / 2, logoY + logoSize + 50);

    // Instagram handle
    ctx.fillStyle = '#A68245';
    ctx.font = '32px Georgia, serif';
    ctx.fillText('@chiara.regazzoni_', width / 2, logoY + logoSize + 100);

    // Convert to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0);
    });
  }, [card]);

  const handleShare = async () => {
    const blob = await generateImage();
    if (!blob) return;

    const file = new File([blob], `tarot-${card.name.toLowerCase().replace(/\s+/g, '-')}.png`, {
      type: 'image/png',
    });

    // Check if Web Share API is available and supports files
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `Mon tirage: ${card.name}`,
          text: `J'ai tiré ${card.name} avec La Tarot Académie !`,
        });
      } catch (err) {
        // User cancelled or error - fallback to download
        downloadImage(blob);
      }
    } else {
      // Fallback: download the image
      downloadImage(blob);
    }
  };

  const downloadImage = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarot-${card.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Share button */}
      <button
        onClick={handleShare}
        className="share-icon-button"
        title="Partager sur Instagram"
      >
        <svg className="w-5 h-5 instagram-icon" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDC80" />
              <stop offset="25%" stopColor="#F77737" />
              <stop offset="50%" stopColor="#E1306C" />
              <stop offset="75%" stopColor="#C13584" />
              <stop offset="100%" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span>Partager</span>
      </button>

      <style jsx>{`
        .share-icon-button {
          background: #FFFFFF;
          color: #4A3728;
          border: 2px solid #E8E0D5;
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

        .share-icon-button:hover {
          border-color: #A68245;
          transform: translateY(-2px);
        }

        /* Masquer sur desktop, afficher uniquement sur mobile */
        @media (min-width: 768px) {
          .share-icon-button {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

