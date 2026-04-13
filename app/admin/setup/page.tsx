'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { getAllUsers, updateUserRole } from '@/lib/firestore';

export default function AdminSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [makingAdmin, setMakingAdmin] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  }

  async function makeAdmin(userId: string) {
    setMakingAdmin(true);
    try {
      await updateUserRole(userId, 'admin');
      
      // Update local state
      setUsers(users.map(u => 
        u.userId === userId ? { ...u, role: 'admin' } : u
      ));
      
      // Show success and redirect after delay
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
    }
    setMakingAdmin(false);
  }

  const currentUser = users.find(u => u.email === 'diegocorral003@gmail.com');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#FFC107] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FFC107]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#FFC107]" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Configuración Inicial</h1>
          <p className="text-gray-400">Selecciona tu cuenta para convertirte en administrador</p>
        </div>

        {users.length === 0 ? (
          <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              No hay usuarios registrados aún.
            </p>
            <p className="text-gray-500 text-sm">
              Primero necesitas crear una cuenta en la página de registro.
            </p>
            <a 
              href="/register" 
              className="inline-block mt-4 text-[#FFC107] hover:underline"
            >
              Ir a Registrarse
            </a>
          </div>
        ) : currentUser?.role === 'admin' ? (
          <div className="bg-[#0F1012] border border-green-500/30 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-white font-bold text-lg mb-2">¡Ya eres Admin!</p>
            <p className="text-gray-400 mb-4">
              Tu cuenta ya tiene permisos de administrador.
            </p>
            <button
              onClick={() => router.push('/admin')}
              className="bg-[#FFC107] text-[#0a0a0a] px-6 py-3 rounded-lg font-bold hover:bg-[#FFB300] transition-all"
            >
              Ir al Panel de Admin
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {users.filter(u => u.email === 'diegocorral003@gmail.com').map(user => (
              <div 
                key={user.id}
                className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-bold">{user.nombre || 'Usuario'}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-gray-600 text-xs mt-1">Rol actual: {user.role || 'usuario'}</p>
                </div>
                <button
                  onClick={() => makeAdmin(user.userId)}
                  disabled={makingAdmin}
                  className="flex items-center gap-2 bg-[#FFC107] text-[#0a0a0a] px-4 py-2 rounded-lg font-bold hover:bg-[#FFB300] transition-all disabled:opacity-50"
                >
                  {makingAdmin ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Shield className="w-4 h-4" />
                  )}
                  Hacer Admin
                </button>
              </div>
            ))}
            
            {users.filter(u => u.email === 'diegocorral003@gmail.com').length === 0 && (
              <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 text-center">
                <p className="text-gray-400">
                  Tu cuenta no aparece en la lista. ¿Ya te registraste con el correo diegocorral003@gmail.com?
                </p>
                <a href="/login" className="inline-block mt-4 text-[#FFC107] hover:underline">
                  Ir a Iniciar Sesión
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}