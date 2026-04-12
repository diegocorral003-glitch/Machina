'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getProductById } from '@/lib/firestore';

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

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      if (params.id) {
        const data = await getProductById(params.id as string);
        setProducto(data);
      }
      setLoading(false);
    };
    cargarProducto();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black text-white mb-4">Producto no encontrado</h1>
        <Link href="/catalog" className="text-primary hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 bg-grid-pattern relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
      
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link 
          href="/catalog" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-dark-900 border border-white/10">
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {producto.tag && (
                  <span className="bg-primary text-dark-950 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {producto.tag}
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                  producto.status === 'Disponible' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : producto.status === 'Mantenimiento'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {producto.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span className="text-primary font-mono text-sm uppercase tracking-widest">
                {producto.categoria}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {producto.nombre}
            </h1>
            <p className="text-4xl font-black text-primary mb-8">
              {producto.precio}
            </p>

            {producto.descripcion && (
              <div className="mb-8">
                <h3 className="text-white font-bold mb-3">Descripción</h3>
                <p className="text-gray-400 leading-relaxed">{producto.descripcion}</p>
              </div>
            )}

            {producto.especificacion && (
              <div className="mb-8">
                <h3 className="text-white font-bold mb-3">Especificaciones</h3>
                <div className="bg-dark-900 p-4 rounded-xl border border-white/10">
                  <p className="text-gray-300 font-mono text-sm">{producto.especificacion}</p>
                </div>
              </div>
            )}

            <div className="bg-dark-900 p-6 rounded-xl border border-white/10 mb-8">
              <h3 className="text-white font-bold mb-4">Incluye:</h3>
              <div className="space-y-3">
                {['Operador certificado', 'Mantenimiento incluido', 'Seguro completo', 'Soporte 24/7'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="flex-1 bg-primary text-dark-950 px-8 py-4 rounded-xl font-bold text-center hover:bg-primary-hover transition-all shadow-lg"
              >
                Solicitar Cotización
              </Link>
              <Link 
                href="/contact" 
                className="flex-1 bg-dark-900 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-white/5 transition-all"
              >
                Contactar Asesor
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-dark-900 rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-black text-white mb-6">¿Necesitas este equipo?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Llámanos</h4>
                <p className="text-gray-400 text-sm">+52 55 8899 4455</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Escríbenos</h4>
                <p className="text-gray-400 text-sm">contacto@machina.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Visítanos</h4>
                <p className="text-gray-400 text-sm">Av. Industrial 2045, Ciudad de México</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}