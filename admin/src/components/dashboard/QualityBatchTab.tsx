'use client';

import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  FlaskConical, 
  Plus, 
  Download, 
  CheckCircle2, 
  Clock, 
  FileText,
  Calendar,
  Sparkles
} from 'lucide-react';
import { QualityBatch } from '@/lib/types';
import { StatusBadge } from '../ui/StatusBadge';

interface QualityBatchTabProps {
  batches: QualityBatch[];
  onOpenNewBatchModal: () => void;
}

export const QualityBatchTab: React.FC<QualityBatchTabProps> = ({
  batches,
  onOpenNewBatchModal
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#182b21] via-[#122118] to-[#1f3a2b] border border-[#c09a45]/30 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> FSSAI & Vedic AGMARK Certified
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#f4eee1]">
              Quality Assurance & Batch Testing
            </h2>
            <p className="text-sm text-[#8ea895] max-w-xl mt-1">
              Every drop of Nandini Ghee undergoes comprehensive chromatography, Free Fatty Acids (FFA), moisture, and sensory purity verification before bottling.
            </p>
          </div>

          <button
            onClick={onOpenNewBatchModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c09a45] to-[#a87e2b] text-[#0d1a12] font-semibold text-xs flex items-center gap-2 hover:brightness-110 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Log New Lab Test
          </button>
        </div>
      </div>

      {/* QC Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="p-6 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] hover:border-[#c09a45]/40 transition-all space-y-4 relative group"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1f3a2b] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-base text-[#f4eee1]">
                    Batch #{batch.batchNumber}
                  </h3>
                  <StatusBadge status={batch.status} />
                </div>
                <p className="text-xs text-[#ddc48b] font-medium mt-0.5">{batch.productType}</p>
              </div>

              <button
                onClick={() => alert(`Downloading Certificate of Analysis (COA) for Batch ${batch.batchNumber}`)}
                className="p-2 rounded-xl bg-[#15261d] border border-[#1f3a2b] text-[#8ea895] hover:text-[#ddc48b] hover:border-[#c09a45]/30 transition-colors"
                title="Download Lab Report (PDF)"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Test Parameters 4-Box Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
                <div className="text-[10px] text-[#8ea895] uppercase tracking-wider">Purity Index</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{batch.purityIndex}%</div>
                <div className="text-[9px] text-[#6d8a74]">Standard &gt; 99.5%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
                <div className="text-[10px] text-[#8ea895] uppercase tracking-wider">FFA Content</div>
                <div className="text-sm font-bold text-[#ddc48b] mt-0.5">{batch.ffaPercent}%</div>
                <div className="text-[9px] text-[#6d8a74]">Limit &lt; 0.3%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
                <div className="text-[10px] text-[#8ea895] uppercase tracking-wider">Moisture</div>
                <div className="text-sm font-bold text-[#f4eee1] mt-0.5">{batch.moisturePercent}%</div>
                <div className="text-[9px] text-[#6d8a74]">Limit &lt; 0.3%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
                <div className="text-[10px] text-[#8ea895] uppercase tracking-wider">Reichert Val</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">{batch.reichertValue}</div>
                <div className="text-[9px] text-[#6d8a74]">Ideal 28 - 32</div>
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="pt-2 border-t border-[#1f3a2b]/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8ea895]">
              <div className="flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tester: {batch.testedBy}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ddc48b]">
                <Calendar className="w-3.5 h-3.5" />
                <span>Mfg: {batch.manufactureDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
