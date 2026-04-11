'use client';

import Link from 'next/link';
import { ArrowRight, Search, Shield, Clock, MapPin, Zap, ChevronRight, Star, Zap as ZapIcon } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Bobcat S76 T4", category: "Minicargador Compacto", price: "$2,450", unit: "MXN/Día", image: "https://images.unsplash.com/photo-1590059598982-629226573c4f?q=80&w=2670&auto=format&fit=crop", tag: "Nueva" },
  { id: 2, name: "CAT 420F2 IT", category: "Retroexcavadora", price: "$1.2M", unit: "MXN", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop", tag: "Usada" },
  { id: 3, name: "Genie GS-1930", category: "Plataforma de Tijera", price: "$850", unit: "MXN/Día", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop", tag: "Favorito" },
  { id: 4, name: "Komatsu PC210LC", category: "Excavadora Pesada", price: "$4,200", unit: "MXN/Día", image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2670&auto=format&fit=crop", tag: "Oferta" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
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
          <div className="max-w-3xl">
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
                href="/catalog"
                className="bg-primary text-dark-950 px-8 py-4 rounded-sm font-bold text-lg hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] text-center flex items-center justify-center gap-2 group"
              >
                Ver Catálogo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-white/10 transition-all text-center"
              >
                Contactar Asesor
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Search & Filter Area */}
      <section className="relative z-20 -mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-dark-900 p-6 rounded-xl shadow-2xl border border-white/10 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-6">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-12 overflow-hidden bg-dark-950 border border-dark-700 focus-within:border-primary transition-colors">
                <div className="text-gray-400 flex items-center justify-center px-4">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  className="flex w-full border-none bg-transparent focus:ring-0 px-2 text-base font-medium text-white placeholder:text-gray-500 focus:outline-none" 
                  placeholder="¿Qué equipo necesitas hoy?"
                />
              </div>
            </div>
            <div className="lg:col-span-4 flex gap-3 overflow-x-auto pb-1 lg:pb-0">
              <button className="flex h-12 shrink-0 items-center justify-between gap-x-3 rounded-lg bg-dark-950 px-4 min-w-[160px] border border-dark-700 hover:border-primary transition-colors text-gray-300 hover:text-white">
                <span className="text-sm font-bold">Tipo de Equipo</span>
              </button>
              <button className="flex h-12 shrink-0 items-center justify-between gap-x-3 rounded-lg bg-dark-950 px-4 min-w-[140px] border border-dark-700 hover:border-primary transition-colors text-gray-300 hover:text-white">
                <span className="text-sm font-bold">Ubicación</span>
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
      <section className="bg-dark-900 border-y border-white/5 mt-12 pt-12">
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

      {/* Featured Categories */}
      <section className="py-32 bg-dark-950 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Nuestra Flota</span>
              <h2 className="text-4xl md:text-5xl font-black text-white">CATEGORÍAS DESTACADAS</h2>
            </div>
            <Link href="/catalog" className="flex items-center gap-2 text-white hover:text-primary transition-colors font-bold border-b border-white/20 pb-1 hover:border-primary">
              Ver todo el inventario <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Excavadoras", subtitle: "Potencia Hidráulica", img: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2670&auto=format&fit=crop" },
              { title: "Grúas", subtitle: "Elevación de Carga", img: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2574&auto=format&fit=crop" },
              { title: "Cargadores", subtitle: "Movimiento de Tierra", img: "https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=2000&auto=format&fit=crop" },
            ].map((cat, idx) => (
              <Link key={idx} href="/catalog" className="group relative h-[500px] bg-dark-900 overflow-hidden cursor-pointer border border-dark-800 hover:border-primary/50 transition-colors">
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

      {/* Featured Products */}
      <section className="py-20 bg-dark-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">Selección Premium</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Equipos Populares</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <Link key={idx} href={`/catalog`} className="bg-dark-950 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all group flex flex-col hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/3] bg-dark-800 relative overflow-hidden">
                  <img alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={product.image} />
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-primary text-dark-950 text-[10px] font-black px-2 py-1 rounded-sm uppercase">{product.tag}</div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h5 className="text-lg font-bold text-white leading-tight mb-1">{product.name}</h5>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-4">{product.category}</p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-black text-white text-lg">{product.price} <small className="text-[10px] font-medium text-gray-500">{product.unit}</small></span>
                    <button className="w-8 h-8 rounded-lg bg-dark-800 text-gray-400 group-hover:bg-primary group-hover:text-dark-950 flex items-center justify-center transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
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
            <Link href="/contact" className="bg-dark-950 text-white px-8 py-4 rounded-sm font-bold hover:bg-dark-900 transition-all shadow-xl flex items-center gap-2">
              <ZapIcon className="w-5 h-5 text-primary" /> Calcular Ahora
            </Link>
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
    </div>
  );
}