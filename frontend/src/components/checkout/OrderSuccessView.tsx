"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, MapPin, Mail, MessageCircle } from "lucide-react";
import { useUser } from "@/lib/store/user";
import { formatINR } from "@/lib/format";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderSuccessInner() {
  const orders = useUser((s) => s.orders);
  const searchParams = useSearchParams();
  const mounted = useHasMounted();

  const orderNumber = searchParams.get("order");
  const order = orders.find((o) => o.orderNumber === orderNumber) ?? orders[0] ?? null;

  if (!mounted) return null;

  const delivery = order?.estimatedDelivery
    ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })
    : "Within 4–6 working days";

  return (
    <div className="min-h-screen bg-parchment/50">
      <div className="mx-auto max-w-2xl px-5 md:px-8 pt-32 md:pt-36 pb-24">
        {/* Confirmation */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-forest-800 flex items-center justify-center mx-auto"
        >
          <CheckCircle2 size={38} className="text-gold-400" strokeWidth={1.6} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-7"
        >
          <p className="eyebrow text-gold-600">Order Confirmed</p>
          <h1 className="font-display text-3xl md:text-[2.6rem] font-medium text-forest-900 mt-3 text-balance">
            Thank you for choosing NANDINI.
          </h1>
          <p className="text-[14px] text-cocoa-500 mt-3 leading-relaxed max-w-md mx-auto">
            Your order is being prepared with the same care we put into every jar. A confirmation email is on its way to you.
          </p>
        </motion.div>

        {/* Order card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 bg-card rounded-lg border border-border overflow-hidden shadow-[0_20px_60px_-30px_rgba(18,33,26,0.4)]"
        >
          <div className="px-6 md:px-8 py-5 bg-forest-950 text-ivory flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-forest-300/80">Order Number</p>
              <p className="font-display text-lg font-semibold text-gold-300 mt-0.5">{order?.orderNumber ?? "NG1024"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] uppercase text-forest-300/80">Estimated Delivery</p>
              <p className="text-[13px] font-medium text-ivory mt-1">{delivery}</p>
            </div>
          </div>

          <div className="px-6 md:px-8 py-6">
            <p className="eyebrow text-cocoa-400 mb-4">Your Items</p>
            <ul className="space-y-4">
              {(order?.items ?? []).map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="relative w-14 h-14 rounded-sm overflow-hidden bg-cream shrink-0">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] font-semibold text-forest-900">{item.name}</span>
                    <span className="block text-[11.5px] text-cocoa-400">{item.variantLabel} × {item.quantity}</span>
                  </span>
                  <span className="text-[13.5px] font-semibold text-forest-900">{formatINR(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-border/70 space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-cocoa-500">Subtotal</span><span className="font-medium">{formatINR(order?.subtotal ?? 0)}</span></div>
              {(order?.discount ?? 0) > 0 && (
                <div className="flex justify-between"><span className="text-cocoa-500">Discount</span><span className="text-forest-600 font-medium">−{formatINR(order!.discount)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-cocoa-500">Shipping</span><span className="font-medium">{order?.shipping === 0 ? "FREE" : formatINR(order?.shipping ?? 0)}</span></div>
              <div className="flex justify-between pt-2 border-t border-border text-[15px] font-semibold"><span>Total</span><span>{formatINR(order?.total ?? 0)}</span></div>
            </div>

            {order && (
              <div className="mt-5 rounded-md bg-parchment/70 p-4 flex items-start gap-3 text-[12.5px]">
                <MapPin size={15} className="text-forest-700 mt-0.5 shrink-0" />
                <p className="text-cocoa-500 leading-relaxed">
                  Delivering to <span className="font-semibold text-forest-900">{order.address.fullName}</span>, {order.address.line1}, {order.address.city}, {order.address.state} — {order.address.pincode}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/track-order"
            className="h-12 px-8 inline-flex items-center justify-center gap-2.5 bg-forest-800 text-ivory hover:bg-forest-700 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-all hover:shadow-lg"
          >
            <Package size={15} /> Track Order
          </Link>
          <Link
            href="/shop"
            className="h-12 px-8 inline-flex items-center justify-center gap-2.5 border border-forest-800 text-forest-800 hover:bg-forest-50 text-[12px] font-bold tracking-[0.16em] uppercase rounded-sm transition-colors"
          >
            Continue Shopping <ArrowRight size={15} />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-10 text-center text-[12px] text-cocoa-400 flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="inline-flex items-center gap-1.5"><Mail size={13} /> Confirmation emailed</span>
          <span className="inline-flex items-center gap-1.5"><MessageCircle size={13} /> WhatsApp updates enabled</span>
        </motion.p>
      </div>
    </div>
  );
}

export function OrderSuccessView() {
  return (
    <Suspense>
      <OrderSuccessInner />
    </Suspense>
  );
}
