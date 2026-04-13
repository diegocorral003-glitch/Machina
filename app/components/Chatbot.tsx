'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Wrench, Truck, Calendar, Phone } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const quickActions = [
  { label: 'Ver catálogo', icon: Wrench, action: '/catalog' },
  { label: 'Rentar maquinaria', icon: Calendar, action: '/catalog' },
  { label: 'Contactar', icon: Phone, action: '/contact' },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy el asistente de Machina. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    // Simulated response
    setTimeout(() => {
      const responses = [
        'Para rentar maquinaria visita nuestro catálogo en /catalog. Tenemos excavadoras, retroexcavadoras, montacargas y más.',
        'Puedes contactarnos en la página de contacto /contact o llamarnos directamente. ¡Estamos para ayudarte!',
        'Contamos con más de 500 máquinas disponibles. ¿Te gustaría ver nuestro catálogo?',
        'Tenemos financiamiento disponible para la compra de maquinaria. ¿Te interesa cotizar?',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'model', text: randomResponse }]);
      setLoading(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    window.location.href = action;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FFC107] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <MessageCircle className="w-7 h-7 text-[#0a0a0a]" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-[#0F1012] border border-[#1a1a1a] rounded-xl shadow-2xl z-40 overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFC107] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0a0a0a] rounded-full flex items-center justify-center">
            <Wrench className="w-4 h-4 text-[#FFC107] transform -rotate-12" />
          </div>
          <span className="text-[#0a0a0a] font-bold">Machina Bot</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-[#0a0a0a] hover:opacity-70">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-[#FFC107] text-[#0a0a0a]'
                  : 'bg-[#1a1a1a] text-gray-300'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] px-4 py-2 rounded-lg">
              <Loader2 className="w-4 h-4 text-[#FFC107] animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs text-gray-400 hover:text-[#FFC107] transition-colors"
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-[#1a1a1a]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#FFC107]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2 bg-[#FFC107] rounded-lg text-[#0a0a0a] hover:bg-[#FFB300] disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}