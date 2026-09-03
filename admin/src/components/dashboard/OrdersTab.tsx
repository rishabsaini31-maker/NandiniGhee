'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  Printer,
  ChevronDown
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { Order, OrderStatus } from '@/lib/types';

interface OrdersTabProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onSelectOrder: (order: Order) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  onUpdateOrderStatus,
  onSelectOrder
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'dispatched', label: 'Dispatched', count: orders.filter(o => o.status === 'dispatched').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Top Controls & KPI header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#182b21] border border-[#1f3a2b] text-[#ddc48b]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#f4eee1]">Order Management</h3>
            <p className="text-xs text-[#8ea895]">
              Showing {filteredOrders.length} orders totaling <strong className="text-[#ddc48b]">₹{totalRevenue.toLocaleString()}</strong>
            </p>
          </div>
        </div>

        {/* Search input in orders tab */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#8ea895] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f4eee1] placeholder-[#6d8a74] focus:outline-none focus:border-[#c09a45]"
            />
          </div>
          <button 
            onClick={() => alert('Orders exported to CSV')}
            className="px-3.5 py-2 rounded-xl bg-[#15261d] border border-[#1f3a2b] text-[#ddc48b] hover:border-[#c09a45]/40 text-xs font-medium flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedFilter === tab.id
                ? 'bg-[#26492f] text-[#f4eee1] border border-[#c09a45]/50 shadow-md shadow-black/20'
                : 'bg-[#122118] text-[#8ea895] hover:bg-[#15261d] hover:text-[#f4eee1] border border-[#1f3a2b]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedFilter === tab.id ? 'bg-[#0d1a12] text-amber-300' : 'bg-[#1a2f23] text-[#8ea895]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1f3a2b] bg-[#0e1a13]/80 text-[11px] uppercase tracking-wider text-[#6d8a74]">
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Products & Qty</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Payment & Tracking</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f3a2b]/60 text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#15261d]/60 transition-colors">
                    {/* Order ID & Date */}
                    <td className="py-4 px-4 font-mono">
                      <div className="font-bold text-[#ddc48b]">{order.id}</div>
                      <div className="text-[11px] text-[#6d8a74] mt-0.5">{order.createdAt}</div>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-[#f4eee1]">{order.customerName}</div>
                      <div className="text-[11px] text-[#8ea895]">{order.customerPhone}</div>
                      <div className="text-[11px] text-[#6d8a74]">{order.city}, {order.state}</div>
                    </td>

                    {/* Products */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-[#d3dfd4] text-[11px] truncate">
                            <span className="font-semibold text-amber-400">{item.quantity}x</span> {item.name}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 font-bold text-[#f4eee1]">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>

                    {/* Payment & Tracking */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#182b21] text-[#ddc48b] border border-[#1f3a2b] font-medium">
                          {order.paymentMethod}
                        </span>
                        <span className={`text-[10px] ${order.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                          ● {order.paymentStatus}
                        </span>
                      </div>
                      {order.trackingNumber && (
                        <div className="text-[10px] text-[#6d8a74] font-mono mt-1 flex items-center gap-1">
                          <Truck className="w-3 h-3 text-emerald-400" /> {order.trackingNumber}
                        </div>
                      )}
                    </td>

                    {/* Status with Inline Change Option */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={order.status} />
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-[#15261d] border border-[#1f3a2b] text-[11px] text-[#8ea895] rounded px-1.5 py-0.5 focus:outline-none focus:border-[#c09a45] cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => onSelectOrder(order)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#1a2f23] text-[#ddc48b] hover:bg-[#26492f] border border-[#c09a45]/30 text-xs transition-colors inline-flex items-center gap-1"
                        title="View Full Order & Invoice"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-sm text-[#8ea895]">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
