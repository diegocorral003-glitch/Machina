import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const stats = [
    { name: 'Ingresos Mensuales', value: '$1.2M', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { name: 'Equipos Rentados', value: '142', change: '+5.2%', trend: 'up', icon: Package },
    { name: 'Nuevos Clientes', value: '28', change: '-2.1%', trend: 'down', icon: Users },
    { name: 'Mantenimientos', value: '12', change: 'Urgente', trend: 'neutral', icon: AlertCircle },
  ];

  const recentRentals = [
    { id: 'RT-1042', client: 'Constructora Alfa', equipment: 'Excavadora CAT 320', status: 'Activo', date: '10 Mar 2026', amount: '$45,000' },
    { id: 'RT-1041', client: 'Ingeniería Sur', equipment: 'Grúa Todo Terreno', status: 'Pendiente', date: '09 Mar 2026', amount: '$120,000' },
    { id: 'RT-1040', client: 'Desarrollos MX', equipment: 'Retroexcavadora 420F', status: 'Completado', date: '08 Mar 2026', amount: '$32,000' },
    { id: 'RT-1039', client: 'Grupo Constructor', equipment: 'Bulldozer D6T', status: 'Activo', date: '05 Mar 2026', amount: '$55,000' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Panel de Control</h1>
          <p className="text-sm text-gray-400">Resumen general de operaciones y rendimiento.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-dark-900 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5 transition-all">
            Descargar Reporte
          </button>
          <button className="bg-primary text-dark-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
            Nueva Renta
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                <stat.icon className={`w-5 h-5 ${stat.trend === 'neutral' ? 'text-orange-500' : 'text-primary'}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${
                stat.trend === 'up' ? 'bg-green-500/10 text-green-400' : 
                stat.trend === 'down' ? 'bg-red-500/10 text-red-400' : 
                'bg-orange-500/10 text-orange-400'
              }`}>
                {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                {stat.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-black text-white font-mono tracking-tighter mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400 font-medium">{stat.name}</p>
            </div>
            
            {/* Decorative background element */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Rentals Table */}
        <div className="lg:col-span-2 bg-dark-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Rentas Recientes</h2>
            <button className="text-sm text-primary hover:text-primary-hover font-bold transition-colors">Ver todas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-950/50 border-b border-white/5 text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-4 pl-6">ID Renta</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Equipo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right pr-6">Monto</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentRentals.map((rental, idx) => (
                  <tr key={rental.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 pl-6 font-mono text-gray-300 group-hover:text-primary transition-colors">{rental.id}</td>
                    <td className="p-4 text-white font-medium">{rental.client}</td>
                    <td className="p-4 text-gray-400">{rental.equipment}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                        rental.status === 'Activo' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        rental.status === 'Pendiente' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        'bg-dark-800 text-gray-400 border-white/10'
                      }`}>
                        {rental.status === 'Activo' && <CheckCircle2 className="w-3 h-3" />}
                        {rental.status === 'Pendiente' && <Clock className="w-3 h-3" />}
                        {rental.status}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6 font-mono font-bold text-white">{rental.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="bg-dark-900 border border-white/5 rounded-2xl p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6">Alertas de Mantenimiento</h2>
          
          <div className="space-y-4 flex-1">
            {[
              { equip: 'Bulldozer D6T', issue: 'Cambio de aceite', time: 'Hace 2 hrs', urgent: true },
              { equip: 'Grúa RT-50', issue: 'Revisión hidráulica', time: 'Hace 5 hrs', urgent: false },
              { equip: 'Excavadora 320', issue: 'Filtros de aire', time: 'Ayer', urgent: false },
            ].map((alert, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-dark-950 border border-white/5 hover:border-white/10 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${alert.urgent ? 'bg-red-500 animate-pulse' : 'bg-orange-500'}`}></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">{alert.equip}</h4>
                  <p className="text-xs text-gray-400 mt-1">{alert.issue}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{alert.time}</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-dark-950 border border-white/10 text-white py-3 rounded-xl text-sm font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            Ver Calendario de Taller <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
