'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Shield, ShieldOff, Loader2, UserPlus, Mail } from 'lucide-react';
import { getAllUsers, updateUserRole } from '@/lib/firestore';

interface UserProfile {
  id: string;
  userId: string;
  nombre: string;
  email: string;
  telefono?: string;
  role: string;
  createdAt?: any;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data as UserProfile[]);
    } catch (error) {
      console.error('Error loading users:', error);
    }
    setLoading(false);
  }

  async function toggleRole(user: UserProfile) {
    const newRole = user.role === 'admin' ? 'usuario' : 'admin';
    setUpdating(user.id);
    try {
      await updateUserRole(user.userId, newRole);
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, role: newRole } : u
      ));
    } catch (error) {
      console.error('Error updating role:', error);
    }
    setUpdating(null);
  }

  const filteredUsers = users.filter(user => 
    user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#FFC107] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative h-[25vh] min-h-[200px] rounded-2xl overflow-hidden">
        <img 
          src="/PageUsuarios2.avif" 
          alt="Usuarios" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase">
            GESTION <span className="text-[#FFC107]">USUARIOS</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Administra los roles de los usuarios registrados
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-4">
        <div className="flex items-center gap-3 text-gray-400">
          <UserPlus className="w-5 h-5 text-[#FFC107]" />
          <p className="text-sm">
            Los usuarios se crean automaticamente al registrarse. Aqui puedes cambiar su rol a <span className="text-[#FFC107]">admin</span> para darles acceso al panel.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0F1012] border border-[#1a1a1a] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
        />
      </div>

      {/* Users List */}
      <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron usuarios</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4">Usuario</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4 hidden md:table-cell">Email</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4">Rol</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#1a1a1a] hover:bg-[#151515] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFC107]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#FFC107] font-bold text-sm">
                            {user.nombre?.charAt(0).toUpperCase() || 'U'}
                          </span>
                        </div>
                        <span className="text-white font-medium">{user.nombre || 'Sin nombre'}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-[#FFC107]/10 text-[#FFC107]' 
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {user.role === 'admin' ? (
                          <Shield className="w-3 h-3" />
                        ) : (
                          <ShieldOff className="w-3 h-3" />
                        )}
                        {user.role === 'admin' ? 'Admin' : 'Usuario'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleRole(user)}
                        disabled={updating === user.id}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {updating === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : user.role === 'admin' ? (
                          <>
                            <ShieldOff className="w-4 h-4" />
                            <span className="text-gray-400 hover:text-white">Quitar admin</span>
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4" />
                            <span className="text-[#FFC107] hover:text-[#FFB300]">Hacer admin</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}