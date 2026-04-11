'use client';

import { Hammer, MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-32 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">SOMOS <span className="text-primary">MACHINA</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Líderes en renta y venta de maquinaria pesada para construcción en México.
            Más de 15 años de experiencia respaldando los proyectos más exigentes.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-900 p-8 rounded-xl border border-white/5">
              <Hammer className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-black text-white mb-2">Misión</h3>
              <p className="text-gray-400">Brindar soluciones integrales en maquinaria pesada con tecnología de punta y soporte técnico especializado.</p>
            </div>
            <div className="bg-dark-900 p-8 rounded-xl border border-white/5">
              <h3 className="text-2xl font-black text-white mb-2">Visión</h3>
              <p className="text-gray-400">Ser el referente número uno en maquinaria pesada en México, innovando constantemente.</p>
            </div>
            <div className="bg-dark-900 p-8 rounded-xl border border-white/5">
              <h3 className="text-2xl font-black text-white mb-2">Valores</h3>
              <p className="text-gray-400">Profesionalismo, compromiso, innovación y excelencia en servicio.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}