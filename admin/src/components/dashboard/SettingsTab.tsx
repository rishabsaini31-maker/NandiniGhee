'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Truck, 
  Percent, 
  Phone, 
  ShieldCheck, 
  Save, 
  Store, 
  Database,
  CheckCircle2
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const [storeOnline, setStoreOnline] = useState(true);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(999);
  const [standardShippingFee, setStandardShippingFee] = useState(79);
  const [gheeGSTRate, setGheeGSTRate] = useState(5);
  const [whatsAppAlertsNumber, setWhatsAppAlertsNumber] = useState('+91 98450 00001');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Save Bar */}
      <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#f4eee1]">Store Operational Parameters</h3>
          <p className="text-xs text-[#8ea895]">Configure shipping rules, GST rates, and notification gateways</p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c09a45] to-[#a87e2b] text-[#0d1a12] font-semibold text-xs flex items-center gap-1.5 hover:brightness-110 transition-all shadow-md"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          Settings updated successfully! Changes applied across storefront and checkout.
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store Visibility */}
        <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <h4 className="font-serif font-bold text-sm text-[#f4eee1] flex items-center gap-2">
            <Store className="w-4 h-4 text-[#ddc48b]" /> Store Status
          </h4>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#15261d] border border-[#1f3a2b]">
            <div>
              <div className="text-xs font-semibold text-[#f4eee1]">Online Storefront</div>
              <div className="text-[11px] text-[#8ea895]">Accepting customer orders 24/7</div>
            </div>
            <button
              onClick={() => setStoreOnline(!storeOnline)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                storeOnline ? 'bg-emerald-600' : 'bg-stone-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  storeOnline ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Shipping Thresholds */}
        <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <h4 className="font-serif font-bold text-sm text-[#f4eee1] flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" /> Shipping & Delivery Rules
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-[#8ea895] block mb-1">
                Free Shipping Order Threshold (₹)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8ea895] block mb-1">
                Standard Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
              />
            </div>
          </div>
        </div>

        {/* Tax & GST */}
        <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <h4 className="font-serif font-bold text-sm text-[#f4eee1] flex items-center gap-2">
            <Percent className="w-4 h-4 text-amber-400" /> Tax & HSN Billing
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-[#8ea895] block mb-1">
                Ghee GST Rate (HSN 04059020) %
              </label>
              <input
                type="number"
                value={gheeGSTRate}
                onChange={(e) => setGheeGSTRate(Number(e.target.value))}
                className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8ea895] block mb-1">
                GSTIN Number (Karnataka)
              </label>
              <input
                type="text"
                disabled
                value="29AAAAA0000A1Z5"
                className="w-full bg-[#15261d]/60 border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#8ea895] font-mono cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Dispatch Alerts */}
        <div className="p-5 rounded-2xl bg-[#122118]/90 border border-[#1f3a2b] space-y-4">
          <h4 className="font-serif font-bold text-sm text-[#f4eee1] flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp & SMS Dispatch Alerts
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-[#8ea895] block mb-1">
                Admin Notification Phone Number
              </label>
              <input
                type="text"
                value={whatsAppAlertsNumber}
                onChange={(e) => setWhatsAppAlertsNumber(e.target.value)}
                className="w-full bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] focus:outline-none focus:border-[#c09a45]"
              />
            </div>
            <div className="text-[11px] text-[#8ea895]">
              Automatic SMS & WhatsApp dispatch updates are sent to customers on carrier status changes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
