'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, MessageSquare, TrendingUp, ArrowRight, Plus, Clock } from 'lucide-react';
import { getProducts, getContactMessages } from '@/lib/firestore';

interface Stats {
  productos: number;
  mensajes: number;
  mensajesNuevos: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    productos: 0,
    mensajes: 0,
    mensajesNuevos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const productos = await getProducts();
        const mensajes = await getContactMessages();
        const mensajesNuevos = mensajes.filter((m: { leido: boolean }) => !m.leido).length;
        
        setStats({
          productos: productos.length,
          mensajes: mensajes.length,
          mensajesNuevos
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
      setLoading(false);
    }
    loadStats();
  }, []);

  const statCards = [
    { 
      name: 'Total Productos', 
      value: stats.productos, 
      icon: Package, 
      color: 'bg-[#FFC107]/10 text-[#FFC107]',
      href: '/admin/productos'
    },
    { 
      name: 'Mensajes Recibidos', 
      value: stats.mensajes, 
      icon: MessageSquare, 
      color: 'bg-blue-500/10 text-blue-500',
      href: '/admin/mensajes'
    },
    { 
      name: 'Mensajes Nuevos', 
      value: stats.mensajesNuevos, 
      icon: Clock, 
      color: 'bg-green-500/10 text-green-500',
      href: '/admin/mensajes'
    },
  ];

  const quickActions = [
    { name: 'Agregar Producto', icon: Plus, href: '/admin/productos/nuevo', color: 'bg-[#FFC107] text-[#0a0a0a]' },
    { name: 'Ver Mensajes', icon: MessageSquare, href: '/admin/mensajes', color: 'bg-[#1a1a1a] text-white border border-[#333]' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#FFC107]/30 border-t-[#FFC107] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 -mt-4">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[350px] rounded-2xl overflow-hidden">
        <img 
          src="/PageAdmin.avif" 
          alt="Dashboard" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <div className="inline-block bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="text-[#FFC107] font-bold text-xs tracking-wide uppercase">Panel de Control</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            CONTROL <span className="text-[#FFC107]">TOTAL</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Gestiona tu negocio desde un solo lugar. Productos, clientes y mensajes bajo tu control.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 hover:border-[#FFC107]/30 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.name}</p>
                <p className="text-3xl font-black text-white mt-2">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-[#FFC107] transition-colors">
              <span>Ver mas</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Acciones Rapidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={`flex items-center gap-4 p-4 rounded-lg ${action.color} hover:opacity-90 transition-all group`}
            >
              <action.icon className="w-6 h-6" />
              <span className="font-bold">{action.name}</span>
              <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#FFC107]/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#FFC107]" />
          </div>
          <div>
            <h3 className="text-white font-bold">Resumen de Actividad</h3>
            <p className="text-gray-500 text-sm mt-1">
              Tienes {stats.mensajesNuevos} mensajes nuevos esperando respuesta. Mantén tu catalogo actualizado para atraer mas clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}