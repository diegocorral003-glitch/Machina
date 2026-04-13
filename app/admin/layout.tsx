'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hammer, LayoutDashboard, Package, MessageSquare, Settings, LogOut, Users, Menu, X, FolderKanban } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/categorias', label: 'Categorías', icon: FolderKanban },
  { href: '/admin/mensajes', label: 'Mensajes', icon: MessageSquare },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [userNombre, setUserNombre] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('machina_user');
    if (pathname === '/admin/setup') {
      setIsAuthorized(true);
      return;
    }
    if (!userStr) {
      router.replace('/login');
    } else {
      try {
        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
          router.replace('/');
        } else {
          setUserNombre(user.nombre || 'Admin');
          setIsAuthorized(true);
        }
      } catch {
        router.replace('/login');
      }
    }
  }, [router, pathname]);

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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#FFC107]/30 border-t-[#FFC107] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Admin Navbar - Mismo diseño que el cliente */}
      <nav className="bg-dark-900/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 bg-noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/admin" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(255,193,7,0.3)]">
                <div className="absolute inset-0 bg-metal opacity-50"></div>
                <Hammer className="w-6 h-6 text-dark-900 relative z-10 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl tracking-tighter leading-none">
                  MACHINA
                </span>
                <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase leading-none mt-1">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 border border-transparent",
                        isActive
                          ? "text-primary bg-white/5 border-white/10 shadow-inner"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* User & Logout */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="/" 
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-sm hover:bg-white/5"
              >
                Ver sitio
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    {userNombre.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-white text-sm font-medium">{userNombre}</span>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                {loggingOut ? (
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-dark-900 border-t border-dark-700 bg-noise">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-md text-base font-medium flex items-center gap-2",
                    pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
                      ? "text-primary bg-white/5"
                      : "text-gray-300 hover:text-primary hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-4 pt-4 pb-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                >
                  Ver sitio
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:bg-white/5"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}