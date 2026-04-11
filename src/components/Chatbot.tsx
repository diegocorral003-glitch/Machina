'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'SISTEMA EN LÍNEA. Soy el asistente virtual de Machina. ¿En qué puedo ayudarte con nuestra maquinaria?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Gracias por tu consulta. Un asesor te contactará pronto. Mientras tanto, explora nuestro catálogo en la sección de equipos.' 
      }]);
    }, 1000);
  };

  const quickQuestions = [
    { text: "Quiero rentar una excavadora", query: "Quiero rentar una excavadora" },
    { text: "Sucursales", query: "¿Dónde están sus sucursales?" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-dark-950 shadow-[0_0_20px_rgba(255,193,7,0.4)] flex items-center justify-center hover:bg-primary-hover transition-all duration-300 hover:scale-105",
          isOpen && "hidden"
        )}
      >
        <Bot className="w-7 h-7" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] max-h-[80vh] bg-dark-900 rounded-sm shadow-2xl border border-dark-700 flex flex-col overflow-hidden">
          <div className="bg-dark-950 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-sm flex items-center justify-center border border-primary/20">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white leading-none font-mono tracking-wider text-sm">MACHINA AI</h3>
                <span className="text-[10px] text-primary font-mono uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-white/5 p-1 rounded-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] p-3 text-sm leading-relaxed border",
                    msg.role === 'user' 
                      ? "bg-primary/10 text-primary border-primary/20 rounded-tl-lg rounded-bl-lg rounded-tr-lg" 
                      : "bg-dark-800 text-gray-300 border-dark-700 rounded-tr-lg rounded-br-lg rounded-tl-lg"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-dark-950 border-t border-dark-800">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu consulta..."
                className="w-full bg-dark-900 text-white rounded-sm pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary border border-dark-700 font-mono"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-dark-800 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {quickQuestions.map((q, idx) => (
                <button 
                  type="button" 
                  key={idx}
                  onClick={() => { setInput(q.query); }}
                  className="text-[10px] bg-dark-800 text-gray-400 px-3 py-1.5 rounded-sm whitespace-nowrap hover:bg-dark-700 border border-dark-700 hover:border-primary/30 hover:text-primary transition-all uppercase tracking-wide"
                >
                  {q.text}
                </button>
              ))}
            </div>
          </form>
        </div>
      )}
    </>
  );
}