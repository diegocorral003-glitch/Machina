'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hammer, LayoutDashboard, Package, MessageSquare, Settings, LogOut, Users } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
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

  useEffect(() => {
    const userStr = localStorage.getItem('machina_user');
    // Allow access to /admin/setup for initial setup
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
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-[#0F1012] border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFC107] rounded-sm flex items-center justify-center">
              <Hammer className="w-6 h-6 text-[#0a0a0a] transform -rotate-12" />
            </div>
            <span className="text-white font-black text-xl tracking-tight">MACHINA</span>
            <span className="text-gray-500 text-sm font-medium ml-2">Admin</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FFC107]/10 text-[#FFC107]'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User & Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC107]/20 rounded-full flex items-center justify-center">
                <span className="text-[#FFC107] font-bold text-sm">
                  {userNombre.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">{userNombre}</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-colors"
            >
              {loggingOut ? (
                <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}