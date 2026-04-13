'use client';

import Link from 'next/link';
import { Phone, MapPin, Hammer } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 pt-20 pb-10 bg-carbon relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-transparent to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Hammer className="w-5 h-5 text-dark-900" />
              </div>
              <span className="text-white font-black text-xl tracking-tighter">
                MACHINA
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Soluciones integrales en maquinaria pesada. Potencia, durabilidad y servicio experto para los proyectos más exigentes de la industria.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-primary">Explorar</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Inicio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Nosotros</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Catálogo</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Servicios</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-primary">Contacto</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dark-600 mt-0.5 shrink-0" />
                <span>Av. Industrial 2045, Parque Tecnológico<br/>Ciudad de México, CP 11560</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dark-600 shrink-0" />
                <span>+52 55 8899 4455</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-primary">Horario</h3>
            <div className="bg-dark-900 p-4 rounded-sm border border-white/5">
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Lunes - Viernes</span>
                  <span className="text-white font-mono">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Sábados</span>
                  <span className="text-white font-mono">09:00 - 14:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Machina. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-gray-400">Privacidad</Link>
            <Link href="#" className="hover:text-gray-400">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}