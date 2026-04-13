'use client';

import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="es">
      <body className="bg-dark-900 text-white font-sans antialiased">
        <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary selection:text-dark-900 flex flex-col">
          {!isAdminRoute && <Navbar />}
          <main className={isAdminRoute ? '' : 'flex-1'}>
            {children}
          </main>
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <Chatbot />}
        </div>
      </body>
    </html>
  );
}