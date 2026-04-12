'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Hammer, ArrowRight, Mail, Loader2, CheckCircle, Wrench, Truck, Package } from 'lucide-react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar correo';
      if (errorMessage.includes('user-not-found')) {
        setError('No existe una cuenta con ese correo.');
      } else if (errorMessage.includes('invalid-email')) {
        setError('El correo electrónico no es válido.');
      } else {
        setError('Error al enviar el correo. Intenta de nuevo.');
      }
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex relative overflow-hidden">
        <div className="absolute inset-0" style={{ opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFC107' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url("/Fondo2.avif")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-[#FFC107] rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(255,193,7,0.4)] float-element">
                <Hammer className="w-10 h-10 text-[#0a0a0a] transform -rotate-12" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-5xl font-black mb-6 leading-tight">
                RECUPERA TU
                <br />
                <span className="text-[#FFC107]">ACCESO</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-md mx-auto">
                No te preocupes, estamos aquí para ayudarte a recuperar el acceso a tu cuenta.
              </p>
            </div>

            <p className="text-gray-600 text-sm text-center">
              © 2026 Machina. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-20 h-20 border border-[#FFC107]/10 rounded-lg float-element" style={{ animationDelay: '0.3s', transform: 'rotate(15deg)' }} />
            <div className="absolute top-1/4 left-5 w-14 h-14 bg-[#FFC107]/5 rounded-full float-delayed" style={{ animationDelay: '1.2s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-[#FFC107]/10 rounded-full float-slow" style={{ animationDelay: '0.8s' }} />
          </div>

          <div className="w-full max-w-md text-center relative z-10 slide-up">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <h2 className="text-2xl font-black text-white mb-4">CORREO ENVIADO</h2>
            <p className="text-gray-400 mb-6">
              Hemos enviado las instrucciones para restablecer tu contraseña a <strong className="text-white">{email}</strong>
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Revisa tu bandeja de entrada y sigue los pasos.
            </p>

            <Link 
              href="/login" 
              className="block w-full bg-[#FFC107] text-[#0a0a0a] font-bold py-4 rounded-lg hover:bg-[#FFB300] transition-all"
            >
              VOLVER A INICIAR SESIÓN
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex relative overflow-hidden">
      <div className="absolute inset-0" style={{ opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFC107' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/Fondo2.avif")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center justify-center gap-4 mt-20">
            <div className="w-16 h-16 bg-[#FFC107] rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(255,193,7,0.4)] float-element">
              <Hammer className="w-10 h-10 text-[#0a0a0a] transform -rotate-12" />
            </div>
            <span className="text-white font-black text-5xl tracking-tighter">MACHINA</span>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-black mb-6 leading-tight">
              RECUPERA TU
              <br />
              <span className="text-[#FFC107]">ACCESO</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-md mx-auto">
              No te preocupes, estamos aquí para ayudarte a recuperar el acceso a tu cuenta.
            </p>
          </div>

          <p className="text-gray-600 text-sm text-center">
            © 2026 Machina. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Elementos flotando en el fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 border border-[#FFC107]/10 rounded-lg float-element" style={{ animationDelay: '0.3s', transform: 'rotate(15deg)' }} />
          <div className="absolute top-1/4 left-5 w-14 h-14 bg-[#FFC107]/5 rounded-full float-delayed" style={{ animationDelay: '1.2s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-[#FFC107]/10 rounded-full float-slow" style={{ animationDelay: '0.8s' }} />
          <div className="absolute bottom-20 left-10 w-12 h-12 bg-[#FFC107]/5 rounded-lg float-element" style={{ animationDelay: '2s', transform: 'rotate(-10deg)' }} />
        </div>

        <div className="w-full max-w-md relative z-10 slide-up">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#FFC107] rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(255,193,7,0.4)] float-element">
              <Hammer className="w-10 h-10 text-[#0a0a0a] transform -rotate-12" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">OLVIDASTE TU CONTRASEÑA</h2>
            <p className="text-gray-500">Ingresa tu correo y te enviaremos instrucciones</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111] border border-[#222] text-white pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition-all font-mono placeholder:text-gray-700"
                  placeholder="tu@correo.com"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFC107] text-[#0a0a0a] font-bold py-4 rounded-lg hover:bg-[#FFB300] transition-all shadow-[0_4px_14px_rgba(255,193,7,0.2)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  ENVIAR CORREO <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#222] text-center">
            <p className="text-gray-500">
              ¿Recordaste tu contraseña?{' '}
              <Link href="/login" className="text-white font-bold hover:text-[#FFC107] transition-colors">Iniciar Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}