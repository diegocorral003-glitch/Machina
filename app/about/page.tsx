'use client';

import { useState, useEffect, useRef } from 'react';
import { Target, Eye, ShieldCheck, MapPin, Wrench, Award } from 'lucide-react';

export default function About() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visibleStats, setVisibleStats] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
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

    cardsRef.current.forEach((ref) => {
      if (ref) cardsObserver.observe(ref);
    });

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visibleStats) {
          setVisibleStats(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      cardsObserver.disconnect();
      statsObserver.disconnect();
    };
  }, [visibleCards, visibleStats]);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/PageNosotros.avif" 
            alt="Nosotros" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/50 to-dark-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="text-primary font-bold text-xs tracking-wide uppercase">Desde 1998</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
              Nuestra <span className="text-primary">Historia</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto border-l-4 border-primary pl-6">
              Lideres en soluciones de maquinaria pesada para la construccion, mineria e infraestructura en todo el territorio mexicano.
            </p>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12 justify-center">
            <div className="w-12 h-1 bg-primary"></div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Compromiso y Excelencia</h2>
            <div className="w-12 h-1 bg-primary"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Mision",
                desc: "Proveer la mejor maquinaria y soluciones tecnicas para construir el futuro de la infraestructura en Mexico, garantizando operatividad total."
              },
              {
                icon: Eye,
                title: "Vision",
                desc: "Ser el referente nacional indiscutible en renta y venta de equipo industrial, distinguidos por nuestra innovacion y servicio post-venta."
              },
              {
                icon: ShieldCheck,
                title: "Valores",
                desc: "Calidad certificada, seguridad industrial absoluta y responsabilidad ambiental en cada proyecto que respaldamos."
              }
            ].map((item, index) => (
              <div 
                ref={(el) => (cardsRef.current[index] = el)}
                data-index={index}
                className={`bg-dark-900 border border-white/5 p-8 rounded-xl hover:border-primary/50 transition-all duration-500 group relative overflow-hidden ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: visibleCards.includes(index) ? `${index * 150}ms` : '0ms'
                }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <item.icon className="w-24 h-24 text-primary" />
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-dark-900 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-dark-900 border-y border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`bg-dark-950 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-700 ${
            visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex-1 text-center md:text-left">
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-2">Trayectoria en el mercado</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                MAS DE <span className="text-primary">25 ANOS</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">De experiencia comprobada en la industria</p>
            </div>
            
            <div className="flex gap-8 md:gap-16 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
              <div className={`text-center transition-all duration-500 ${visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center justify-center gap-1">
                  +500
                  <Wrench className="w-6 h-6 text-primary opacity-50" />
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Equipos Disponibles</p>
              </div>
              <div className={`text-center transition-all duration-500 ${visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center justify-center gap-1">
                  100%
                  <Award className="w-6 h-6 text-primary opacity-50" />
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Garantia de Servicio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations / Map Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-1 bg-primary"></div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Presencia Nacional</h2>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Contamos con centros de distribucion y talleres de servicio estrategico en los principales polos industriales de Mexico. Nuestra red logistica nos permite entregar maquinaria pesada en cualquier punto de la republica en tiempo record.
            </p>
            
            <ul className="space-y-4">
              {[
                "Ciudad de Mexico (Matriz)",
                "Monterrey, Nuevo Leon",
                "Guadalajara, Jalisco",
                "Queretaro, Qro."
              ].map((loc, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-medium p-4 bg-dark-900 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  {loc}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[500px] bg-dark-900 rounded-2xl border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" 
                alt="Mapa" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="bg-primary text-dark-950 font-bold px-6 py-3 rounded-lg shadow-xl uppercase tracking-wider self-start transform -rotate-2 mb-4">
                Cobertura Total
              </div>
              <p className="text-white text-sm max-w-xs bg-dark-950/80 backdrop-blur-md p-4 rounded-lg border border-white/10">
                Llegamos a donde tu proyecto lo requiera. Logistica especializada para transporte de maquinaria pesada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}