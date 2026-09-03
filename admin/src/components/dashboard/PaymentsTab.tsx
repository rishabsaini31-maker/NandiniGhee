'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  IndianRupee, 
  CheckCircle2, 
  ArrowDownRight, 
  Search, 
  Download, 
  ShieldCheck,
  RefreshCcw,
  Building2,
  Smartphone
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { StatusBadge } from '../ui/StatusBadge';
import { Transaction } from '@/lib/types';

interface PaymentsTabProps {
  transactions: Transaction[];
}

export const PaymentsTab: React.FC<PaymentsTabProps> = ({ transactions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGateway, setSelectedGateway] = useState<string>('All');

  const totalGross = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);
  const totalNet = transactions.reduce((sum, t) => sum + t.netAmount, 0);

  const filteredTxns = transactions.filter((t) => {
    const matchesGateway = selectedGateway === 'All' || t.gateway === selectedGateway;
    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGateway && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gross Transacted"
          value={`₹${totalGross.toLocaleString()}`}
          change="+16.8%"
          isPositive={true}
          icon={IndianRupee}
          subtitle="All Gateways"
          highlight={true}
        />
        <StatCard
          title="Net Bank Settlements"
          value={`₹${Math.round(totalNet).toLocaleString()}`}
          change="+17.1%"
          isPositive={true}
          icon={Building2}
          subtitle="Auto-settled T+1"
        />
        <StatCard
          title="Gateway Processing Fees"
          value={`₹${Math.round(totalFees).toLocaleString()}`}
          change="-2.1%"
          isPositive={true}
          icon={CreditCard}
          subtitle="Avg MDR 1.2%"
        />
        <StatCard
          title="UPI Direct Share"
          value="74.2%"
          change="+5.4%"
          isPositive={true}
          icon={Smartphone}
          subtitle="Zero MDR via NPCI"
        />
      </div>

      {/* Gateway Split & Payout Account */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Gateways Status */}
        <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <h3 className="font-serif font-bold text-sm text-[#f4eee1] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Connected Gateways
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#f4eee1]">Razorpay Gateway</div>
                <div className="text-[11px] text-[#8ea895]">MID: rzp_live_nandini901</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                Active & Live
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#f4eee1]">PhonePe PG & UPI</div>
                <div className="text-[11px] text-[#8ea895]">MID: NANDINIGHEEONLINE</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                Active & Live
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#f4eee1]">Cash On Delivery (COD)</div>
                <div className="text-[11px] text-[#8ea895]">Handled via BlueDart / IndiaPost</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">
                ₹50 Flat Fee
              </span>
            </div>
          </div>
        </div>

        {/* Settlement Account Card */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm text-[#f4eee1]">
                Nandini Current Account (Auto-Settlement)
              </h3>
              <p className="text-xs text-[#8ea895]">Next expected settlement batch tomorrow by 09:00 AM IST</p>
            </div>
            <button 
              onClick={() => alert('Manual settlement check triggered')}
              className="px-3 py-1.5 rounded-xl bg-[#15261d] border border-[#1f3a2b] text-[#ddc48b] text-xs flex items-center gap-1.5 hover:border-[#c09a45]/40"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Re-sync
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
              <div className="text-[11px] text-[#8ea895]">Bank Name</div>
              <div className="text-xs font-bold text-[#f4eee1] mt-0.5">State Bank of India</div>
              <div className="text-[10px] text-[#6d8a74]">MG Road Branch, Bengaluru</div>
            </div>
            <div className="p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
              <div className="text-[11px] text-[#8ea895]">Account Number</div>
              <div className="text-xs font-mono font-bold text-[#ddc48b] mt-0.5">•••• 8901 2291</div>
              <div className="text-[10px] text-emerald-400">Verified KYC</div>
            </div>
            <div className="p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
              <div className="text-[11px] text-[#8ea895]">Current Cycle Settlement</div>
              <div className="text-xs font-bold text-emerald-400 mt-0.5">₹1,42,850.00</div>
              <div className="text-[10px] text-[#6d8a74]">Processing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] overflow-hidden">
        <div className="p-4 border-b border-[#1f3a2b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-base text-[#f4eee1]">Transactions Audit Log</h3>
            <p className="text-xs text-[#8ea895]">All inbound customer payments and fees breakdown</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-[#8ea895] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transaction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#f4eee1] placeholder-[#6d8a74] focus:outline-none focus:border-[#c09a45]"
              />
            </div>
            <button
              onClick={() => alert('Transactions exported')}
              className="px-3 py-1.5 rounded-xl bg-[#15261d] border border-[#1f3a2b] text-[#ddc48b] text-xs flex items-center gap-1.5 hover:border-[#c09a45]/40 shrink-0"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1f3a2b] bg-[#0e1a13]/80 text-[11px] uppercase tracking-wider text-[#6d8a74]">
                <th className="py-3.5 px-4">Txn ID & Date</th>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Gateway & Method</th>
                <th className="py-3.5 px-4">Gross Amount</th>
                <th className="py-3.5 px-4">Fee</th>
                <th className="py-3.5 px-4">Net Payout</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f3a2b]/60 text-xs">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#15261d]/60 transition-colors">
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-[#ddc48b]">{txn.id}</div>
                    <div className="text-[11px] text-[#6d8a74] mt-0.5">{txn.date}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-[#f4eee1]">
                    {txn.orderId}
                  </td>
                  <td className="py-4 px-4 font-medium text-[#d3dfd4]">
                    {txn.customerName}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#f4eee1]">{txn.gateway}</div>
                    <div className="text-[11px] text-[#8ea895]">{txn.method}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#f4eee1]">
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-[#8ea895]">
                    ₹{txn.fee.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400">
                    ₹{txn.netAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <StatusBadge status={txn.status} />
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
