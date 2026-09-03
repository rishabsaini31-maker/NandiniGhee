"use client";

import { Progress } from "@/components/ui/progress";
import { Truck } from "lucide-react";

export function FreeShippingProgress({ remaining, threshold }: { remaining: number; threshold: number }) {
  const done = remaining <= 0;
  const pct = done ? 100 : Math.min(96, Math.round(((threshold - remaining) / threshold) * 100));
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-[12px] font-medium mb-2">
        <Truck size={14} className={done ? "text-forest-600" : "text-gold-600"} strokeWidth={1.8} />
        {done ? (
          <span className="text-forest-700">You&apos;ve unlocked FREE SHIPPING!</span>
        ) : (
          <span className="text-cocoa-600">
            You&apos;re <span className="font-semibold text-terra-500">₹{remaining.toLocaleString("en-IN")}</span> away from{" "}
            <span className="font-semibold text-forest-800">FREE SHIPPING</span>
          </span>
        )}
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
