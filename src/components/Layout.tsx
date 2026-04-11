import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Search, ShoppingCart, Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Catálogo', path: '/catalog' },
    { name: 'Servicios', path: '/services' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <nav className="bg-dark-900/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(255,193,7,0.3)]">
              <div className="absolute inset-0 bg-metal opacity-50"></div>
              <Hammer className="w-6 h-6 text-dark-900 relative z-10 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tighter leading-none">
                MACHINA<span className="text-primary">.</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase leading-none mt-1">
                Heavy Machinery
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 border border-transparent",
                    location.pathname === link.path
                      ? "text-primary bg-white/5 border-white/10 shadow-inner"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            <Link 
              to="/contact" 
              className="bg-primary text-dark-900 px-4 py-2 rounded-sm font-bold text-sm hover:bg-primary-hover transition-all shadow-[0_4px_14px_rgba(255,193,7,0.2)] hover:shadow-[0_6px_20px_rgba(255,193,7,0.3)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Cotizar
            </Link>
            <Link 
              to="/login" 
              className="text-gray-400 hover:text-white font-medium text-sm transition-colors px-3 py-2 rounded-sm hover:bg-white/5"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="text-white font-medium text-sm transition-colors border border-white/10 px-4 py-2 rounded-sm hover:bg-white/5"
            >
              Registrarse
            </Link>
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-3 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "text-primary bg-white/5"
                    : "text-gray-300 hover:text-primary hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-4 pt-4 pb-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-dark-900 bg-primary hover:bg-primary-hover text-center"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 pt-20 pb-10 bg-carbon relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-transparent to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Hammer className="w-5 h-5 text-dark-900" />
              </div>
              <span className="text-white font-black text-xl tracking-tighter">
                MACHINA<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Soluciones integrales en maquinaria pesada. Potencia, durabilidad y servicio experto para los proyectos más exigentes de la industria.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-primary">Explorar</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Inicio</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Nosotros</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Catálogo</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Servicios</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-primary">Contacto</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-dark-600 mt-0.5 shrink-0" />
                <span>Av. Industrial 2045, Parque Tecnológico<br/>Ciudad de México, CP 11560</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-dark-600 shrink-0" />
                <span>+52 55 8899 4455</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest text-primary">Horario</h3>
            <div className="bg-dark-900 p-4 rounded-sm border border-white/5">
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Lunes - Viernes</span>
                  <span className="text-white font-mono">08:00 - 18:00</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Sábados</span>
                  <span className="text-white font-mono">09:00 - 14:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2024 Machina. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link to="#" className="hover:text-gray-400">Privacidad</Link>
            <Link to="#" className="hover:text-gray-400">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
