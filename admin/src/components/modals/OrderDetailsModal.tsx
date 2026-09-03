'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Order, OrderStatus } from '@/lib/types';
import { StatusBadge } from '../ui/StatusBadge';
import { 
  Printer, 
  Truck, 
  CheckCircle, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  IndianRupee,
  ShieldCheck
} from 'lucide-react';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onUpdateTracking: (orderId: string, tracking: string) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  onUpdateTracking
}) => {
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveTracking = () => {
    if (trackingNumber) {
      onUpdateTracking(order.id, trackingNumber);
      alert(`Tracking number ${trackingNumber} saved for order ${order.id}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Invoice & Dispatch #${order.id}`}
      subtitle={`Placed on ${order.createdAt} • ${order.paymentMethod} Payment`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6 print:text-black">
        {/* Top Status & Quick Action Ribbon */}
        <div className="p-4 rounded-xl bg-[#15261d] border border-[#1f3a2b] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8ea895]">Current Status:</span>
            <StatusBadge status={order.status} />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={order.status}
              onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
              className="bg-[#182b21] border border-[#c09a45]/40 text-xs text-[#ddc48b] rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="pending">Mark as Pending</option>
              <option value="processing">Mark as Processing</option>
              <option value="dispatched">Mark as Dispatched</option>
              <option value="delivered">Mark as Delivered</option>
              <option value="cancelled">Mark as Cancelled</option>
            </select>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#1a2f23] text-[#f4eee1] border border-[#1f3a2b] hover:border-[#c09a45]/40 text-xs flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5 text-[#ddc48b]" /> Print Tax Invoice
            </button>
          </div>
        </div>

        {/* Customer & Shipping Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#15261d]/70 border border-[#1f3a2b] space-y-2">
            <h4 className="text-xs font-serif font-bold text-[#ddc48b] uppercase tracking-wider">
              Customer Details
            </h4>
            <div className="text-sm font-semibold text-[#f4eee1]">{order.customerName}</div>
            <div className="text-xs text-[#8ea895] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {order.customerEmail}
            </div>
            <div className="text-xs text-[#8ea895] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> {order.customerPhone}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#15261d]/70 border border-[#1f3a2b] space-y-2">
            <h4 className="text-xs font-serif font-bold text-[#ddc48b] uppercase tracking-wider">
              Shipping Destination
            </h4>
            <div className="text-xs text-[#f4eee1] leading-relaxed">
              {order.address}
            </div>
            <div className="text-xs text-[#8ea895] flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {order.city}, {order.state} - India
            </div>
          </div>
        </div>

        {/* Dispatch Carrier Tracking Editor */}
        <div className="p-4 rounded-xl bg-[#182b21] border border-[#1f3a2b] space-y-2">
          <h4 className="text-xs font-serif font-bold text-[#f4eee1] flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-400" /> Courier AWB Tracking Code
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. BLR-EXP-90812 or DTDC-99210"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 bg-[#15261d] border border-[#1f3a2b] rounded-xl px-3 py-2 text-xs text-[#f4eee1] font-mono focus:outline-none focus:border-[#c09a45]"
            />
            <button
              onClick={handleSaveTracking}
              className="px-3.5 py-2 rounded-xl bg-[#c09a45] text-[#0d1a12] font-semibold text-xs hover:bg-[#d0af62]"
            >
              Update AWB
            </button>
          </div>
        </div>

        {/* Ordered Products Table */}
        <div>
          <h4 className="text-xs font-serif font-bold text-[#f4eee1] mb-2">Order Line Items</h4>
          <div className="rounded-xl border border-[#1f3a2b] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e1a13] text-[#6d8a74] text-[11px] uppercase tracking-wider border-b border-[#1f3a2b]">
                <tr>
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Rate</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f3a2b]">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="bg-[#122118]">
                    <td className="py-2.5 px-3 font-medium text-[#f4eee1]">{item.name}</td>
                    <td className="py-2.5 px-3 text-[#ddc48b]">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-[#8ea895]">₹{item.price}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-[#f4eee1]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#0e1a13] border-t border-[#1f3a2b] font-semibold">
                <tr>
                  <td colSpan={3} className="py-2.5 px-3 text-right text-[#8ea895]">Total Invoice Value:</td>
                  <td className="py-2.5 px-3 text-right text-amber-400 font-bold text-sm">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};
