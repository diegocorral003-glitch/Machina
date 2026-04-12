'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Tag, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { createProduct, updateProduct, getProductById } from '@/lib/firestore';

const categorias = [
  'Excavadoras',
  'Retroexcavadoras',
  'Cargadores',
  'Compactadoras',
  'Montacargas',
  'Gruas',
  'Generadores',
  'Compresores',
  'Otro'
];

export default function ProductForm() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params.id && params.id !== 'nuevo';
  const productId = isEditing ? params.id as string : null;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: '',
    marca: '',
    modelo: '',
    disponibilidad: 'disponible'
  });

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  async function loadProduct() {
    setLoading(true);
    try {
      const product = await getProductById(productId!);
      if (product) {
        setFormData({
          nombre: product.nombre || '',
          descripcion: product.descripcion || '',
          precio: product.precio?.toString() || '',
          categoria: product.categoria || '',
          imagen: product.imagen || '',
          marca: product.marca || '',
          modelo: product.modelo || '',
          disponibilidad: product.disponibilidad || 'disponible'
        });
      }
    } catch (error) {
      console.error('Error loading product:', error);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio) || 0,
        categoria: formData.categoria,
        imagen: formData.imagen,
        marca: formData.marca,
        modelo: formData.modelo,
        disponibilidad: formData.disponibilidad
      };

      if (isEditing && productId) {
        await updateProduct(productId, productData);
      } else {
        await createProduct(productData);
      }

      router.push('/admin/productos');
    } catch (error) {
      console.error('Error saving product:', error);
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="relative h-[25vh] min-h-[200px] rounded-2xl overflow-hidden">
        <img 
          src="/PageInventario.avif" 
          alt={isEditing ? 'Editar' : 'Nuevo'} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase">
            {isEditing ? 'EDITAR' : 'NUEVO'} <span className="text-[#FFC107]">PRODUCTO</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {isEditing ? 'Actualiza los datos del producto' : 'Agrega una nueva maquinaria al catalogo'}
          </p>
        </div>
      </div>

      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FFC107] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Productos
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="Ej: Excavadora CAT 320"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Marca
                </label>
                <input
                  type="text"
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                  placeholder="Ej: Caterpillar"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                  placeholder="Ej: 320 GC"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Categoria
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                required
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all"
              >
                <option value="">Selecciona una categoria</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Precio (USD)
              </label>
              <input
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
                min="0"
                step="0.01"
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Descripcion
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                required
                rows={4}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600 resize-none"
                placeholder="Describe las caracteristicas y especificaciones de la maquinaria..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                <ImageIcon className="w-4 h-4 inline mr-1" />
                URL de Imagen
              </label>
              <input
                type="url"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Disponibilidad
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="disponibilidad"
                    value="disponible"
                    checked={formData.disponibilidad === 'disponible'}
                    onChange={(e) => setFormData({ ...formData, disponibilidad: e.target.value })}
                    className="w-4 h-4 text-[#FFC107] bg-[#111] border-[#333] focus:ring-[#FFC107]"
                  />
                  <span className="text-white">Disponible</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="disponibilidad"
                    value="no_disponible"
                    checked={formData.disponibilidad === 'no_disponible'}
                    onChange={(e) => setFormData({ ...formData, disponibilidad: e.target.value })}
                    className="w-4 h-4 text-[#FFC107] bg-[#111] border-[#333] focus:ring-[#FFC107]"
                  />
                  <span className="text-white">No disponible</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/admin/productos"
            className="px-6 py-3 rounded-lg border border-[#333] text-gray-400 hover:bg-[#1a1a1a] transition-colors font-medium"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FFC107] text-[#0a0a0a] px-6 py-3 rounded-lg font-bold hover:bg-[#FFB300] transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}