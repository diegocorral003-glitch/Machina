'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Hammer, LayoutDashboard, Package, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState } from 'react';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Productos', path: '/admin/productos', icon: Package },
  { name: 'Mensajes', path: '/admin/mensajes', icon: MessageSquare },
  { name: 'Configuración', path: '/admin/configuracion', icon: Settings },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      localStorage.removeItem('machina_user');
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    setLoggingOut(false);
  };

  return (
    <nav className="bg-[#0F1012]/90 backdrop-blur-xl border-b border-[#1a1a1a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(255,193,7,0.3)] group-hover:scale-105 transition-transform">
              <Hammer className="w-6 h-6 text-dark-900 relative z-10 transform -rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tighter leading-none">
                MACHINA
              </span>
              <span className="text-[10px] text-primary font-mono tracking-widest uppercase leading-none mt-1">
                Panel Admin
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="text-gray-400 hover:text-primary text-sm font-medium px-3 py-2 hover:bg-white/5 rounded-sm transition-colors"
            >
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm font-medium px-3 py-2 hover:bg-red-500/10 rounded-sm transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? 'Saliendo...' : 'Cerrar Sesión'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-[#1a1a1a] py-4 space-y-2">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-sm text-base font-medium flex items-center gap-3 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <div className="border-t border-[#1a1a1a] pt-4 mt-4 space-y-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-sm text-base font-medium text-gray-400 hover:text-primary hover:bg-white/5"
              >
                Ver sitio
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-sm text-base font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}