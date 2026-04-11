import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

export function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Inventario', href: '/admin/inventory', icon: Package },
    { name: 'Clientes', href: '/admin/customers', icon: Users },
    { name: 'Cotizaciones', href: '/admin/quotes', icon: FileText },
    { name: 'Configuración', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-dark-900 border-r border-white/5">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-dark-950 font-black text-xl leading-none">M</span>
            </div>
            <span className="text-white font-black text-xl tracking-tighter">
              MACHINA<span className="text-primary">.</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all">
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-dark-900 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary" />
              <input 
                type="text" 
                placeholder="Buscar en el panel..." 
                className="bg-dark-950 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-dark-900"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-dark-800 border border-white/10 overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=FFC107&color=141414" alt="Admin" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-dark-950 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            className="fixed inset-y-0 left-0 w-64 bg-dark-900 border-r border-white/5 flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
              <span className="text-white font-black text-xl tracking-tighter">
                MACHINA<span className="text-primary">.</span>
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 py-6 px-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === item.href 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
