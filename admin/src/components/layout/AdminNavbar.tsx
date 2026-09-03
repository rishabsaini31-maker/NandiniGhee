'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  PackageCheck,
  X
} from 'lucide-react';
import { TabType } from '@/lib/types';

interface AdminNavbarProps {
  currentTab: TabType;
  onOpenAddProduct: () => void;
  onOpenBatchModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  currentTab,
  onOpenAddProduct,
  onOpenBatchModal,
  searchQuery,
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New High-Value Order #ORD-9821',
      description: 'Ananya Sharma placed an order of ₹3,820 (A2 Vedic Ghee)',
      time: '12 mins ago',
      type: 'order',
      unread: true
    },
    {
      id: '2',
      title: 'Low Stock Alert: Bilona Buffalo Ghee',
      description: 'Stock dropped below 20 units (18 jars left)',
      time: '45 mins ago',
      type: 'stock',
      unread: true
    },
    {
      id: '3',
      title: 'Lab Purity Test Passed',
      description: 'Batch NDN-2026-A2-09 verified at 99.92% purity',
      time: '2 hours ago',
      type: 'quality',
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const titles: Record<TabType, { title: string; subtitle: string }> = {
    dashboard: { title: 'Executive Overview', subtitle: 'Live sales metrics, inventory pulse & store health' },
    orders: { title: 'Orders & Dispatches', subtitle: 'Manage customer orders, shipping labels and tracking' },
    products: { title: 'Product Catalog & Inventory', subtitle: 'Vedic Ghee, pure dairy items & festive hamper stocks' },
    payments: { title: 'Payments & Transactions', subtitle: 'UPI, Card gateways, refunds & daily settlements' },
    users: { title: 'Customer Database & CRM', subtitle: 'Patron loyalty tiers, spend analytics and history' },
    quality: { title: 'Quality Assurance & Vedic Batches', subtitle: 'Lab testing, FFA, Moisture & Reichert certifications' },
    analytics: { title: 'Sales Analytics & Growth', subtitle: 'Revenue breakdowns, regional demand & conversion rates' },
    settings: { title: 'Store Settings & Policies', subtitle: 'Delivery thresholds, GST calculation & operational rules' }
  };

  const currentInfo = titles[currentTab] || { title: 'Admin Console', subtitle: 'Nandini Ghee Operations' };

  return (
    <header className="h-20 bg-[#0e1a13]/90 backdrop-blur-md border-b border-[#1f3a2b] px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Title & Section breadcrumb */}
      <div>
        <h2 className="text-xl font-serif font-bold text-[#f4eee1] flex items-center gap-2">
          {currentInfo.title}
        </h2>
        <p className="text-xs text-[#8ea895] font-sans">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Center Search Bar */}
      <div className="relative w-80 hidden md:block">
        <Search className="w-4 h-4 text-[#8ea895] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search SKU, order #, patron..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl pl-10 pr-4 py-2 text-sm text-[#f4eee1] placeholder-[#6d8a74] focus:outline-none focus:border-[#c09a45] focus:ring-1 focus:ring-[#c09a45] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8ea895] hover:text-[#f4eee1]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right Action Icons & Buttons */}
      <div className="flex items-center gap-3">
        {/* Quick Action: New Product */}
        <button
          onClick={onOpenAddProduct}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c09a45] to-[#a87e2b] text-[#0d1a12] font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/40 hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>

        {/* Quick Action: Quality Test */}
        <button
          onClick={onOpenBatchModal}
          className="px-3.5 py-2 rounded-xl bg-[#1a2f23] text-[#ddc48b] border border-[#c09a45]/30 font-medium text-xs flex items-center gap-1.5 hover:bg-[#26492f] active:scale-95 transition-all"
        >
          <PackageCheck className="w-4 h-4 text-emerald-400" />
          <span>Log Batch</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-[#15261d] border border-[#1f3a2b] flex items-center justify-center text-[#d3dfd4] hover:text-[#ddc48b] hover:border-[#c09a45]/40 transition-all relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[#0d1a12] font-bold text-[10px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Modal / Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-84 bg-[#122118] border border-[#1f3a2b] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f3a2b]">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-[#f4eee1]">Store Alerts</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-[#ddc48b] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#1f3a2b]/60 my-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`py-3 px-2 rounded-lg transition-colors ${n.unread ? 'bg-[#182b21]/60' : 'hover:bg-[#15261d]'}`}>
                    <div className="flex items-start gap-2.5">
                      {n.type === 'order' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />}
                      {n.type === 'stock' && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
                      {n.type === 'quality' && <PackageCheck className="w-4 h-4 text-[#ddc48b] mt-0.5 shrink-0" />}
                      <div>
                        <div className="text-xs font-semibold text-[#f4eee1]">{n.title}</div>
                        <p className="text-[11px] text-[#8ea895] mt-0.5">{n.description}</p>
                        <span className="text-[10px] text-[#6d8a74] mt-1 inline-block flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {n.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-2 py-1.5 text-center text-xs font-medium text-[#8ea895] hover:text-[#f4eee1] bg-[#15261d] rounded-lg"
              >
                Close Alerts
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
