'use client';

import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { sendContactMessage } from '@/lib/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tipoServicio: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleCards.includes(index)) {
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendContactMessage({
        nombre: `${formData.nombre} ${formData.apellido}`,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: `Tipo de servicio: ${formData.tipoServicio}\n\nMensaje: ${formData.mensaje}`
      });
      setSuccess(true);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        tipoServicio: '',
        mensaje: ''
      });
    } catch (err) {
      setError('Error al enviar el mensaje. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 bg-grid-pattern relative">
      {/* Hero Section con parallax - imagen centrada en el rostro */}
      <section className="relative h-[50vh] min-h-[500px] flex items-end overflow-hidden" 
        style={{ backgroundImage: 'url("/PageContacto.avif")', backgroundSize: 'cover', backgroundPosition: 'center 15%', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-900/50 to-dark-950/40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pb-16 w-full">
          <div className="inline-block bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm animate-fade-in">
            <span className="text-[#FFC107] font-bold text-xs tracking-wide uppercase">Estamos para servirte</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase animate-fade-in-up">
            Hablemos de tu <span className="text-[#FFC107]">Proyecto</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Nuestro equipo de expertos está listo para asesorarte. Respuesta garantizada en menos de 24 horas.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards - aparecen con scroll */}
          <div className="lg:col-span-1 space-y-4">
            <div 
              ref={(el) => (cardRefs.current[0] = el)}
              data-index="0"
              className={`bg-dark-900/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-[#FFC107]/50 hover:shadow-[0_0_30px_rgba(255,193,7,0.15)] transition-all duration-300 group scroll-animate scroll-animate-1 ${visibleCards.includes(0) ? 'visible' : ''}`}
            >
              <div className="w-10 h-10 bg-dark-950 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FFC107] group-hover:scale-110 transition-all duration-300 border border-white/5">
                <Phone className="w-5 h-5 text-[#FFC107] group-hover:text-dark-900 transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-tight text-sm">Llámanos</h3>
              <p className="text-gray-400 text-xs mb-3">Atención personalizada de lunes a sábado.</p>
              <a href="tel:+525588994455" className="text-lg font-mono text-white hover:text-[#FFC107] transition-colors block">+52 55 8899 4455</a>
            </div>

            <div 
              ref={(el) => (cardRefs.current[1] = el)}
              data-index="1"
              className={`bg-dark-900/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-[#FFC107]/50 hover:shadow-[0_0_30px_rgba(255,193,7,0.15)] transition-all duration-300 group scroll-animate scroll-animate-2 ${visibleCards.includes(1) ? 'visible' : ''}`}
            >
              <div className="w-10 h-10 bg-dark-950 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FFC107] group-hover:scale-110 transition-all duration-300 border border-white/5">
                <Mail className="w-5 h-5 text-[#FFC107] group-hover:text-dark-900 transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-tight text-sm">Escríbenos</h3>
              <p className="text-gray-400 text-xs mb-3">Envíanos tus dudas o solicitud de cotización.</p>
              <a href="mailto:ventas@machina.mx" className="text-base font-mono text-white hover:text-[#FFC107] transition-colors block">ventas@machina.mx</a>
            </div>

            <div 
              ref={(el) => (cardRefs.current[2] = el)}
              data-index="2"
              className={`bg-dark-900/90 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-[#FFC107]/50 hover:shadow-[0_0_30px_rgba(255,193,7,0.15)] transition-all duration-300 group scroll-animate scroll-animate-3 ${visibleCards.includes(2) ? 'visible' : ''}`}
            >
              <div className="w-10 h-10 bg-dark-950 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FFC107] group-hover:scale-110 transition-all duration-300 border border-white/5">
                <MapPin className="w-5 h-5 text-[#FFC107] group-hover:text-dark-900 transition-colors" />
              </div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-tight text-sm">Visítanos</h3>
              <p className="text-gray-400 text-xs mb-3">Av. Industrial 2045, Parque Tecnológico<br/>Ciudad de México, CP 11560</p>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFC107] uppercase tracking-wider">
                <Clock className="w-3 h-3" /> Lun-Vie: 08:00 - 18:00
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-dark-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col animate-fade-in-up delay-200">
            <div className="bg-dark-950/50 p-8 border-b border-white/5">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3 group">
                <MessageSquare className="w-6 h-6 text-[#FFC107] group-hover:scale-110 transition-transform" /> Envíanos un mensaje
              </h2>
              <p className="text-gray-400 text-sm mt-1">Completa el formulario y te contactaremos a la brevedad.</p>
            </div>
            
            {success ? (
              <div className="p-8 md:p-10 flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-400">Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 flex-1">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</label>
                    <input 
                      type="text" 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] focus:outline-none transition-all placeholder:text-dark-700 focus:shadow-[0_0_20px_rgba(255,193,7,0.2)]" 
                      placeholder="Tu nombre" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Apellido</label>
                    <input 
                      type="text" 
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] focus:outline-none transition-all placeholder:text-dark-700 focus:shadow-[0_0_20px_rgba(255,193,7,0.2)]" 
                      placeholder="Tu apellido" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Corporativo</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] focus:outline-none transition-all placeholder:text-dark-700 focus:shadow-[0_0_20px_rgba(255,193,7,0.2)]" 
                      placeholder="nombre@empresa.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] focus:outline-none transition-all placeholder:text-dark-700 focus:shadow-[0_0_20px_rgba(255,193,7,0.2)]" 
                      placeholder="+52 (55) ..." 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo de Servicio</label>
                  <select 
                    name="tipoServicio"
                    value={formData.tipoServicio}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] focus:outline-none transition-all text-gray-400 focus:shadow-[0_0_20px_rgba(255,193,7,0.2)]"
                  >
                    <option value="">Selecciona una opción...</option>
                    <option value="Renta de Maquinaria">Renta de Maquinaria</option>
                    <option value="Compra de Equipo">Compra de Equipo</option>
                    <option value="Servicio Técnico">Servicio Técnico</option>
                    <option value="Refacciones">Refacciones</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Detalles del Proyecto</label>
                  <textarea 
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5} 
                    className="w-full bg-dark-950 border border-dark-700 rounded-lg p-4 text-white focus:ring-1 focus:ring-[#FFC107] focus:border-[#FFC107] focus:outline-none transition-all placeholder:text-dark-700 resize-none" 
                    placeholder="Describe brevemente tus necesidades..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#FFC107] text-dark-950 font-black py-5 rounded-lg hover:bg-[#FFB300] transition-all shadow-lg hover:shadow-[#FFC107]/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" />
                  ) : (
                    <>Enviar Solicitud <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}