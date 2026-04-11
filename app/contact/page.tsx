'use client';

import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-32 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">CONTÁCTANOS</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Estamos listos para ayudarte con tu próximo proyecto.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre</label>
                  <input type="text" className="w-full bg-dark-900 border border-dark-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                  <input type="email" className="w-full bg-dark-900 border border-dark-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mensaje</label>
                  <textarea rows={5} className="w-full bg-dark-900 border border-dark-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary" placeholder="¿En qué podemos ayudarte?"></textarea>
                </div>
                <button type="submit" className="bg-primary text-dark-950 font-bold py-4 px-8 rounded-sm hover:bg-primary-hover transition-all flex items-center gap-2">
                  ENVIAR MENSAJE <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-white font-bold mb-2">Dirección</h3>
                  <p className="text-gray-400">Av. Industrial 2045, Parque Tecnológico<br/>Ciudad de México, CP 11560</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-white font-bold mb-2">Teléfono</h3>
                  <p className="text-gray-400">+52 55 8899 4455</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-white font-bold mb-2">Email</h3>
                  <p className="text-gray-400">contacto@machina.mx</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}