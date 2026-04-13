'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Tag, DollarSign, X } from 'lucide-react';
import Link from 'next/link';
import { createProduct, updateProduct, getProductById, getCategories } from '@/lib/firestore';

interface Category {
  id: string;
  nombre: string;
  slug: string;
}

export default function ProductForm() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params.id && params.id !== 'nuevo';
  const productId = isEditing ? params.id as string : null;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categorias, setCategorias] = useState<Category[]>([]);
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategorias(data as Category[]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

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
        if (product.imagen) {
          setPreviewImage(product.imagen);
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
    }
    setLoading(false);
  }

  function handleImageUrlChange(url: string) {
    setFormData({ ...formData, imagen: url });
    setPreviewImage(url);
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
        imagen: formData.imagen || '',
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
      alert('Error al guardar el producto. Intenta de nuevo.');
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-[#FFC107] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 lg:px-8">
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
          {/* Preview de imagen */}
          {previewImage && (
            <div className="relative h-48 bg-[#1a1a1a] rounded-lg overflow-hidden">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setFormData({ ...formData, imagen: '' });
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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
                <option value="">
                  {categorias.length > 0 ? 'Selecciona una categoria' : 'Crea categorias primero en /admin/categorias'}
                </option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
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
                URL de Imagen del Producto
              </label>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.imagen}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <p className="text-gray-500 text-xs">
                  Pegá la URL de una imagen (buscá en Google Images, click derecho → copiar dirección de imagen)
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Disponibilidad
              </label>
              <select
                value={formData.disponibilidad}
                onChange={(e) => setFormData({ ...formData, disponibilidad: e.target.value })}
                className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all"
              >
                <option value="disponible">Disponible</option>
                <option value="rentado">Rentado</option>
                <option value="vendido">Vendido</option>
                <option value="no disponible">No Disponible</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full bg-[#FFC107] text-[#0a0a0a] py-4 rounded-lg font-bold hover:bg-[#FFB300] transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saving ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}