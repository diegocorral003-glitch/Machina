'use client';

import { Settings, Clock } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-[35vh] min-h-[300px] rounded-2xl overflow-hidden">
        <img 
          src="/PageConfiguracion.avif" 
          alt="Configuracion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <div className="inline-block bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="text-[#FFC107] font-bold text-xs tracking-wide uppercase">Ajustes</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            <span className="text-[#FFC107]">CONFIGURACION</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Personaliza los ajustes de tu empresa. Esta seccion estara disponible pronto.
          </p>
        </div>
      </div>

      <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-[#FFC107]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-[#FFC107]" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Proximamente</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Esta seccion esta en desarrollo. Muy pronto podras configurar los datos de tu empresa, horarios de atencion y mas opciones.
        </p>
      </div>
    </div>
  );
}