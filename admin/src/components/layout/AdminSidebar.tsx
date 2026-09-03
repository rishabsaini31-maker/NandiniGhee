'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  CreditCard, 
  Users, 
  Award, 
  BarChart3, 
  Settings, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Store,
  ExternalLink
} from 'lucide-react';
import { TabType } from '@/lib/types';

interface AdminSidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  pendingOrdersCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingOrdersCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Overview & Live KPIs'
    },
    {
      id: 'orders' as TabType,
      label: 'Orders',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      description: 'Dispatch & fulfillment'
    },
    {
      id: 'products' as TabType,
      label: 'Products',
      icon: Package,
      badge: null,
      description: 'Catalog & Stock'
    },
    {
      id: 'payments' as TabType,
      label: 'Payments',
      icon: CreditCard,
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Gateways & Settlements'
    },
    {
      id: 'users' as TabType,
      label: 'Customers',
      icon: Users,
      badge: null,
      description: 'VIP CRM & Tiers'
    },
    {
      id: 'quality' as TabType,
      label: 'Quality & Batches',
      icon: Award,
      badge: 'A2 Vedic',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      description: 'Lab Purity & FFA Tests'
    },
    {
      id: 'analytics' as TabType,
      label: 'Analytics',
      icon: BarChart3,
      badge: null,
      description: 'Revenue & Regions'
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      icon: Settings,
      badge: null,
      description: 'Store & Shipping Rules'
    }
  ];

  return (
    <aside className="w-72 bg-[#0e1a13] border-r border-[#1f3a2b] flex flex-col h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1f3a2b]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c09a45] via-[#8a6420] to-[#26492f] p-0.5 shadow-lg shadow-amber-950/40 flex items-center justify-center">
            <div className="w-full h-full bg-[#0d1a12] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#ddc48b]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg text-[#f4eee1] tracking-wide">
                NANDINI
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500/20 to-amber-700/20 text-amber-300 border border-amber-500/30 font-semibold tracking-wider">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-[#8ea895] font-sans">
              Heritage Dairy Portal
            </p>
          </div>
        </div>

        {/* Live Store Quick Status */}
        <div className="mt-4 p-2.5 rounded-lg bg-[#15261d]/80 border border-[#1f3a2b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-300">Store Live & Accepting</span>
          </div>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#8ea895] hover:text-[#ddc48b] flex items-center gap-1 transition-colors"
            title="Open Customer Storefront"
          >
            Store <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <p className="px-3 text-[11px] font-semibold text-[#6d8a74] uppercase tracking-wider mb-2">
          Operations & Control
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group text-left ${
                isActive
                  ? 'bg-gradient-to-r from-[#26492f] to-[#1a3322] text-[#f4eee1] shadow-md shadow-black/40 border border-[#c09a45]/40'
                  : 'text-[#8ea895] hover:bg-[#15261d] hover:text-[#f4eee1] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#c09a45]/20 text-[#ddc48b]'
                      : 'text-[#6d8a74] group-hover:text-[#ddc48b] group-hover:bg-[#1f3a2b]/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${isActive ? 'text-[#f4eee1]' : 'text-[#d3dfd4]'}`}>
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#6d8a74] font-normal leading-tight">
                    {item.description}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-[#1f3a2b] text-[#ddc48b] border-[#c09a45]/20'}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Purity Assurance & Admin Footer */}
      <div className="p-4 border-t border-[#1f3a2b] bg-[#0b150f]">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#182b21] to-[#122118] border border-[#c09a45]/20 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ddc48b] mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Vedic Purity Verified
          </div>
          <p className="text-[11px] text-[#8ea895]">
            Batch NDN-2026-A2-09 certified (99.92% purity, FFA 0.14%).
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c09a45] to-[#2f5738] flex items-center justify-center font-bold text-xs text-[#0d1a12] border border-[#c09a45]">
              RS
            </div>
            <div>
              <div className="text-xs font-semibold text-[#f4eee1]">Rishab Saini</div>
              <div className="text-[10px] text-amber-400 font-medium">Super Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
