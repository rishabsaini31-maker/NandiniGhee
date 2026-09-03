'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  Edit3, 
  Trash2, 
  Star, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { Product } from '@/lib/types';

interface ProductsTabProps {
  products: Product[];
  onOpenAddModal: () => void;
  onEditProductStock: (productId: string, newStock: number) => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  onOpenAddModal,
  onEditProductStock
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'A2 Vedic Bilona', 'Desi Cow Ghee', 'Buffalo Ghee', 'Dry Fruits', 'Gift Hampers'];

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#182b21] border border-[#1f3a2b] text-[#ddc48b]">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#f4eee1]">Product Inventory & Catalog</h3>
            <p className="text-xs text-[#8ea895]">
              {products.length} SKUs across Vedic Ghee, Pure Dairy & Hampers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#8ea895] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search SKU, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f4eee1] placeholder-[#6d8a74] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c09a45] to-[#a87e2b] text-[#0d1a12] font-semibold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add SKU
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#26492f] text-[#f4eee1] border border-[#c09a45]/50 shadow-md'
                : 'bg-[#122118] text-[#8ea895] hover:bg-[#15261d] hover:text-[#f4eee1] border border-[#1f3a2b]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid / Table */}
      <div className="rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1f3a2b] bg-[#0e1a13]/80 text-[11px] uppercase tracking-wider text-[#6d8a74]">
                <th className="py-3.5 px-4">SKU & Item Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (MRP)</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Batch Code</th>
                <th className="py-3.5 px-4">Sales Vol</th>
                <th className="py-3.5 px-4 text-right">Quick Stock Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f3a2b]/60 text-xs">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#15261d]/60 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#182b21] border border-[#1f3a2b] overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-[#f4eee1] line-clamp-1">{prod.name}</div>
                        <div className="text-[11px] text-[#8ea895] font-mono flex items-center gap-2">
                          <span>{prod.sku}</span>
                          <span className="flex items-center gap-0.5 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" /> {prod.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#182b21] text-[#ddc48b] border border-[#1f3a2b]">
                      {prod.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-bold text-[#f4eee1]">
                    ₹{prod.price.toLocaleString()}
                    {prod.originalPrice && (
                      <span className="text-[10px] text-[#6d8a74] line-through ml-1.5 font-normal">
                        ₹{prod.originalPrice}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={prod.status} />
                      <span className="font-mono font-semibold text-[#f4eee1]">{prod.stock} units</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-[11px] text-[#8ea895]">
                    {prod.batchNumber}
                  </td>

                  <td className="py-4 px-4 font-medium text-[#d3dfd4]">
                    {prod.salesCount} sold
                  </td>

                  <td className="py-4 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => {
                        const newStock = prompt(`Update stock for ${prod.name}:`, String(prod.stock));
                        if (newStock !== null && !isNaN(Number(newStock))) {
                          onEditProductStock(prod.id, Number(newStock));
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1a2f23] text-[#ddc48b] hover:bg-[#26492f] border border-[#c09a45]/30 text-xs inline-flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
