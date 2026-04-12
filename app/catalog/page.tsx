'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { getProducts } from '@/lib/firestore';

const CATEGORIES = ["Todas", "Excavadoras", "Retroexcavadoras", "Grúas", "Bulldozers", "Compactación", "Cargadores"];

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  precio: string;
  imagen: string;
  tag: string | null;
  status: string;
  descripcion?: string;
  especificacion?: string;
}

export default function Catalog() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarProductos();
  }, [categoria]);

  const cargarProductos = async () => {
    setLoading(true);
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
            {productosFiltrados.map((product) => (
              <Link key={product.id} href={`/catalog/${product.id}`} className="group block h-full">
                <div className="bg-dark-900 rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 relative">
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
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        product.status === 'Disponible' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : product.status === 'Mantenimiento'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors">
                        {product.nombre}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{product.categoria}</p>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {product.descripcion || `Equipo de ${product.categoria.toLowerCase()} para proyectos de construcción.`}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-2xl font-black text-white">{product.precio}</span>
                      <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center group-hover:bg-primary group-hover:text-dark-950 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}