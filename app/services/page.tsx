'use client';

import { Wrench, Truck, Shield, Clock, Zap } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: "Renta de Maquinaria",
      description: "Renta diaria, semanal o mensual de equipos de construcción. Incluye operador opcional.",
    },
    {
      icon: Wrench,
      title: "Mantenimiento",
      description: "Servicio técnico especializado en sitio. Técnicos certificados disponibles 24/7.",
    },
    {
      icon: Shield,
      title: "Seguro Integrado",
      description: "Todos nuestros equipos cuentan con seguro. Sin costos adicionales por daño accidental.",
    },
    {
      icon: Zap,
      title: "Entrega a Obra",
      description: "Entregamos y recogemos la maquinaria en tu obra. Servicio de transporte nacional.",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <section className="relative py-32 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">NUESTROS <span className="text-primary">SERVICIOS</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Soluciones integrales para tu obra. Mas que renting, una alianza estratégica.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-dark-900 p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}