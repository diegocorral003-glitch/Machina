import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Hammer, ArrowRight, Lock, User } from 'lucide-react';

export function Login() {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-dark-900 border border-dark-800 p-8 rounded-sm shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,193,7,0.3)]">
            <Hammer className="w-8 h-8 text-dark-900" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">PORTAL CLIENTES</h2>
          <p className="text-gray-500 text-sm">Acceso exclusivo para gestión de flota y contratos.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ID de Cliente / Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-600 w-5 h-5" />
              <input 
                type="email" 
                className="w-full bg-dark-950 border border-dark-700 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                placeholder="EMP-00000"
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

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white">
              <input type="checkbox" className="rounded border-dark-600 bg-dark-800 text-primary focus:ring-primary" />
              Recordar sesión
            </label>
            <Link to="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
          </div>

          <button 
            type="button"
            className="w-full bg-primary text-dark-950 font-bold py-4 rounded-sm hover:bg-primary-hover transition-all shadow-[0_4px_14px_rgba(255,193,7,0.2)] flex items-center justify-center gap-2 group"
          >
            INICIAR SESIÓN <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-dark-800 text-center">
          <p className="text-gray-500 text-sm">
            ¿Aún no eres cliente? <Link to="/register" className="text-white font-bold hover:text-primary transition-colors">Crear Cuenta</Link>
          </p>
        </div>
      </motion.div>

      <div className="mt-8 text-center">
        <p className="text-dark-600 text-xs font-mono uppercase tracking-widest">
          Sistema Seguro Machina v2.4
        </p>
      </div>
    </div>
  );
}
