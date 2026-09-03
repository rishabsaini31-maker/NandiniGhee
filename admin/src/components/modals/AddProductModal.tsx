'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Product } from '@/lib/types';
import { Package, Plus } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id' | 'salesCount' | 'rating' | 'status'>) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct
}) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<Product['category']>('A2 Vedic Bilona');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('');
  const [batchNumber, setBatchNumber] = useState('NDN-2026-A2-11');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=60');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !price || !stock) {
      alert('Please fill all required fields');
      return;
    }

    onAddProduct({
      name,
      sku,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      batchNumber,
      image
    });

    setName('');
    setSku('');
    setPrice('');
    setStock('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Product SKU"
      subtitle="Enter dairy item details to publish directly to Nandini Ghee catalog"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-[#8ea895] block mb-1">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Nandini Vedic A2 Gir Cow Ghee (500ml)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#8ea895] block mb-1">SKU Code *</label>
            <input
              type="text"
              required
              placeholder="e.g. NG-A2-500ML"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] font-mono focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Product['category'])}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            >
              <option value="A2 Vedic Bilona">A2 Vedic Bilona</option>
              <option value="Desi Cow Ghee">Desi Cow Ghee</option>
              <option value="Buffalo Ghee">Buffalo Ghee</option>
              <option value="Dry Fruits">Dry Fruits</option>
              <option value="Gift Hampers">Gift Hampers</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Selling Price (₹) *</label>
            <input
              type="number"
              required
              placeholder="750"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Original MRP (₹)</label>
            <input
              type="number"
              placeholder="850"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Stock Quantity *</label>
            <input
              type="number"
              required
              placeholder="100"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Batch Code</label>
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] font-mono focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Product Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#1f3a2b] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#15261d] text-[#8ea895] hover:text-[#f4eee1] text-xs font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c09a45] to-[#a87e2b] text-[#0d1a12] font-semibold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110"
          >
            <Plus className="w-4 h-4" /> Save & Publish SKU
          </button>
        </div>
      </form>
    </Modal>
  );
};
