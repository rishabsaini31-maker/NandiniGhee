"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch, Package, CheckCircle2, ClipboardList, Boxes, Truck, Navigation, Home } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useUser } from "@/lib/store/user";
import { OrderRecord } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useHasMounted } from "@/hooks/use-has-mounted";

const TIMELINE = [
  { key: "Placed", label: "Order Placed", icon: ClipboardList },
  { key: "Confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "Packed", label: "Packed", icon: Boxes },
  { key: "Shipped", label: "Shipped", icon: Package },
  { key: "Out for Delivery", label: "Out for Delivery", icon: Navigation },
  { key: "Delivered", label: "Delivered", icon: Home },
];

export default function TrackOrderPage() {
  const orders = useUser((s) => s.orders);
  const [orderNo, setOrderNo] = useState("");
  const [contact, setContact] = useState("");
  const [found, setFound] = useState<OrderRecord | null | "none">(null);
  const mounted = useHasMounted();

  const track = (e: React.FormEvent) => {
    e.preventDefault();
    const num = orderNo.trim().toUpperCase();
    if (!num) return;
    const match = orders.find((o) => o.orderNumber.toUpperCase() === num);
    setFound(match ?? "none");
    if (!match) {
      toast({
        title: "Order not found in this browser",
        description: "Demo note: place an order first — then track it here. Orders placed in this session are stored locally.",
      });
    }
  };

  const currentStep = found && found !== "none" ? Math.max(1, TIMELINE.findIndex((t) => t.key === found.status)) : 0;

  return (
    <>
      <PageHeader
        eyebrow="Order Updates"
        title="Track Your Order"
        description="Enter your order number and registered email or mobile to see exactly where your parcel is."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
      />

      <div className="mx-auto max-w-3xl px-5 md:px-8 py-14">
        {/* Form */}
        <form onSubmit={track} className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">Order Number</label>
              <input
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                placeholder="e.g. NG1024"
                className="w-full h-12 px-4 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400 transition-colors uppercase"
              />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">Mobile / Email</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Registered contact"
                className="w-full h-12 px-4 rounded-sm border border-border text-[13.5px] outline-none focus:border-gold-400 transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full h-12 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 text-[12px] font-bold tracking-[0.16em] uppercase transition-all hover:shadow-lg inline-flex items-center justify-center gap-2"
          >
            <PackageSearch size={15} /> Track Order
          </button>
        </form>

        {/* Result */}
        {found === "none" && (
          <div className="mt-8 text-center py-10 rounded-lg border border-dashed border-border">
            <p className="font-display text-xl text-forest-900">No order found for “{orderNo}”</p>
            <p className="text-[13px] text-cocoa-400 mt-2 max-w-md mx-auto leading-relaxed">
              Double-check the order number from your confirmation email. (Demo: orders you place in this session appear here.)
            </p>
          </div>
        )}

        {found && found !== "none" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-card rounded-lg border border-border p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-border/70">
              <div>
                <p className="eyebrow text-gold-600">Order {found.orderNumber}</p>
                <p className="text-[13px] text-cocoa-500 mt-1">
                  Placed on {new Date(found.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {formatINR(found.total)}
                </p>
              </div>
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase bg-forest-50 text-forest-700 border border-forest-100 rounded-full px-3.5 py-1.5">
                {found.status}
              </span>
            </div>

            {/* Timeline */}
            <ol className="mt-8 relative">
              {TIMELINE.map((t, i) => {
                const Icon = t.icon;
                const done = i <= currentStep;
                const isLast = i === TIMELINE.length - 1;
                return (
                  <li key={t.key} className="relative flex gap-5 pb-9 last:pb-0">
                    {!isLast && (
                      <span
                        className={cn(
                          "absolute left-[17px] top-9 bottom-0 w-0.5 transition-colors",
                          i < currentStep ? "bg-forest-700" : "bg-border"
                        )}
                      />
                    )}
                    <motion.span
                      initial={done ? { scale: 0.5, opacity: 0 } : false}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className={cn(
                        "relative w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        done ? "bg-forest-800 border-forest-800 text-ivory" : "bg-card border-border text-cocoa-300"
                      )}
                    >
                      <Icon size={15} strokeWidth={1.8} />
                    </motion.span>
                    <div className="pt-1.5">
                      <p className={cn("text-[13.5px] font-semibold", done ? "text-forest-900" : "text-cocoa-300")}>{t.label}</p>
                      {i === currentStep && (
                        <p className="text-[11.5px] text-gold-700 mt-0.5">Current status — updated {found.status === "Confirmed" ? "recently" : "today"}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Items mini */}
            <div className="mt-6 pt-6 border-t border-border/70">
              <p className="eyebrow text-cocoa-400 mb-3">In this parcel</p>
              <ul className="flex flex-wrap gap-2">
                {found.items.map((i, idx) => (
                  <li key={idx} className="text-[11.5px] bg-parchment border border-border rounded-full px-3 py-1.5 text-forest-800">
                    {i.name} × {i.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Empty state hint */}
        {mounted && orders.length === 0 && found === null && (
          <div className="mt-8 text-center py-8 rounded-lg bg-parchment/60 border border-border/60">
            <Truck size={26} className="text-cocoa-300 mx-auto" />
            <p className="text-[13px] text-cocoa-400 mt-3">
              No orders yet in this session. Place a demo order at checkout and track it live here.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
