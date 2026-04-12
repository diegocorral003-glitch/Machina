'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hammer, LayoutDashboard, Package, MessageSquare, Settings, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AdminNavbar } from '@/components/AdminNavbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('machina_user');
    if (!userStr) {
      router.replace('/login');
    } else {
      try {
        JSON.parse(userStr);
        setIsAuthorized(true);
      } catch {
        router.replace('/login');
      }
    }
  }, [router]);

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
      <AdminNavbar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}