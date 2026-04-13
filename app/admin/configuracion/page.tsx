'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, Loader2, Building, Phone, Mail, MapPin, Clock, MessageSquare, Globe, Facebook, Instagram, Linkedin } from 'lucide-react';
import { getConfig, updateConfig } from '@/lib/firestore';

interface ConfigData {
  nombreEmpresa?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  horario?: string;
  mensajeBienvenida?: string;
}

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<ConfigData>({
    nombreEmpresa: '',
    telefono: '',
    email: '',
    direccion: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    horario: '',
    mensajeBienvenida: ''
  });

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    try {
      const config = await getConfig();
      if (config) {
        setFormData({
          nombreEmpresa: config.nombreEmpresa || '',
          telefono: config.telefono || '',
          email: config.email || '',
          direccion: config.direccion || '',
          facebook: config.facebook || '',
          instagram: config.instagram || '',
          linkedin: config.linkedin || '',
          horario: config.horario || '',
          mensajeBienvenida: config.mensajeBienvenida || ''
        });
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await updateConfig(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
    }

    setSaving(false);
  }

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
          src="/PageConfig1.avif" 
          alt="Configuracion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase">
            CONFIGURACION <span className="text-[#FFC107]">EMPRESA</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Personaliza los datos de tu empresa que se mostraran en el sitio
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos de la Empresa */}
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFC107]/10 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Datos de la Empresa</h2>
              <p className="text-gray-500 text-sm">Informacion basica de tu negocio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={formData.nombreEmpresa}
                onChange={(e) => setFormData({ ...formData, nombreEmpresa: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="Machina Maquinaria Pesada"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Telefono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="+52 55 1234 5678"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Correo Electronico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="contacto@machina.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Horario de Atencion
              </label>
              <input
                type="text"
                value={formData.horario}
                onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="Lun-Vie: 8am-6pm, Sab: 9am-2pm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Direccion
              </label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="Av. Principal #123, Ciudad, Estado"
              />
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFC107]/10 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Redes Sociales</h2>
              <p className="text-gray-500 text-sm">Enlaces a tus redes sociales</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Facebook className="w-4 h-4 inline mr-1" />
                Facebook
              </label>
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="https://facebook.com/machina"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Instagram className="w-4 h-4 inline mr-1" />
                Instagram
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="https://instagram.com/machina"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Linkedin className="w-4 h-4 inline mr-1" />
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="https://linkedin.com/company/machina"
              />
            </div>
          </div>
        </div>

        {/* Chatbot */}
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFC107]/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#FFC107]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Chatbot</h2>
              <p className="text-gray-500 text-sm">Mensaje de bienvenida del asistente virtual</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Mensaje de Bienvenida
            </label>
            <textarea
              value={formData.mensajeBienvenida}
              onChange={(e) => setFormData({ ...formData, mensajeBienvenida: e.target.value })}
              rows={3}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600 resize-none"
              placeholder="Hola! Soy el asistente de Machina. En que puedo ayudarte?"
            />
          </div>
        </div>

        {/* Botón guardar */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#FFC107] text-[#0a0a0a] px-6 py-3 rounded-lg font-bold hover:bg-[#FFB300] transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Guardar Configuracion
          </button>

          {success && (
            <span className="text-green-500 font-medium">Cambios guardados correctamente!</span>
          )}
        </div>
      </form>
    </div>
  );
}