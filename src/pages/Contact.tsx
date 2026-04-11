import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <div className="min-h-screen bg-dark-950 bg-noise">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="text-primary font-bold text-xs tracking-wide uppercase">Estamos para servirte</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              Hablemos de tu <span className="text-primary">Proyecto</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo de expertos está listo para asesorarte. Respuesta garantizada en menos de 24 horas.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark-900/90 backdrop-blur-xl p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all group shadow-2xl"
            >
              <div className="w-12 h-12 bg-dark-950 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors border border-white/5">
                <Phone className="w-6 h-6 text-primary group-hover:text-dark-900 transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 text-lg uppercase tracking-tight">Llámanos</h3>
              <p className="text-gray-400 text-sm mb-4">Atención personalizada de lunes a sábado.</p>
              <a href="tel:+525588994455" className="text-xl font-mono text-white hover:text-primary transition-colors block">+52 55 8899 4455</a>
              <a href="tel:+525512345678" className="text-sm font-mono text-gray-500 hover:text-primary transition-colors block mt-1">+52 55 1234 5678</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-dark-900/90 backdrop-blur-xl p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all group shadow-2xl"
            >
              <div className="w-12 h-12 bg-dark-950 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors border border-white/5">
                <Mail className="w-6 h-6 text-primary group-hover:text-dark-900 transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 text-lg uppercase tracking-tight">Escríbenos</h3>
              <p className="text-gray-400 text-sm mb-4">Envíanos tus dudas o solicitud de cotización.</p>
              <a href="mailto:ventas@machina.mx" className="text-lg font-mono text-white hover:text-primary transition-colors block">ventas@machina.mx</a>
              <a href="mailto:soporte@machina.mx" className="text-sm font-mono text-gray-500 hover:text-primary transition-colors block mt-1">soporte@machina.mx</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-dark-900/90 backdrop-blur-xl p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all group shadow-2xl"
            >
              <div className="w-12 h-12 bg-dark-950 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors border border-white/5">
                <MapPin className="w-6 h-6 text-primary group-hover:text-dark-900 transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 text-lg uppercase tracking-tight">Visítanos</h3>
              <p className="text-gray-400 text-sm mb-4">Av. Industrial 2045, Parque Tecnológico<br/>Ciudad de México, CP 11560</p>
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                <Clock className="w-3 h-3" /> Lun-Vie: 08:00 - 18:00
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-dark-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="bg-dark-950/50 p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" /> Envíanos un mensaje
                </h2>
                <p className="text-gray-400 text-sm mt-1">Completa el formulario y te contactaremos a la brevedad.</p>
              </div>
            </div>
            
            <form className="p-8 md:p-10 space-y-8 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</label>
                  <input type="text" className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-700" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Apellido</label>
                  <input type="text" className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-700" placeholder="Tu apellido" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Corporativo</label>
                  <input type="email" className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-700" placeholder="nombre@empresa.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono</label>
                  <input type="tel" className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-700" placeholder="+52 (55) ..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo de Servicio</label>
                <select className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-gray-400">
                  <option>Selecciona una opción...</option>
                  <option>Renta de Maquinaria</option>
                  <option>Compra de Equipo</option>
                  <option>Servicio Técnico</option>
                  <option>Refacciones</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Detalles del Proyecto</label>
                <textarea rows={5} className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-700 resize-none" placeholder="Describe brevemente tus necesidades..."></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-dark-950 font-black py-5 rounded-lg hover:bg-primary-hover transition-all shadow-lg hover:shadow-primary/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group">
                Enviar Solicitud <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="mt-16 h-[400px] bg-dark-900 rounded-2xl border border-white/10 overflow-hidden relative group">
           <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-99.1332,19.4326,5,0/1200x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsZ3J3b3AyM3puMnZwYzR6b2hzb21qIn0.example')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent pointer-events-none"></div>
           <div className="absolute bottom-8 left-8 z-10">
             <div className="bg-white text-dark-950 px-6 py-3 rounded-lg shadow-xl font-bold flex items-center gap-3">
               <MapPin className="w-5 h-5 text-primary" />
               <span>Ver ubicación en Google Maps</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

