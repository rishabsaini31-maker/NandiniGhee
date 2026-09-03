import React from 'react';
import { OrderStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: OrderStatus | 'in_stock' | 'low_stock' | 'out_of_stock' | 'settled' | 'paid' | 'active' | 'Certified Pure' | 'Testing In Progress' | 'Flagged';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStyles = () => {
    switch (status) {
      case 'delivered':
      case 'in_stock':
      case 'settled':
      case 'paid':
      case 'active':
      case 'Certified Pure':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'processing':
      case 'Testing In Progress':
      case 'dispatched':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'low_stock':
        return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
      case 'pending':
        return 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30';
      case 'cancelled':
      case 'out_of_stock':
      case 'Flagged':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default:
        return 'bg-stone-500/15 text-stone-300 border-stone-500/30';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      case 'processing': return 'Processing';
      case 'dispatched': return 'Dispatched';
      case 'delivered': return 'Delivered';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStyles()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {getLabel()}
    </span>
  );
};
