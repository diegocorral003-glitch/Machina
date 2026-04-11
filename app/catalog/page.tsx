'use client';

import Link from 'next/link';
import { Search, ArrowRight, Star, Zap, ShieldCheck } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Excavadora CAT 320", category: "Excavadoras", price: "$4,500/día", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop", tag: "Popular", status: "Disponible" },
  { id: 2, name: "Retroexcavadora 420F", category: "Retroexcavadoras", price: "$3,200/día", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop", tag: "Oferta", status: "Pocas Unidades" },
  { id: 3, name: "Grúa Todo Terreno", category: "Grúas", price: "$12,000/día", image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2574&auto=format&fit=crop", tag: "Nuevo", status: "Disponible" },
  { id: 4, name: "Bulldozer D6T", category: "Bulldozers", price: "$5,500/día", image: "https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=2000&auto=format&fit=crop", tag: null, status: "Mantenimiento" },
  { id: 5, name: "Rodillo Compactador", category: "Compactación", price: "$2,800/día", image: "https://images.unsplash.com/photo-1627836873536-e0f0559f3438?q=80&w=2670&auto=format&fit=crop", tag: null, status: "Disponible" },
  { id: 6, name: "Cargador Frontal 950", category: "Cargadores", price: "$4,100/día", image: "https://images.unsplash.com/photo-1579623261984-41f9a81d2b16?q=80&w=2670&auto=format&fit=crop", tag: "Recomendado", status: "Disponible" },
];

const CATEGORIES = ["Todas", "Excavadoras", "Retroexcavadoras", "Grúas", "Bulldozers", "Compactación", "Cargadores"];

export default function Catalog() {
  return (
    <div className="min-h-screen bg-dark-950 bg-noise relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="text-primary font-bold text-xs tracking-wide uppercase flex items-center gap-2">
              <Zap className="w-3 h-3" /> Catálogo 2024
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Flota</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explora nuestra selección de maquinaria pesada certificada. 
            Equipos listos para operar con mantenimiento incluido.
          </p>
        </div>

        <div className="sticky top-24 z-30 mb-12">
          <div className="bg-dark-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, modelo o ID..." 
                className="w-full bg-dark-950 border border-dark-700 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-600"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
                    cat === "Todas" 
                      ? "bg-primary text-dark-950 border-primary shadow-[0_0_15px_rgba(255,193,7,0.3)]" 
                      : "bg-dark-950 text-gray-400 border-dark-700 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <Link key={product.id} href={`/catalog`} className="group block h-full">
              <div className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative">
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-800">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tag && (
                      <span className="bg-primary text-dark-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {product.tag}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg backdrop-blur-md border ${
                      product.status === 'Disponible' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                      product.status === 'Mantenimiento' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 
                      'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-950/40 backdrop-blur-[2px]">
                    <span className="bg-white text-dark-950 px-6 py-3 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                      Ver Detalles <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 relative">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-dark-800 rounded-xl border border-white/10 flex items-center justify-center shadow-xl group-hover:bg-primary group-hover:text-dark-950 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">{product.category}</p>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{product.name}</h3>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Precio por día</p>
                      <p className="text-lg font-black text-white">{product.price}</p>
                    </div>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-3 h-3 text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-dark-900 border border-white/10 text-white px-8 py-4 rounded-sm font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-sm">
            Cargar Más Equipos
          </button>
        </div>
      </section>

      <section className="py-20 border-t border-white/5 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Certificación ISO", desc: "Todos nuestros equipos cumplen con normativas internacionales.", icon: ShieldCheck },
              { title: "Mantenimiento 24/7", desc: "Equipo de soporte técnico disponible en todo momento.", icon: Zap },
              { title: "Garantía Total", desc: "Reemplazo inmediato en caso de falla técnica.", icon: Star },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-6 rounded-xl bg-dark-950 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}