'use client';

import React from 'react';
import { 
  IndianRupee, 
  ShoppingBag, 
  Package, 
  Award, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle,
  CheckCircle,
  Truck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { StatusBadge } from '../ui/StatusBadge';
import { Order, Product, TabType, OrderStatus } from '@/lib/types';

interface OverviewTabProps {
  orders: Order[];
  products: Product[];
  onNavigateTab: (tab: TabType) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onSelectOrder: (order: Order) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  orders,
  products,
  onNavigateTab,
  onUpdateOrderStatus,
  onSelectOrder
}) => {
  const lowStockProducts = products.filter(p => p.stock < 20);

  // Weekly Revenue mock data for pure SVG chart
  const weeklyData = [
    { day: 'Mon', revenue: 42000, orders: 28 },
    { day: 'Tue', revenue: 58000, orders: 39 },
    { day: 'Wed', revenue: 64000, orders: 44 },
    { day: 'Thu', revenue: 52000, orders: 35 },
    { day: 'Fri', revenue: 86000, orders: 58 },
    { day: 'Sat', revenue: 112000, orders: 76 },
    { day: 'Sun', revenue: 98000, orders: 66 },
  ];

  const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#182b21] via-[#122118] to-[#1f3a2b] border border-[#c09a45]/30 relative overflow-hidden shadow-xl">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ddc48b]" /> Festival Demand Surge
              </span>
              <span className="text-xs text-[#8ea895]">Festive Ghee Pre-orders Active</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#f4eee1]">
              Namaste, Administrator!
            </h2>
            <p className="text-sm text-[#8ea895] max-w-xl mt-1">
              Today you have <strong className="text-[#ddc48b]">{orders.filter(o => o.status === 'processing').length} orders to dispatch</strong> and 1 fresh Vedic A2 batch awaiting final lab certification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('orders')}
              className="px-4 py-2.5 rounded-xl bg-[#c09a45] text-[#0d1a12] font-semibold text-xs flex items-center gap-2 hover:bg-[#d0af62] transition-colors shadow-lg shadow-amber-950/40"
            >
              <ShoppingBag className="w-4 h-4" />
              Dispatch Orders ({orders.filter(o => o.status === 'processing' || o.status === 'pending').length})
            </button>
            <button
              onClick={() => onNavigateTab('quality')}
              className="px-4 py-2.5 rounded-xl bg-[#15261d] text-[#ddc48b] border border-[#c09a45]/30 font-medium text-xs flex items-center gap-2 hover:bg-[#1a2f23] transition-colors"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              QC Lab Records
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Store Revenue"
          value="₹5,12,450"
          change="+18.4%"
          isPositive={true}
          icon={IndianRupee}
          subtitle="This Month"
          badge="Live"
          highlight={true}
        />
        <StatCard
          title="Orders Processed"
          value="342"
          change="+12.2%"
          isPositive={true}
          icon={ShoppingBag}
          subtitle="98.5% Fulfilled"
        />
        <StatCard
          title="Ghee Jars Dispatched"
          value="1,480 L"
          change="+24.8%"
          isPositive={true}
          icon={Package}
          subtitle="Gir Cow & Buffalo"
        />
        <StatCard
          title="Vedic Purity Score"
          value="99.92%"
          change="+0.04%"
          isPositive={true}
          icon={Award}
          subtitle="FFA < 0.15%"
        />
      </div>

      {/* Revenue Graph & Sales Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Trends (Pure CSS / SVG Chart) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-[#f4eee1] flex items-center gap-2">
                Revenue & Sales Trajectory
              </h3>
              <p className="text-xs text-[#8ea895]">7-day revenue performance (₹)</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-[#ddc48b]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c09a45]" /> Revenue (₹)
              </span>
            </div>
          </div>

          {/* SVG Bar / Area Visualization */}
          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end justify-between gap-3 px-2 border-b border-[#1f3a2b]">
              {weeklyData.map((item, idx) => {
                const heightPercent = (item.revenue / maxRevenue) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-[#0d1a12] border border-[#c09a45]/40 text-[#f4eee1] px-2 py-1 rounded text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg whitespace-nowrap">
                      ₹{item.revenue.toLocaleString()} ({item.orders} orders)
                    </div>
                    {/* Bar */}
                    <div className="w-full max-w-[42px] bg-[#1a2f23] rounded-t-lg overflow-hidden flex items-end relative h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-[#26492f] via-[#c09a45] to-[#f6edd9] rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                      />
                    </div>
                    <span className="text-xs font-medium text-[#8ea895]">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#15261d]/60 border border-[#1f3a2b]">
              <div className="text-[#8ea895] text-[11px]">Avg Daily Revenue</div>
              <div className="text-sm font-bold text-[#f4eee1] mt-0.5">₹73,200</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#15261d]/60 border border-[#1f3a2b]">
              <div className="text-[#8ea895] text-[11px]">Peak Day (Saturday)</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">₹1,12,000</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#15261d]/60 border border-[#1f3a2b]">
              <div className="text-[#8ea895] text-[11px]">Repeat Patron Rate</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">42.8%</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown & Low Stock */}
        <div className="space-y-6">
          {/* Category Sales Distribution */}
          <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b]">
            <h3 className="font-serif font-bold text-sm text-[#f4eee1] mb-3">
              Sales by Category
            </h3>
            <div className="space-y-3">
              {[
                { name: 'A2 Gir Cow Vedic Ghee', percent: 56, color: 'bg-amber-400' },
                { name: 'Pure Desi Cow Ghee', percent: 24, color: 'bg-emerald-400' },
                { name: 'Premium Dry Fruits', percent: 12, color: 'bg-yellow-600' },
                { name: 'Festive Hampers', percent: 8, color: 'bg-amber-600' },
              ].map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#d3dfd4]">{cat.name}</span>
                    <span className="text-[#ddc48b] font-medium">{cat.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1a2f23] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${cat.percent}%` }}
                      className={`h-full ${cat.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif font-bold text-sm text-[#f4eee1] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Stock Attention Needed
              </h3>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-[11px] text-[#ddc48b] hover:underline"
              >
                View all
              </button>
            </div>

            {lowStockProducts.length > 0 ? (
              <div className="space-y-2">
                {lowStockProducts.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    className="p-2.5 rounded-xl bg-[#182b21]/70 border border-[#1f3a2b] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-medium text-[#f4eee1] line-clamp-1">{prod.name}</div>
                      <div className="text-[10px] text-[#8ea895] font-mono">{prod.sku}</div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {prod.stock} left
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8ea895]">All inventory levels are healthy.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Live Orders Table */}
      <div className="p-6 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif font-bold text-base text-[#f4eee1]">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-[#8ea895]">Real-time orders received from online store</p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-[#ddc48b] hover:text-[#f4eee1] flex items-center gap-1 font-medium"
          >
            All Orders ({orders.length}) <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1f3a2b] text-[11px] uppercase tracking-wider text-[#6d8a74]">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4">Items Ordered</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f3a2b]/60 text-xs">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#15261d]/60 transition-colors group">
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#ddc48b]">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#f4eee1]">{order.customerName}</div>
                    <div className="text-[11px] text-[#8ea895]">{order.city}, {order.state}</div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-[#d3dfd4]">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#f4eee1]">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#182b21] text-[#ddc48b] border border-[#1f3a2b]">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-[#1a2f23] text-[#ddc48b] hover:bg-[#26492f] border border-[#c09a45]/30 text-xs transition-colors"
                    >
                      Details
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
