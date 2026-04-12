'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, Hammer, User, LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Servicios', path: '/services' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <nav className="bg-dark-900/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(255,193,7,0.3)]">
              <Hammer className="w-6 h-6 text-dark-900 relative z-10 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tighter leading-none">
                MACHINA
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase leading-none mt-1">
                Heavy Machinery
              </span>
            </div>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 border border-transparent",
                    pathname === link.path
                      ? "text-primary bg-white/5 border-white/10 shadow-inner"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            
            {user?.emailVerified ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.displayName || user.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-400 font-medium text-sm transition-colors px-3 py-2 rounded-sm hover:bg-white/5 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                {pathname === '/login' && (
                  <Link 
                    href="/register" 
                    className="text-white font-medium text-sm transition-colors border border-white/10 px-4 py-2 rounded-sm hover:bg-white/5"
                  >
                    Registrarse
                  </Link>
                )}
                {pathname === '/register' && (
                  <Link 
                    href="/login" 
                    className="text-gray-400 hover:text-white font-medium text-sm transition-colors px-3 py-2 rounded-sm hover:bg-white/5"
                  >
                    Iniciar Sesión
                  </Link>
                )}
                {pathname !== '/login' && pathname !== '/register' && (
                  <>
                    <Link 
                      href="/login" 
                      className="text-gray-400 hover:text-white font-medium text-sm transition-colors px-3 py-2 rounded-sm hover:bg-white/5"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      href="/register" 
                      className="text-white font-medium text-sm transition-colors border border-white/10 px-4 py-2 rounded-sm hover:bg-white/5"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

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

      {isOpen && (
        <div className="md:hidden bg-dark-900 border-t border-dark-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-3 rounded-md text-base font-medium",
                  pathname === link.path
                    ? "text-primary bg-white/5"
                    : "text-gray-300 hover:text-primary hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-4 pt-4 pb-2 space-y-2">
              {user?.emailVerified ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="block w-full px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-red-400 hover:bg-white/5 text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              ) : (
                <>
                  {pathname === '/login' && (
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 rounded-md text-base font-medium text-dark-900 bg-primary hover:bg-primary-hover text-center"
                    >
                      Registrarse
                    </Link>
                  )}
                  {pathname === '/register' && (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      Iniciar Sesión
                    </Link>
                  )}
                  {pathname !== '/login' && pathname !== '/register' && (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-3 rounded-md text-base font-medium text-dark-900 bg-primary hover:bg-primary-hover text-center"
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}