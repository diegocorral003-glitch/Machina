import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Chatbot } from '@/components/Chatbot';

export const metadata: Metadata = {
  title: 'Machina | Renta y Venta de Maquinaria Pesada',
  description: 'Soluciones integrales en maquinaria pesada. Potencia, durabilidad y servicio experto para los proyectos más exigentes de la industria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-dark-900 text-white font-sans antialiased">
        <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary selection:text-dark-900 flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}