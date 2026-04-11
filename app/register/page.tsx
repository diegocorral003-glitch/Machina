'use client';

import Link from 'next/link';
import { Hammer, ArrowRight, Lock, User, Mail, Phone } from 'lucide-react';

export default function Register() {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center relative overflow-hidden py-12">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <div className="w-full max-w-md bg-dark-900 border border-dark-800 p-8 rounded-sm shadow-2xl relative z-10 my-8">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.3)]">
            <Hammer className="w-8 h-8 text-dark-900" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">CREAR CUENTA</h2>
          <p className="text-gray-500 text-sm">Regístrate para acceder a nuestro portal de clientes.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 w-5 h-5" />
              <input 
                type="text" 
                className="w-full bg-dark-950 border border-dark-700 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                placeholder="Juan Pérez"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 w-5 h-5" />
              <input 
                type="email" 
                className="w-full bg-dark-950 border border-dark-700 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                placeholder="juan@empresa.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 w-5 h-5" />
              <input 
                type="tel" 
                className="w-full bg-dark-950 border border-dark-700 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                placeholder="+52 55 0000 0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 w-5 h-5" />
              <input 
                type="password" 
                className="w-full bg-dark-950 border border-dark-700 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-gray-400 mt-2">
            <input type="checkbox" className="mt-1 rounded border-dark-600 bg-dark-800 text-primary focus:ring-primary" />
            <label className="cursor-pointer hover:text-white leading-tight">
              Acepto los <Link href="#" className="text-primary hover:underline">términos y condiciones</Link> y la <Link href="#" className="text-primary hover:underline">política de privacidad</Link>.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-dark-950 font-bold py-4 rounded-sm hover:bg-primary-hover transition-all shadow-[0_4px_14px_rgba(255,193,7,0.2)] flex items-center justify-center gap-2 group mt-6"
          >
            REGISTRARSE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-dark-800 text-center">
          <p className="text-gray-500 text-sm">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-white font-bold hover:text-primary transition-colors">Iniciar Sesión</Link>
          </p>
        </div>
      </div>

      <div className="mt-4 text-center pb-8">
        <p className="text-dark-600 text-xs font-mono uppercase tracking-widest">
          Sistema Seguro Machina v2.4
        </p>
      </div>
    </div>
  );
}