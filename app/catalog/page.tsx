'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Zap, Loader2, Star, ShieldCheck } from 'lucide-react';
import { getProducts } from '@/lib/firestore';

const CATEGORIES = ["Todas", "Excavadoras", "Retroexcavadoras", "Grúas", "Bulldozers", "Compactación", "Cargadores"];

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  tag: string | null;
  status: string;
  descripcion?: string;
  marca?: string;
  modelo?: string;
}

export default function Catalog() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [visibleTrust, setVisibleTrust] = useState(false);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trustSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cargarProductos();
  }, [categoria]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleProducts.includes(index)) {
            setVisibleProducts(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [productos, visibleProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visibleTrust) {
          setVisibleTrust(true);
        }
      },
      { threshold: 0.2 }
    );

    if (trustSectionRef.current) {
      observer.observe(trustSectionRef.current);
    }

    return () => observer.disconnect();
  }, [visibleTrust]);

  const cargarProductos = async () => {
    setLoading(true);
    setVisibleProducts([]);
    try {
      const data = await getProducts(categoria === "Todas" ? undefined : categoria);
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
    setLoading(false);
  };

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-950 bg-noise relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/PageCatalogo.avif" 
            alt="Catalogo" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-950/50 to-dark-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
              <span className="text-primary font-bold text-xs tracking-wide uppercase flex items-center gap-2">
                <Zap className="w-3 h-3" /> Catálogo 2026
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Flota</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explora nuestra seleccion de maquinaria pesada certificada. 
              Equipos listos para operar con mantenimiento incluido.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Search & Filter Bar */}
        <div className="sticky top-24 z-30 mb-12">
          <div className="bg-dark-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, modelo o ID..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-dark-600"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoria(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
                    categoria === cat 
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No se encontraron productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((product, index) => (
              <Link key={product.id} href={`/catalog/${product.id}`} className="group block h-full">
                <div 
                  ref={(el) => (productRefs.current[index] = el)}
                  data-index={index}
                  className={`bg-dark-900 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative ${
                    visibleProducts.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: visibleProducts.includes(index) ? `${index * 50}ms` : '0ms' }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-dark-800">
                    <img 
                      src={product.imagen} 
                      alt={product.nombre} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                    
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.tag && (
                        <span className="bg-primary text-dark-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md ${
                        product.disponibilidad === 'disponible' || product.status === 'Disponible'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {product.disponibilidad === 'disponible' || product.status === 'Disponible' ? 'Disponible' : 'No Disponible'}
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
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">{product.categoria}</p>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{product.nombre}</h3>
                      <p className="text-gray-500 text-sm mt-1">{product.marca} {product.modelo}</p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Precio por dia</p>
                        <p className="text-lg font-black text-white">${product.precio?.toLocaleString('es-MX')}</p>
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
        )}
      </section>

      {/* Trust Indicators */}
      <section className="py-20 border-t border-white/5 bg-dark-900/50" ref={trustSectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Certificacion ISO", desc: "Todos nuestros equipos cumplen con normativas internacionales.", icon: ShieldCheck },
              { title: "Mantenimiento 24/7", desc: "Equipo de soporte tecnico disponible en todo momento.", icon: Zap },
              { title: "Garantia Total", desc: "Reemplazo inmediato en caso de falla tecnica.", icon: Star },
            ].map((item, idx) => (
              <div 
                key={idx}
                className={`flex gap-4 items-start p-6 rounded-xl bg-dark-950 border border-white/5 hover:border-primary/30 transition-all duration-500 ${
                  visibleTrust
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visibleTrust ? `${idx * 150}ms` : '0ms' }}
              >
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