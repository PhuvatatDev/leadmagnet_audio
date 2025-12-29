'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Cette page redirige maintenant vers /listen qui contient tout
export default function TiragePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/listen');
  }, [router]);

  return (
    <main className="min-h-screen gradient-mystique flex items-center justify-center">
      <div className="text-primary text-4xl animate-pulse">✦</div>
    </main>
  );
}
