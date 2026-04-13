'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Wrench, Truck, ShoppingBag, Calendar, Users, Settings, ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Calendar,
      title: "Renta de Maquinaria",
      description: "Flota moderna y diversificada disponible por dia, semana o mes. Equipos certificados y listos para operar.",
      features: ["Disponibilidad inmediata", "Mantenimiento incluido", "Seguro de equipo", "Operadores certificados opcionales"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop"
    },
    {
      icon: ShoppingBag,
      title: "Venta de Equipos",
      description: "Distribuidores autorizados de las mejores marcas. Equipos nuevos y seminuevos con garantia certificada.",
      features: ["Financiamiento disponible", "Garantia extendida", "Capacitacion de entrega", "Soporte post-venta"],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop"
    },
    {
      icon: Wrench,
      title: "Mantenimiento",
      description: "Taller especializado con tecnicos certificados. Mantenimiento preventivo y correctivo en sitio o en nuestras instalaciones.",
      features: ["Diagnostico computarizado", "Polizas de servicio", "Atencion 24/7", "Reparaciones mayores"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop"
    },
    {
      icon: Settings,
      title: "Refacciones",
      description: "Amplio stock de refacciones originales y OEM para todas las marcas que manejamos. Envios a todo el pais.",
      features: ["Inventario en linea", "Asesoria tecnica", "Envios express", "Garantia de fabrica"],
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2670&auto=format&fit=crop"
    },
    {
      icon: Truck,
      title: "Logistica y Transporte",
      description: "Servicio de traslado de maquinaria pesada a cualquier punto de la republica. Lowboys y plataformas especializadas.",
      features: ["Permisos federales", "Seguro de carga", "Rastreo satelital", "Maniobras de carga/descarga"],
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2670&auto=format&fit=crop"
    },
    {
      icon: Users,
      title: "Capacitacion",
      description: "Cursos teoricos y practicos para operadores de maquinaria pesada. Certificaciones DC-3 y seguridad industrial.",
      features: ["Instructores certificados", "Simuladores virtuales", "Practicas en campo", "Certificacion oficial"],
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop"
    }
  ];

  const [visibleServices, setVisibleServices] = useState<number[]>([]);
  const [visibleProcess, setVisibleProcess] = useState(false);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleServices.includes(index)) {
            setVisibleServices(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [services, visibleServices]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visibleProcess) {
          setVisibleProcess(true);
        }
      },
      { threshold: 0.2 }
    );

    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => observer.disconnect();
  }, [visibleProcess]);

  return (
    <div className="min-h-screen bg-dark-950 bg-noise relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0">
          <img 
            src="/Servicios4.avif" 
            alt="Servicios" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/50 to-dark-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="text-primary font-bold text-xs tracking-wide uppercase flex items-center gap-2">
                <Zap className="w-3 h-3" /> Soluciones Integrales
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
              Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Servicios</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Mas que maquinaria, ofrecemos soluciones completas para potenciar la productividad de tu proyecto.
              Respaldo total en cada etapa de tu obra.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={(el) => (serviceRefs.current[index] = el)}
                data-index={index}
                className={`group relative bg-dark-900 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${
                  visibleServices.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visibleServices.includes(index) ? `${index * 100}ms` : '0ms' }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 z-20 w-12 h-12 bg-dark-950/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-dark-950 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-white group-hover:text-dark-950 transition-colors" />
                  </div>
                </div>

                <div className="p-8 pt-4 relative z-20">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-400 mb-8 text-sm leading-relaxed min-h-[60px]">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:gap-4 transition-all group-hover:text-primary"
                  >
                    Cotizar Servicio <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        ref={processRef}
        className="py-24 bg-dark-900 border-y border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Metodologia</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Proceso de Trabajo</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            {[
              { step: "01", title: "Diagnostico", desc: "Evaluamos las necesidades especificas de tu proyecto.", delay: "0s" },
              { step: "02", title: "Propuesta", desc: "Disenamos una solucion a medida con costos optimizados.", delay: "0.1s" },
              { step: "03", title: "Ejecucion", desc: "Implementacion rapida con seguimiento en tiempo real.", delay: "0.2s" },
              { step: "04", title: "Soporte", desc: "Acompanamiento continuo hasta finalizar la obra.", delay: "0.3s" }
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`relative text-center group`}
                style={{ animation: visibleProcess ? `floatUp 0.6s ease-out ${item.delay} forwards` : 'opacity: 0' }}
              >
                <div className="w-24 h-24 mx-auto bg-dark-950 rounded-full border-4 border-dark-900 flex items-center justify-center mb-6 relative z-10 group-hover:border-primary transition-colors duration-300 shadow-xl group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-gray-700 group-hover:text-primary transition-colors">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <div className="absolute inset-0 bg-metal opacity-10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-yellow-500 to-primary opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-dark-950 mb-4 uppercase tracking-tight">¿Necesitas una solucion a medida?</h2>
            <p className="text-dark-900 text-lg font-bold max-w-xl opacity-80">
              Nuestros ingenieros pueden disenar un plan de renta o mantenimiento adaptado especificamente a las necesidades de tu obra.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="bg-dark-950 text-white px-10 py-5 rounded-lg font-black uppercase tracking-widest hover:bg-dark-900 transition-all shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 flex items-center gap-3"
          >
            Contactar Asesor <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}