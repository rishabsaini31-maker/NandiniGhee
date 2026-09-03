'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { QualityBatch } from '@/lib/types';
import { FlaskConical, CheckCircle2 } from 'lucide-react';

interface NewBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBatch: (batch: QualityBatch) => void;
}

export const NewBatchModal: React.FC<NewBatchModalProps> = ({
  isOpen,
  onClose,
  onAddBatch
}) => {
  const [batchNumber, setBatchNumber] = useState(`NDN-2026-A2-${Math.floor(Math.random() * 89 + 10)}`);
  const [productType, setProductType] = useState('A2 Gir Cow Vedic Bilona Ghee');
  const [purityIndex, setPurityIndex] = useState('99.94');
  const [ffaPercent, setFfaPercent] = useState('0.12');
  const [moisturePercent, setMoisturePercent] = useState('0.16');
  const [reichertValue, setReichertValue] = useState('30.6');
  const [aromaGrade, setAromaGrade] = useState<QualityBatch['aromaGrade']>('Grade A+ (Rich Nutty)');
  const [testedBy, setTestedBy] = useState('Dr. M. Srinivasan (Senior Dairy QC Lead)');
  const [totalJarsProduced, setTotalJarsProduced] = useState('1200');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBatch({
      id: `Q-${Date.now()}`,
      batchNumber,
      productType,
      manufactureDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      purityIndex: Number(purityIndex),
      ffaPercent: Number(ffaPercent),
      moisturePercent: Number(moisturePercent),
      reichertValue: Number(reichertValue),
      aromaGrade,
      testedBy,
      status: 'Certified Pure',
      totalJarsProduced: Number(totalJarsProduced)
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Quality Assurance Lab Certificate"
      subtitle="Input chromatographic and sensory parameters for Nandini batch certification"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Batch Number *</label>
            <input
              type="text"
              required
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] font-mono focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Product Variant *</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            >
              <option value="A2 Gir Cow Vedic Bilona Ghee">A2 Gir Cow Vedic Bilona Ghee</option>
              <option value="Pure Desi Cow Ghee (Golden Jar)">Pure Desi Cow Ghee (Golden Jar)</option>
              <option value="Traditional Bilona Buffalo Ghee">Traditional Bilona Buffalo Ghee</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Purity Index (%) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={purityIndex}
              onChange={(e) => setPurityIndex(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">FFA Content (%) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={ffaPercent}
              onChange={(e) => setFfaPercent(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Moisture (%) *</label>
            <input
              type="number"
              step="0.01"
              required
              value={moisturePercent}
              onChange={(e) => setMoisturePercent(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Reichert Value *</label>
            <input
              type="number"
              step="0.1"
              required
              value={reichertValue}
              onChange={(e) => setReichertValue(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Aroma & Granule Grade</label>
            <select
              value={aromaGrade}
              onChange={(e) => setAromaGrade(e.target.value as QualityBatch['aromaGrade'])}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            >
              <option value="Grade A+ (Rich Nutty)">Grade A+ (Rich Nutty & Granular)</option>
              <option value="Grade A (Aromatic)">Grade A (Aromatic)</option>
              <option value="Standard">Standard</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-[#8ea895] block mb-1">Total Jars Produced</label>
            <input
              type="number"
              value={totalJarsProduced}
              onChange={(e) => setTotalJarsProduced(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-[#8ea895] block mb-1">Testing Officer</label>
          <input
            type="text"
            value={testedBy}
            onChange={(e) => setTestedBy(e.target.value)}
            className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
          />
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
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#26492f] to-[#1a3322] text-[#ddc48b] border border-[#c09a45]/40 font-semibold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Save & Certify Batch
          </button>
        </div>
      </form>
    </Modal>
  );
};
