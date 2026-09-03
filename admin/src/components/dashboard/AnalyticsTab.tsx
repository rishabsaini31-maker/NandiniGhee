'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  ShoppingBag, 
  Users, 
  Percent,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';

export const AnalyticsTab: React.FC = () => {
  const stateDemand = [
    { state: 'Karnataka (Bengaluru, Mysuru, Hubballi)', percentage: 48, orders: 164, revenue: '₹2,45,900' },
    { state: 'Maharashtra (Mumbai, Pune)', percentage: 22, orders: 75, revenue: '₹1,12,700' },
    { state: 'Delhi NCR (Gurugram, Noida, Delhi)', percentage: 16, orders: 54, revenue: '₹81,900' },
    { state: 'Tamil Nadu (Chennai, Coimbatore)', percentage: 9, orders: 31, revenue: '₹46,100' },
    { state: 'Other States & Exports', percentage: 5, orders: 18, revenue: '₹25,850' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Growth Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Conversion Rate"
          value="4.62%"
          change="+0.8%"
          isPositive={true}
          icon={Percent}
          subtitle="Store Visitors to Buyers"
          highlight={true}
        />
        <StatCard
          title="Average Order Value"
          value="₹2,140"
          change="+₹280"
          isPositive={true}
          icon={ShoppingBag}
          subtitle="A2 Ghee + Dry Fruits Combos"
        />
        <StatCard
          title="Customer Lifetime Val"
          value="₹8,920"
          change="+14.2%"
          isPositive={true}
          icon={Users}
          subtitle="Avg 4.2 Purchases/yr"
        />
        <StatCard
          title="Cart Abandonment"
          value="18.4%"
          change="-3.1%"
          isPositive={true}
          icon={TrendingUp}
          subtitle="Industry Avg 65%"
        />
      </div>

      {/* Regional Demand Breakdown */}
      <div className="p-6 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-[#f4eee1] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Regional Sales & Dispatch Distribution
            </h3>
            <p className="text-xs text-[#8ea895]">Geographical demand for authentic Nandini Ghee across India</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {stateDemand.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#15261d]/70 border border-[#1f3a2b] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="font-medium text-[#f4eee1] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#182b21] border border-[#c09a45]/30 flex items-center justify-center text-[10px] font-bold text-[#ddc48b]">
                    {idx + 1}
                  </span>
                  {item.state}
                </div>
                <div className="flex items-center gap-4 text-[#8ea895]">
                  <span>{item.orders} orders</span>
                  <span className="font-bold text-[#ddc48b]">{item.revenue}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full h-2 bg-[#1a2f23] rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.percentage}%` }}
                  className="h-full bg-gradient-to-r from-[#26492f] via-[#c09a45] to-[#d0af62] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
