'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { useEffect, useState } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-dark-900" />;

  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? '' : 'flex-1'}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
    </>
  );
}