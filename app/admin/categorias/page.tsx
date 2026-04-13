'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, Loader2, AlertCircle, Image, GripVertical } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/firestore';

interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  imagenDestacada?: string;
  destacada?: boolean;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<{ show: boolean; category: Category | null; mode: 'create' | 'edit' }>({
    show: false,
    category: null,
    mode: 'create'
  });
  const [formData, setFormData] = useState({
    nombre: '',
    slug: '',
    descripcion: '',
    imagenDestacada: '',
    destacada: false
  });
  const [saving, setSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; category: Category | null }>({ show: false, category: null });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
    setLoading(false);
  }

  function openCreateModal() {
    setFormData({ nombre: '', slug: '', descripcion: '', imagenDestacada: '', destacada: false });
    setModal({ show: true, category: null, mode: 'create' });
  }

  function openEditModal(category: Category) {
    setFormData({
      nombre: category.nombre,
      slug: category.slug,
      descripcion: category.descripcion || '',
      imagenDestacada: category.imagenDestacada || '',
      destacada: category.destacada || false
    });
    setModal({ show: true, category, mode: 'edit' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.mode === 'create') {
        await createCategory(formData);
      } else if (modal.category) {
        await updateCategory(modal.category.id, formData);
      }
      await loadCategories();
      setModal({ show: false, category: null, mode: 'create' });
    } catch (error) {
      console.error('Error saving category:', error);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteModal.category) return;
    setSaving(true);
    try {
      await deleteCategory(deleteModal.category.id);
      setCategories(categories.filter(c => c.id !== deleteModal.category!.id));
      setDeleteModal({ show: false, category: null });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
    setSaving(false);
  }

  const filteredCategories = categories.filter(cat =>
    cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="relative h-[35vh] min-h-[300px] rounded-2xl overflow-hidden">
        <img 
          src="/PageCategorias.avif" 
          alt="Categorías" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <div className="inline-block bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="text-[#FFC107] font-bold text-xs tracking-wide uppercase">Categorías</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            GESTION DE <span className="text-[#FFC107]">CATEGORIAS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Administra las categorías de tu catálogo. Controla qué categorías aparecen y sus imágenes destacadas.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Lista de Categorías</h1>
          <p className="text-gray-500 mt-1">Gestiona las categorías de tu inventario</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#FFC107] text-[#0a0a0a] px-5 py-3 rounded-lg font-bold hover:bg-[#FFB300] transition-all"
        >
          <Plus className="w-5 h-5" />
          Nueva Categoría
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0F1012] border border-[#1a1a1a] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-12 text-center">
          <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
            <GripVertical className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-gray-500">No se encontraron categorías</p>
          <p className="text-gray-600 text-sm mt-2">Crea tu primera categoría para comenzar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl overflow-hidden hover:border-[#FFC107]/30 transition-all group"
            >
              <div className="aspect-video bg-[#151515] relative overflow-hidden">
                {category.imagenDestacada ? (
                  <img 
                    src={category.imagenDestacada} 
                    alt={category.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-700" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 bg-[#0a0a0a]/80 text-white rounded-lg hover:bg-[#FFC107] hover:text-[#0a0a0a] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteModal({ show: true, category })}
                    className="p-2 bg-[#0a0a0a]/80 text-white rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg">{category.nombre}</h3>
                <p className="text-gray-500 text-sm mt-1">{category.descripcion || 'Sin descripción'}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-600 font-mono">{category.slug}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-bold text-xl mb-6">
              {modal.mode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  required
                  className="w-full bg-[#151515] border border-[#1a1a1a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all"
                  placeholder="Ej: Excavadoras"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full bg-[#151515] border border-[#1a1a1a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all"
                  placeholder="ej: excavadoras"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={3}
                  className="w-full bg-[#151515] border border-[#1a1a1a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all resize-none"
                  placeholder="Descripción opcional de la categoría"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Imagen Destacada (URL)</label>
                <input
                  type="text"
                  value={formData.imagenDestacada}
                  onChange={(e) => setFormData({ ...formData, imagenDestacada: e.target.value })}
                  className="w-full bg-[#151515] border border-[#1a1a1a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {formData.imagenDestacada && (
                  <div className="mt-3 aspect-video bg-[#151515] rounded-lg overflow-hidden">
                    <img src={formData.imagenDestacada} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="destacada"
                  checked={formData.destacada}
                  onChange={(e) => setFormData({ ...formData, destacada: e.target.checked })}
                  className="w-5 h-5 rounded border-[#333] bg-[#151515] text-[#FFC107] focus:ring-[#FFC107] focus:ring-offset-0"
                />
                <label htmlFor="destacada" className="text-gray-400 text-sm">
                  Mostrar en página de inicio (Categorías Destacadas)
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModal({ show: false, category: null, mode: 'create' })}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#333] text-gray-400 hover:bg-[#1a1a1a] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-3 rounded-lg bg-[#FFC107] text-[#0a0a0a] font-bold hover:bg-[#FFB300] transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : modal.mode === 'create' ? 'Crear' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Eliminar Categoría</h3>
                <p className="text-gray-500 text-sm">Esta acción no se puede deshacer</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              ¿Estás seguro de que deseas eliminar <span className="text-white font-medium">{deleteModal.category?.nombre}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, category: null })}
                className="flex-1 px-4 py-3 rounded-lg border border-[#333] text-gray-400 hover:bg-[#1a1a1a] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}