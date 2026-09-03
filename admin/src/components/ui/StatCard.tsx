import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtitle?: string;
  badge?: string;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  badge,
  highlight = false,
}) => {
  return (
    <div
      className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
        highlight
          ? 'bg-gradient-to-br from-[#1c3324] via-[#122118] to-[#0e1a13] border-[#c09a45]/40 shadow-lg shadow-amber-950/20'
          : 'bg-[#122118]/90 border-[#1f3a2b] hover:border-[#c09a45]/30'
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-[#8ea895] uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1f3a2b] text-[#ddc48b] border border-[#c09a45]/20 font-medium">
              {badge}
            </span>
          )}
          <div className="p-2.5 rounded-xl bg-[#182b21] border border-[#1f3a2b] text-[#ddc48b] group-hover:border-[#c09a45]/40 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-2xl font-serif font-bold text-[#f4eee1] tracking-tight">
          {value}
        </h3>
      </div>

      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#1f3a2b]/60">
        <div className="flex items-center gap-1.5 font-medium">
          {isPositive ? (
            <span className="text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              {change}
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-0.5">
              <TrendingDown className="w-3.5 h-3.5" />
              {change}
            </span>
          )}
          <span className="text-[#6d8a74] text-[11px]">vs last month</span>
        </div>
        {subtitle && <span className="text-[11px] text-[#8ea895]">{subtitle}</span>}
      </div>
    </div>
  );
};
