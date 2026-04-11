import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Shield, Truck, Calendar, ArrowLeft, Download, Ruler, Zap, Weight, ChevronRight, Star, Settings, Wrench } from 'lucide-react';
import { VideoGenerator } from '@/components/VideoGenerator';
import { motion } from 'motion/react';

export function ProductDetail() {
  const { id } = useParams();

  // Mock data - in real app fetch by ID
  const product = {
    name: "Excavadora CAT 320",
    category: "Excavadoras",
    price: "$4,500",
    description: "La excavadora 320 eleva el nivel de rendimiento y eficiencia de combustible en esta clase de tamaño. Con el nivel más alto de tecnología de fábrica estándar en la industria, una cabina enfocada en la comodidad del operador, además de menores costos de combustible y mantenimiento, la 320 establecerá un nuevo ritmo para su productividad y ganancias.",
    specs: [
      { label: "Potencia neta", value: "172 HP", icon: Zap },
      { label: "Peso de operación", value: "22,500 kg", icon: Weight },
      { label: "Profundidad máx", value: "6.72 m", icon: Ruler },
      { label: "Capacidad cucharón", value: "1.19 m³", icon: Truck },
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2670&auto=format&fit=crop"
    ]
  };

  const [activeImage, setActiveImage] = React.useState(product.gallery[0]);

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-12 bg-noise relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-2 text-sm font-bold tracking-wider uppercase"
        >
          <Link to="/catalog" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Catálogo
          </Link>
          <ChevronRight className="w-4 h-4 text-dark-700" />
          <span className="text-gray-500">{product.category}</span>
          <ChevronRight className="w-4 h-4 text-dark-700" />
          <span className="text-primary">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Images & Video (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-dark-900 relative group shadow-2xl aspect-[4/3]">
                <div className="absolute top-4 left-4 z-10 bg-primary text-dark-950 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-dark-950 rounded-full animate-pulse"></span> Disponible
                </div>
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Veo Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <VideoGenerator promptPlaceholder={`Un video cinemático de una ${product.name} excavando en un terreno rocoso al atardecer...`} />
            </motion.div>
          </div>

          {/* Right Column: Info (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-8"
            >
              {/* Header Info */}
              <div className="bg-dark-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-primary"></div>
                  <span className="text-primary font-mono text-xs uppercase tracking-widest">{product.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight uppercase">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm font-medium">4.9 (128 rentas)</span>
                </div>

                <div className="flex items-end gap-3 mb-2">
                  <span className="text-5xl font-black text-white font-mono tracking-tighter">{product.price}</span>
                  <span className="text-gray-500 mb-2 text-sm font-bold uppercase tracking-wider">MXN / Día</span>
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">+ IVA (16%)</p>
              </div>

              {/* Description */}
              <div className="bg-dark-900/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" /> Descripción Técnica
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="bg-dark-900 p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group flex flex-col justify-between h-24">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{spec.label}</p>
                      <spec.icon className="w-4 h-4 text-dark-600 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-white font-black font-mono text-lg">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="bg-dark-900/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Beneficios Incluidos
                </h3>
                <ul className="space-y-3">
                  {[
                    "Garantía de funcionamiento 100%",
                    "Mantenimiento preventivo incluido",
                    "Seguro de maquinaria disponible",
                    "Entrega en sitio en 24h"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 pt-4">
                <button className="w-full bg-primary text-dark-950 py-5 rounded-xl font-black text-lg hover:bg-primary-hover transition-all shadow-[0_0_20px_rgba(255,193,7,0.2)] hover:shadow-[0_0_30px_rgba(255,193,7,0.4)] uppercase tracking-widest flex items-center justify-center gap-3 group">
                  Solicitar Cotización <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-dark-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-dark-800 transition-colors border border-white/10 hover:border-white/20">
                    <Calendar className="w-4 h-4 text-primary" /> Agendar Visita
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-dark-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-dark-800 transition-colors border border-white/10 hover:border-white/20">
                    <Download className="w-4 h-4 text-primary" /> Ficha Técnica
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
