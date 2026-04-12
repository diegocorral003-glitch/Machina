'use client';

import { useState, useEffect } from 'react';
import { Mail, Search, Check, Trash2, Clock, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getContactMessages, markMessageAsRead, deleteContactMessage } from '@/lib/firestore';

interface Message {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  fecha: { toDate: () => Date } | null;
  leido: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'todos' | 'nuevos' | 'leidos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; message: Message | null }>({ show: false, message: null });

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const data = await getContactMessages();
      setMessages(data as Message[]);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
    setLoading(false);
  }

  async function handleMarkAsRead(messageId: string) {
    try {
      await markMessageAsRead(messageId);
      setMessages(messages.map(m => 
        m.id === messageId ? { ...m, leido: true } : m
      ));
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  async function handleDelete() {
    if (!deleteModal.message) return;
    try {
      await deleteContactMessage(deleteModal.message.id);
      setMessages(messages.filter(m => m.id !== deleteModal.message!.id));
      setDeleteModal({ show: false, message: null });
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  function formatDate(fecha: Message['fecha']) {
    if (!fecha) return 'Sin fecha';
    const date = fecha.toDate();
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const filteredMessages = messages.filter(message => {
    const matchesFilter = filter === 'todos' || 
      (filter === 'nuevos' && !message.leido) || 
      (filter === 'leidos' && message.leido);
    const matchesSearch = message.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          message.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const newMessages = messages.filter(m => !m.leido).length;

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
      <div className="relative h-[35vh] min-h-[300px] rounded-2xl overflow-hidden">
        <img 
          src="/PageMensajes.avif" 
          alt="Mensajes" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <div className="inline-block bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="text-[#FFC107] font-bold text-xs tracking-wide uppercase">Bandeja de Entrada</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            MENSAJES DE <span className="text-[#FFC107]">CLIENTES</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Revisa y responde los mensajes de tus clientes. Manten una comunicacion efectiva.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Lista de Mensajes</h1>
          <p className="text-gray-500 mt-1">Mensajes recibidos del formulario de contacto</p>
        </div>
        {newMessages > 0 && (
          <div className="inline-flex items-center gap-2 bg-[#FFC107]/10 text-[#FFC107] px-4 py-2 rounded-lg">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{newMessages} nuevo{newMessages !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar mensajes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F1012] border border-[#1a1a1a] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
          />
        </div>
        <div className="flex gap-2">
          {(['todos', 'nuevos', 'leidos'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f 
                  ? 'bg-[#FFC107] text-[#0a0a0a]' 
                  : 'bg-[#0F1012] border border-[#1a1a1a] text-gray-400 hover:text-white'
              }`}
            >
              {f === 'todos' ? 'Todos' : f === 'nuevos' ? 'Nuevos' : 'Leidos'}
            </button>
          ))}
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-12 text-center">
          <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron mensajes</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-[#0F1012] border rounded-xl overflow-hidden transition-all ${
                message.leido 
                  ? 'border-[#1a1a1a]' 
                  : 'border-[#FFC107]/30'
              }`}
            >
              <div 
                className="p-4 cursor-pointer hover:bg-[#151515] transition-colors"
                onClick={() => setExpandedMessage(expandedMessage === message.id ? null : message.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.leido ? 'bg-[#1a1a1a]' : 'bg-[#FFC107]/10'
                    }`}>
                      <span className={`font-bold ${message.leido ? 'text-gray-500' : 'text-[#FFC107]'}`}>
                        {message.nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{message.nombre}</p>
                        {!message.leido && (
                          <span className="w-2 h-2 bg-[#FFC107] rounded-full" />
                        )}
                      </div>
                      <p className="text-gray-500 text-sm">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm">{formatDate(message.fecha)}</span>
                    {expandedMessage === message.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                  {message.mensaje}
                </p>
              </div>

              {expandedMessage === message.id && (
                <div className="border-t border-[#1a1a1a] p-4 bg-[#111]">
                  <div className="space-y-4">
                    {message.telefono && (
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Telefono</p>
                        <p className="text-white">{message.telefono}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mensaje</p>
                      <p className="text-gray-300 whitespace-pre-wrap">{message.mensaje}</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      {!message.leido && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(message.id);
                          }}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFC107]/10 text-[#FFC107] hover:bg-[#FFC107]/20 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Marcar como leido
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModal({ show: true, message });
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Eliminar Mensaje</h3>
                <p className="text-gray-500 text-sm">Esta accion no se puede deshacer</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Estas seguro de que deseas eliminar el mensaje de <span className="text-white font-medium">{deleteModal.message?.nombre}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, message: null })}
                className="flex-1 px-4 py-3 rounded-lg border border-[#333] text-gray-400 hover:bg-[#1a1a1a] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}