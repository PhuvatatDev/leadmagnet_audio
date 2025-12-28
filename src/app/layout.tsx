import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DevNav from "@/components/DevNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tirage Tarot Gratuit | Audio Exclusif",
    template: "%s | Tarot Audio",
  },
  description:
    "Accède à un audio exclusif et reçois ton tirage de tarot personnalisé. Découvre les messages des 22 Arcanes Majeurs.",
  keywords: ["tarot", "tirage gratuit", "arcanes majeurs", "guidance spirituelle"],
  authors: [{ name: "Tarot Audio" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Tirage Tarot Gratuit | Audio Exclusif",
    description: "Accède à un audio exclusif et reçois ton tirage de tarot personnalisé.",
    siteName: "Tarot Audio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#A68245",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <DevNav />
      </body>
    </html>
  );
}
