import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, MapPin, Shield, Clock, Zap, Search, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-900/90 to-transparent" />
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase font-bold">Maquinaria Pesada Profesional</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              PODER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                ABSOLUTO
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl border-l-2 border-primary/30 pl-6">
              Renta y venta de equipo de construcción de alto rendimiento. 
              Tecnología de punta y soporte técnico especializado para obras que no pueden detenerse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalog"
                className="bg-primary text-dark-950 px-8 py-4 rounded-sm font-bold text-lg hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] text-center flex items-center justify-center gap-2 group"
              >
                Ver Catálogo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact"
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-white/10 transition-all text-center"
              >
                Contactar Asesor
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Search & Filter Area (Overlapping) */}
      <section className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-dark-900 p-6 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* SearchBar */}
            <div className="lg:col-span-6">
              <label className="flex flex-col w-full h-12">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden bg-dark-950 border border-dark-700 focus-within:border-primary transition-colors">
                  <div className="text-gray-400 flex items-center justify-center px-4">
                    <Search className="w-5 h-5" />
                  </div>
                  <input 
                    className="flex w-full border-none bg-transparent focus:ring-0 px-2 text-base font-medium text-white placeholder:text-gray-500 focus:outline-none" 
                    placeholder="¿Qué equipo necesitas hoy?"
                  />
                </div>
              </label>
            </div>
            {/* Chips/Filters */}
            <div className="lg:col-span-4 flex gap-3 overflow-x-auto pb-1 lg:pb-0">
              <button className="flex h-12 shrink-0 items-center justify-between gap-x-3 rounded-lg bg-dark-950 px-4 min-w-[160px] border border-dark-700 hover:border-primary transition-colors text-gray-300 hover:text-white">
                <span className="text-sm font-bold">Tipo de Equipo</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex h-12 shrink-0 items-center justify-between gap-x-3 rounded-lg bg-dark-950 px-4 min-w-[140px] border border-dark-700 hover:border-primary transition-colors text-gray-300 hover:text-white">
                <span className="text-sm font-bold">Ubicación</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-2">
              <button className="w-full h-12 bg-primary text-dark-950 font-black rounded-lg uppercase tracking-wider hover:bg-primary-hover transition-colors shadow-lg">
                BUSCAR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-dark-900 border-y border-white/5 relative bg-metal mt-12 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { number: "500+", label: "Equipos Disponibles", icon: Shield },
              { number: "24/7", label: "Soporte Técnico", icon: Clock },
              { number: "32", label: "Estados Cubiertos", icon: MapPin },
              { number: "15+", label: "Años de Experiencia", icon: Zap },
            ].map((stat, idx) => (
              <div key={idx} className="py-12 px-6 text-center group hover:bg-white/5 transition-colors">
                <stat.icon className="w-8 h-8 text-dark-600 mx-auto mb-4 group-hover:text-primary transition-colors" />
                <h3 className="text-4xl font-black text-white mb-1 tracking-tight">{stat.number}</h3>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-dark-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8">Empresas que confían en nosotros</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black italic text-white">CONSTRUMEX</span>
            <span className="text-2xl font-black italic text-white">VILLA-GRP</span>
            <span className="text-2xl font-black italic text-white">MEX-MINING</span>
            <span className="text-2xl font-black italic text-white">ROAD-GEN</span>
            <span className="text-2xl font-black italic text-white">PRO-EDIF</span>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 bg-dark-950 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Nuestra Flota</span>
              <h2 className="text-4xl md:text-5xl font-black text-white">CATEGORÍAS DESTACADAS</h2>
            </div>
            <Link to="/catalog" className="flex items-center gap-2 text-white hover:text-primary transition-colors font-bold border-b border-white/20 pb-1 hover:border-primary">
              Ver todo el inventario <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Excavadoras", subtitle: "Potencia Hidráulica", img: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2670&auto=format&fit=crop" },
              { title: "Grúas", subtitle: "Elevación de Carga", img: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2574&auto=format&fit=crop" },
              { title: "Cargadores", subtitle: "Movimiento de Tierra", img: "https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=2000&auto=format&fit=crop" },
            ].map((cat, idx) => (
              <Link key={idx} to="/catalog" className="group relative h-[500px] bg-dark-900 overflow-hidden cursor-pointer border border-dark-800 hover:border-primary/50 transition-colors">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url("${cat.img}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="w-8 h-8 text-primary -rotate-45" />
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="h-1 w-12 bg-primary mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">{cat.subtitle}</p>
                  <h3 className="text-3xl font-black text-white uppercase italic">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products (New Section) */}
      <section className="py-20 bg-dark-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Selección Premium</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Equipos Populares</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Item 1 */}
            <div className="bg-dark-950 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all group flex flex-col hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] bg-dark-800 relative overflow-hidden">
                <img alt="Minicargador compacto" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1590059598982-629226573c4f?q=80&w=2670&auto=format&fit=crop" />
                <div className="absolute top-3 left-3 bg-primary text-dark-950 text-[10px] font-black px-2 py-1 rounded-sm uppercase">Nueva</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h5 className="text-lg font-bold text-white leading-tight mb-1">Bobcat S76 T4</h5>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Minicargador Compacto</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-black text-white text-lg">$2,450 <small className="text-[10px] font-medium text-gray-500">MXN/Día</small></span>
                  <button className="w-8 h-8 rounded-lg bg-dark-800 text-gray-400 group-hover:bg-primary group-hover:text-dark-950 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="bg-dark-950 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all group flex flex-col hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] bg-dark-800 relative overflow-hidden">
                <img alt="Retroexcavadora Caterpillar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop" />
                <div className="absolute top-3 left-3 bg-dark-800 text-gray-300 text-[10px] font-black px-2 py-1 rounded-sm uppercase border border-white/10">Usada</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h5 className="text-lg font-bold text-white leading-tight mb-1">CAT 420F2 IT</h5>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Retroexcavadora</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-black text-white text-lg">$1.2M <small className="text-[10px] font-medium text-gray-500">MXN</small></span>
                  <button className="w-8 h-8 rounded-lg bg-dark-800 text-gray-400 group-hover:bg-primary group-hover:text-dark-950 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="bg-dark-950 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all group flex flex-col hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] bg-dark-800 relative overflow-hidden">
                <img alt="Plataforma de tijera" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop" />
                <div className="absolute top-3 left-3 bg-primary text-dark-950 text-[10px] font-black px-2 py-1 rounded-sm uppercase flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> Favorito</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h5 className="text-lg font-bold text-white leading-tight mb-1">Genie GS-1930</h5>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Plataforma de Tijera</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-black text-white text-lg">$850 <small className="text-[10px] font-medium text-gray-500">MXN/Día</small></span>
                  <button className="w-8 h-8 rounded-lg bg-dark-800 text-gray-400 group-hover:bg-primary group-hover:text-dark-950 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="bg-dark-950 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all group flex flex-col hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] bg-dark-800 relative overflow-hidden">
                <img alt="Excavadora sobre orugas" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2670&auto=format&fit=crop" />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase">Oferta</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h5 className="text-lg font-bold text-white leading-tight mb-1">Komatsu PC210LC</h5>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">Excavadora Pesada</p>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-black text-white text-lg">$4,200 <small className="text-[10px] font-medium text-gray-500">MXN/Día</small></span>
                  <button className="w-8 h-8 rounded-lg bg-dark-800 text-gray-400 group-hover:bg-primary group-hover:text-dark-950 flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Calculator Teaser */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-carbon opacity-20 mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-dark-950 mb-6">¿PLANIFICANDO UNA OBRA?</h2>
            <p className="text-dark-900 text-xl font-medium mb-8 leading-relaxed">
              Utiliza nuestra calculadora de proyectos para estimar la maquinaria necesaria y obtener un presupuesto preliminar en segundos.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-dark-950 text-white px-8 py-4 rounded-sm font-bold hover:bg-dark-900 transition-all shadow-xl flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Calcular Ahora
              </button>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-sm border border-dark-950/10 rotate-3 transform hover:rotate-0 transition-transform duration-500">
             <div className="text-dark-950 font-mono text-sm">
                <div className="flex justify-between mb-2 border-b border-dark-950/20 pb-2">
                  <span>Duración:</span>
                  <span className="font-bold">3 Meses</span>
                </div>
                <div className="flex justify-between mb-2 border-b border-dark-950/20 pb-2">
                  <span>Terreno:</span>
                  <span className="font-bold">Rocoso / 5000m²</span>
                </div>
                <div className="flex justify-between text-lg font-black mt-4">
                  <span>ESTIMADO:</span>
                  <span>$450,000 MXN</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-dark-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-8">Certificaciones y Estándares de Seguridad</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {['ISO 9001', 'NOM-031-STPS', 'CMIC', 'OSHA Compliant'].map((cert, idx) => (
               <div key={idx} className="text-2xl font-black text-white border-2 border-white/20 p-4 rounded-sm hover:border-primary hover:text-primary transition-colors cursor-default">
                 {cert}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Map Section (Grounding Placeholder) */}
      <section className="py-24 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6">
                <span className="text-primary font-bold text-xs tracking-wide uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Cobertura Nacional
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                ENCUENTRA TU <br/>
                <span className="text-gray-500">SUCURSAL MÁS CERCANA</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Nuestra red logística abarca los puntos industriales más importantes del país. 
                Utiliza nuestro asistente IA para localizar equipos disponibles cerca de tu obra.
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-8">
                {['CDMX (Matriz)', 'Monterrey', 'Guadalajara', 'Querétaro', 'Tijuana', 'Mérida'].map((city) => (
                  <li key={city} className="flex items-center gap-3 text-gray-300 border-l-2 border-dark-700 pl-4 hover:border-primary transition-colors cursor-default">
                    <span className="font-medium">{city}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-white text-dark-950 px-6 py-3 rounded-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Ver Mapa Completo
              </button>
            </div>
            <div className="relative h-[500px] bg-dark-800 rounded-sm border border-dark-700 p-2 shadow-2xl">
               {/* Placeholder for Map */}
               <div className="w-full h-full bg-dark-950 rounded-sm border border-dark-700 flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-99.1332,19.4326,5,0/800x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xsZ3J3b3AyM3puMnZwYzR6b2hzb21qIn0.example')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                 <div className="relative z-10 text-center p-8 bg-dark-900/80 backdrop-blur-md rounded-sm border border-white/10">
                   <MapPin className="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
                   <p className="text-white font-bold text-lg">Integración Google Maps</p>
                   <p className="text-xs text-gray-400 mt-2 font-mono">Powered by Gemini Grounding</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
