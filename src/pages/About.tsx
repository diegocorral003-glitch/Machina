import React from 'react';
import { Target, Eye, ShieldCheck, MapPin, Award, Users, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  return (
    <div className="min-h-screen bg-dark-950 bg-noise">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop" 
            alt="Construction Site" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="text-primary font-bold text-xs tracking-wide uppercase">Desde 1998</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
              Nuestra <span className="text-primary">Historia</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl border-l-4 border-primary pl-6">
              Líderes en soluciones de maquinaria pesada para la construcción, minería e infraestructura en todo el territorio mexicano.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-1 bg-primary"></div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Compromiso y Excelencia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Misión",
                desc: "Proveer la mejor maquinaria y soluciones técnicas para construir el futuro de la infraestructura en México, garantizando operatividad total."
              },
              {
                icon: Eye,
                title: "Visión",
                desc: "Ser el referente nacional indiscutible en renta y venta de equipo industrial, distinguidos por nuestra innovación y servicio post-venta."
              },
              {
                icon: ShieldCheck,
                title: "Valores",
                desc: "Calidad certificada, seguridad industrial absoluta y responsabilidad ambiental en cada proyecto que respaldamos."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-dark-900 border border-white/5 p-8 rounded-sm hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <item.icon className="w-24 h-24 text-primary" />
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-dark-900 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-900 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-dark-950 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <p className="text-primary font-mono text-sm uppercase tracking-widest mb-2">Trayectoria en el mercado</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                MÁS DE <span className="text-primary">25 AÑOS</span>
              </h2>
              <p className="text-xl text-gray-400 font-medium">De experiencia comprobada en la industria</p>
            </div>
            
            <div className="flex gap-12 md:gap-20 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center justify-center gap-1">
                  +500
                  <Wrench className="w-6 h-6 text-primary opacity-50" />
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Equipos Disponibles</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center justify-center gap-1">
                  100%
                  <Award className="w-6 h-6 text-primary opacity-50" />
                </div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Garantía de Servicio</p>
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
              Contamos con centros de distribución y talleres de servicio estratégico en los principales polos industriales de México. Nuestra red logística nos permite entregar maquinaria pesada en cualquier punto de la república en tiempo récord.
            </p>
            
            <ul className="space-y-4">
              {[
                "Ciudad de México (Matriz)",
                "Monterrey, Nuevo León",
                "Guadalajara, Jalisco",
                "Querétaro, Qro."
              ].map((loc, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-medium p-4 bg-dark-900 rounded-sm border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  {loc}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[500px] bg-dark-900 rounded-2xl border border-white/10 overflow-hidden group">
            {/* Abstract Map Representation */}
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" 
                 alt="Map Background" 
                 className="w-full h-full object-cover grayscale"
               />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
            
            {/* Map Markers Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="bg-primary text-dark-950 font-bold px-6 py-3 rounded-sm shadow-xl uppercase tracking-wider self-start transform -rotate-2 mb-4">
                Cobertura Total
              </div>
              <p className="text-white text-sm max-w-xs bg-dark-950/80 backdrop-blur-md p-4 rounded-sm border border-white/10">
                Llegamos a donde tu proyecto lo requiera. Logística especializada para transporte de maquinaria pesada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
