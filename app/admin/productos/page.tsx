'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, Eye, Package, Loader2, AlertCircle } from 'lucide-react';
import { getProducts, deleteProduct } from '@/lib/firestore';

interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  marca?: string;
  modelo?: string;
  disponibilidad?: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; product: Product | null }>({ show: false, product: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data as Product[]);
    } catch (error) {
      console.error('Error loading products:', error);
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteModal.product) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteModal.product.id);
      setProducts(products.filter(p => p.id !== deleteModal.product!.id));
      setDeleteModal({ show: false, product: null });
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setDeleting(false);
  }

  const categories = ['Todas', ...new Set(products.map(p => p.categoria).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.marca?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todas' || product.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
          src="/PageInventario.avif" 
          alt="Productos" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]/40" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto px-4 w-full text-center">
          <div className="inline-block bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full px-4 py-1 mb-6 backdrop-blur-sm">
            <span className="text-[#FFC107] font-bold text-xs tracking-wide uppercase">Catalogo</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
            GESTION DE <span className="text-[#FFC107]">PRODUCTOS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Administra tu inventario de maquinaria. Agrega, edita o elimina productos de tu catalogo.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Lista de Productos</h1>
          <p className="text-gray-500 mt-1">Gestiona tu catalogo de maquinaria</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 bg-[#FFC107] text-[#0a0a0a] px-5 py-3 rounded-lg font-bold hover:bg-[#FFB300] transition-all"
        >
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F1012] border border-[#1a1a1a] text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all placeholder:text-gray-600"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-[#0F1012] border border-[#1a1a1a] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#FFC107] transition-all"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl p-12 text-center">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      ) : (
        <div className="bg-[#0F1012] border border-[#1a1a1a] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4">Producto</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4 hidden md:table-cell">Categoria</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4 hidden lg:table-cell">Precio</th>
                  <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider p-4">Estado</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#1a1a1a] hover:bg-[#151515] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0">
                          {product.imagen ? (
                            <img src={product.imagen} alt={product.nombre} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.nombre}</p>
                          <p className="text-gray-500 text-sm">{product.marca} {product.modelo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-gray-400 text-sm">{product.categoria}</span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-white font-mono">${product.precio?.toLocaleString('es-MX')}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.disponibilidad === 'disponible' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {product.disponibilidad === 'disponible' ? 'Disponible' : 'No disponible'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/catalog/${product.id}`}
                          className="p-2 text-gray-500 hover:text-[#FFC107] hover:bg-[#FFC107]/10 rounded-lg transition-colors"
                          title="Ver"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/productos/${product.id}`}
                          className="p-2 text-gray-500 hover:text-[#FFC107] hover:bg-[#FFC107]/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ show: true, product })}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                <h3 className="text-white font-bold text-lg">Eliminar Producto</h3>
                <p className="text-gray-500 text-sm">Esta accion no se puede deshacer</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Estas seguro de que deseas eliminar <span className="text-white font-medium">{deleteModal.product?.nombre}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ show: false, product: null })}
                className="flex-1 px-4 py-3 rounded-lg border border-[#333] text-gray-400 hover:bg-[#1a1a1a] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {deleting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}