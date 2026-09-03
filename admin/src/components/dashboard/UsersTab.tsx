'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Crown, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Award,
  Sparkles,
  Download
} from 'lucide-react';
import { CustomerUser } from '@/lib/types';
import { StatusBadge } from '../ui/StatusBadge';

interface UsersTabProps {
  users: CustomerUser[];
}

export const UsersTab: React.FC<UsersTabProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('All');

  const tiers = ['All', 'VIP Platinum', 'Gold', 'Silver', 'Member'];

  const filteredUsers = users.filter((user) => {
    const matchesTier = selectedTier === 'All' || user.tier === selectedTier;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const getTierColor = (tier: CustomerUser['tier']) => {
    switch (tier) {
      case 'VIP Platinum': return 'bg-amber-400/20 text-amber-300 border-amber-400/40';
      case 'Gold': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Silver': return 'bg-slate-300/20 text-slate-200 border-slate-400/30';
      default: return 'bg-[#1a2f23] text-[#8ea895] border-[#1f3a2b]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#182b21] border border-[#1f3a2b] text-[#ddc48b]">
            <Crown className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#f4eee1]">Patron CRM & Loyalty Tiers</h3>
            <p className="text-xs text-[#8ea895]">
              {users.length} registered customers with repeat Vedic Ghee subscriptions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#8ea895] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patron by name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f4eee1] placeholder-[#6d8a74] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
          <button 
            onClick={() => alert('Customers list exported to CSV')}
            className="px-3.5 py-2 rounded-xl bg-[#15261d] border border-[#1f3a2b] text-[#ddc48b] text-xs font-medium flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
        </div>
      </div>

      {/* Tier Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedTier === tier
                ? 'bg-[#26492f] text-[#f4eee1] border border-[#c09a45]/50 shadow-md'
                : 'bg-[#122118] text-[#8ea895] hover:bg-[#15261d] hover:text-[#f4eee1] border border-[#1f3a2b]'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1f3a2b] bg-[#0e1a13]/80 text-[11px] uppercase tracking-wider text-[#6d8a74]">
                <th className="py-3.5 px-4">Patron Name</th>
                <th className="py-3.5 px-4">Loyalty Tier</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">City / Region</th>
                <th className="py-3.5 px-4">Orders Placed</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f3a2b]/60 text-xs">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#15261d]/60 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1f3a2b] to-[#c09a45]/40 flex items-center justify-center font-bold text-xs text-[#ddc48b] border border-[#c09a45]/30">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-[#f4eee1]">{user.name}</div>
                        <div className="text-[10px] text-[#8ea895] font-mono">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${getTierColor(user.tier)}`}>
                      <Crown className="w-3 h-3" />
                      {user.tier}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-[#f4eee1] flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#8ea895]" /> {user.email}
                    </div>
                    <div className="text-[11px] text-[#8ea895] flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3 text-[#6d8a74]" /> {user.phone}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-[#d3dfd4] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {user.city}, {user.state}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#f4eee1] flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                      {user.totalOrders} orders
                    </div>
                    <div className="text-[10px] text-[#6d8a74]">Last: {user.lastOrderDate}</div>
                  </td>

                  <td className="py-4 px-4 font-bold text-[#ddc48b]">
                    ₹{user.totalSpent.toLocaleString()}
                  </td>

                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => alert(`Opening CRM profile for ${user.name}`)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1a2f23] text-[#ddc48b] hover:bg-[#26492f] border border-[#c09a45]/30 text-xs transition-colors"
                    >
                      View Profile
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
