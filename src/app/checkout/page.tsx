"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, CreditCard, Landmark, ShieldCheck, Smartphone, Truck, Wallet, Lock } from "lucide-react";
import { useCart, resolveCart, cartTotals, COUPONS } from "@/lib/store/cart";
import { useUser } from "@/lib/store/user";
import { PRODUCTS } from "@/lib/data/products";
import { formatINR } from "@/lib/format";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { OrderRecord } from "@/lib/types";
import { useRouter } from "next/navigation";

const STEPS = ["Contact", "Address", "Shipping", "Payment", "Review"] as const;

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm & more", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", desc: "All major Indian banks", icon: Landmark },
  { id: "wallet", label: "Wallets", desc: "Paytm, Amazon Pay, Mobikwik", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: Truck },
];

const STATES = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana", "Gujarat", "Rajasthan", "West Bengal", "Uttar Pradesh", "Kerala", "Punjab", "Haryana"];

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const couponCode = useCart((s) => s.couponCode);
  const addOrder = useUser((s) => s.addOrder);
  const user = useUser((s) => s.user);

  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    fullName: "",
    addressLine: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  const [payment, setPayment] = useState("upi");

  useEffect(() => {
    setMounted(true);
    setForm((f) => ({ ...f, email: f.email || user.email, phone: f.phone || user.phone, fullName: f.fullName || user.name }));
  }, [user]);

  const items = useMemo(() => resolveCart(lines, PRODUCTS), [lines]);
  const coupon = COUPONS.find((c) => c.code === couponCode) ?? null;
  const totals = cartTotals(items, coupon);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-32 text-center px-5">
        <h1 className="font-display text-3xl text-forest-900">Your cart is empty</h1>
        <p className="text-[13.5px] text-cocoa-400 mt-3">Add something wonderful before checking out.</p>
        <Link href="/shop" className="mt-8 inline-flex h-12 px-10 items-center rounded-sm bg-forest-800 text-ivory text-[12px] font-semibold tracking-[0.16em] uppercase hover:bg-forest-700 transition-colors">
          Back to Shop
        </Link>
      </div>
    );
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateStep = (): boolean => {
    if (step === 0) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        toast({ title: "Please enter a valid email", variant: "destructive" });
        return false;
      }
      if (!/^[+0-9\s-]{10,15}$/.test(form.phone)) {
        toast({ title: "Please enter a valid mobile number", variant: "destructive" });
        return false;
      }
    }
    if (step === 1) {
      if (!form.fullName.trim() || !form.addressLine.trim() || !form.city.trim()) {
        toast({ title: "Please fill all address fields", variant: "destructive" });
        return false;
      }
      if (!/^\d{6}$/.test(form.pincode)) {
        toast({ title: "PIN code must be 6 digits", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4));
  };

  const placeOrder = () => {
    setPlacing(true);
    const orderNumber = `NG${Math.floor(1000 + Math.random() * 9000)}`;
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 4);
    const order: OrderRecord = {
      id: `o${Date.now()}`,
      orderNumber,
      placedAt: new Date().toISOString(),
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        variantLabel: i.variant.label,
        quantity: i.quantity,
        price: i.variant.price,
        image: i.product.images[0],
      })),
      address: {
        fullName: form.fullName,
        phone: form.phone,
        line1: form.addressLine,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      paymentMethod: PAYMENT_METHODS.find((p) => p.id === payment)?.label ?? "UPI",
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      status: "Confirmed",
      estimatedDelivery: delivery.toISOString(),
    };
    setTimeout(() => {
      addOrder(order);
      clear();
      router.push(`/order-success?order=${orderNumber}`);
    }, 1200);
  };

  return (
    <div className="bg-parchment/50 min-h-screen">
      <div className="mx-auto max-w-5xl px-5 md:px-8 pt-28 md:pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="eyebrow text-gold-600">Secure Checkout</p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-forest-900 mt-2">Almost Yours</h1>
          <p className="inline-flex items-center gap-1.5 text-[11.5px] text-cocoa-400 mt-3">
            <Lock size={12} className="text-forest-600" /> 256-bit SSL encrypted · PCI-DSS compliant payments
          </p>
        </div>

        {/* Stepper */}
        <ol className="flex items-center justify-center gap-0 mb-10" aria-label="Checkout progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn("flex items-center gap-2", i <= step ? "text-forest-900" : "text-cocoa-300")}
                aria-current={i === step ? "step" : undefined}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-full border text-[12px] font-semibold flex items-center justify-center transition-all",
                    i < step
                      ? "bg-forest-800 border-forest-800 text-ivory"
                      : i === step
                        ? "border-gold-500 text-gold-700 bg-gold-50"
                        : "border-border"
                  )}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </span>
                <span className={cn("text-[11px] font-semibold tracking-wide uppercase hidden sm:inline", i === step && "text-forest-900")}>
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && <span className={cn("w-6 sm:w-10 h-px mx-2", i < step ? "bg-forest-700" : "bg-border")} />}
            </li>
          ))}
        </ol>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Form area */}
          <div className="bg-card rounded-lg border border-border p-6 md:p-8 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <section aria-label="Contact information">
                    <h2 className="font-display text-xl font-semibold text-forest-900 mb-6">Contact Information</h2>
                    <div className="space-y-5">
                      <Field label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                      <Field label="Mobile Number" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98XXX XXXXX" hint="Order updates will be sent here" />
                    </div>
                  </section>
                )}

                {step === 1 && (
                  <section aria-label="Delivery address">
                    <h2 className="font-display text-xl font-semibold text-forest-900 mb-6">Delivery Address</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <Field label="Full Name" value={form.fullName} onChange={set("fullName")} placeholder="Your name" />
                      </div>
                      <div className="sm:col-span-2">
                        <Field label="Address" value={form.addressLine} onChange={set("addressLine")} placeholder="House / flat, street, area" />
                      </div>
                      <Field label="City" value={form.city} onChange={set("city")} placeholder="City" />
                      <div>
                        <label className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">State</label>
                        <select
                          value={form.state}
                          onChange={set("state")}
                          className="w-full h-12 px-4 rounded-sm border border-border bg-card text-[13.5px] outline-none focus:border-gold-400"
                        >
                          {STATES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <Field label="PIN Code" value={form.pincode} onChange={set("pincode")} placeholder="6 digits" />
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section aria-label="Shipping method">
                    <h2 className="font-display text-xl font-semibold text-forest-900 mb-6">Shipping Method</h2>
                    <div className="rounded-md border border-forest-700 bg-forest-50/60 p-5 flex items-start gap-4">
                      <span className="w-11 h-11 rounded-full bg-forest-800 text-ivory flex items-center justify-center shrink-0">
                        <Truck size={18} strokeWidth={1.7} />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className="text-[14px] font-semibold text-forest-900">Standard Delivery</p>
                          <p className="text-[13px] font-semibold text-forest-700">{totals.shipping === 0 ? "FREE" : formatINR(totals.shipping)}</p>
                        </div>
                        <p className="text-[12.5px] text-cocoa-500 mt-1 leading-relaxed">
                          Delivered in 2–6 working days with live tracking via email &amp; WhatsApp. Ghee orders include thermal padding in summer.
                        </p>
                      </div>
                      <Check size={18} className="text-forest-700 shrink-0" />
                    </div>
                  </section>
                )}

                {step === 3 && (
                  <section aria-label="Payment method">
                    <h2 className="font-display text-xl font-semibold text-forest-900 mb-6">Payment Method</h2>
                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((pm) => {
                        const Icon = pm.icon;
                        return (
                          <label
                            key={pm.id}
                            className={cn(
                              "flex items-center gap-4 rounded-md border p-4 cursor-pointer transition-all",
                              payment === pm.id ? "border-forest-700 bg-forest-50/60 shadow-sm" : "border-border hover:border-gold-400"
                            )}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={pm.id}
                              checked={payment === pm.id}
                              onChange={() => setPayment(pm.id)}
                              className="sr-only"
                            />
                            <span className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", payment === pm.id ? "bg-forest-800 text-ivory" : "bg-parchment text-cocoa-500")}>
                              <Icon size={17} strokeWidth={1.7} />
                            </span>
                            <span className="flex-1">
                              <span className="block text-[13.5px] font-semibold text-forest-900">{pm.label}</span>
                              <span className="block text-[11.5px] text-cocoa-400">{pm.desc}</span>
                            </span>
                            <span className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", payment === pm.id ? "border-forest-700" : "border-cocoa-200")}>
                              {payment === pm.id && <span className="w-2.5 h-2.5 rounded-full bg-forest-700" />}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <p className="mt-4 flex items-center gap-1.5 text-[11px] text-cocoa-400">
                      <ShieldCheck size={13} className="text-forest-600" /> Your payment details are encrypted and never stored on our servers.
                    </p>
                  </section>
                )}

                {step === 4 && (
                  <section aria-label="Order review">
                    <h2 className="font-display text-xl font-semibold text-forest-900 mb-6">Order Review</h2>
                    <div className="rounded-md border border-border divide-y divide-border/60 overflow-hidden">
                      {items.map((i) => (
                        <div key={`${i.product.id}-${i.variant.id}`} className="flex items-center gap-4 p-4">
                          <span className="relative w-14 h-14 rounded-sm overflow-hidden bg-cream shrink-0">
                            <Image src={i.product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-forest-900 truncate">{i.product.name}</p>
                            <p className="text-[11.5px] text-cocoa-400">{i.variant.label} × {i.quantity}</p>
                          </div>
                          <p className="text-[13.5px] font-semibold text-forest-900">{formatINR(i.lineTotal)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 grid sm:grid-cols-2 gap-4 text-[12.5px]">
                      <div className="rounded-md bg-parchment/70 p-4">
                        <p className="eyebrow text-cocoa-400 mb-1.5">Delivering To</p>
                        <p className="font-semibold text-forest-900">{form.fullName}</p>
                        <p className="text-cocoa-500 leading-relaxed mt-1">
                          {form.addressLine}, {form.city}, {form.state} — {form.pincode}
                        </p>
                        <p className="text-cocoa-500 mt-1">{form.phone}</p>
                      </div>
                      <div className="rounded-md bg-parchment/70 p-4">
                        <p className="eyebrow text-cocoa-400 mb-1.5">Paying With</p>
                        <p className="font-semibold text-forest-900">{PAYMENT_METHODS.find((p) => p.id === payment)?.label}</p>
                        <p className="text-cocoa-500 mt-1">{form.email}</p>
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-cocoa-500 hover:text-forest-900 transition-colors">
                  <ChevronLeft size={15} /> Back
                </button>
              ) : (
                <Link href="/cart" className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] uppercase text-cocoa-500 hover:text-forest-900 transition-colors">
                  <ChevronLeft size={15} /> Cart
                </Link>
              )}
              {step < 4 ? (
                <button onClick={next} className="h-12 px-10 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 text-[12px] font-bold tracking-[0.16em] uppercase transition-all hover:shadow-lg">
                  Continue
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="h-12 px-10 rounded-sm bg-gold-500 text-forest-950 hover:bg-gold-400 text-[12px] font-bold tracking-[0.16em] uppercase transition-all hover:shadow-[0_14px_36px_-10px_rgba(192,154,69,0.55)] disabled:opacity-60 inline-flex items-center gap-2"
                >
                  {placing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-forest-950/30 border-t-forest-950 rounded-full animate-spin" />
                      Placing Order…
                    </>
                  ) : (
                    <>Place Order · {formatINR(totals.total)}</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-card rounded-lg border border-border p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-[17px] font-semibold text-forest-900">Order Summary</h2>
            <ul className="mt-4 space-y-3 max-h-52 overflow-y-auto scrollbar-thin pr-1">
              {items.map((i) => (
                <li key={`${i.product.id}-${i.variant.id}`} className="flex items-center gap-3">
                  <span className="relative w-11 h-11 rounded-sm overflow-hidden bg-cream shrink-0">
                    <Image src={i.product.images[0]} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[12px] font-semibold text-forest-900 truncate">{i.product.name}</span>
                    <span className="block text-[10.5px] text-cocoa-400">{i.variant.label} × {i.quantity}</span>
                  </span>
                  <span className="text-[12.5px] font-semibold text-forest-900">{formatINR(i.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 pt-4 border-t border-border space-y-2 text-[13px]">
              <div className="flex justify-between"><dt className="text-cocoa-500">Subtotal</dt><dd className="font-medium">{formatINR(totals.subtotal)}</dd></div>
              {totals.discount > 0 && (
                <div className="flex justify-between"><dt className="text-cocoa-500">Discount</dt><dd className="text-forest-600 font-medium">−{formatINR(totals.discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-cocoa-500">Shipping</dt><dd className="font-medium">{totals.shipping === 0 ? "FREE" : formatINR(totals.shipping)}</dd></div>
              <div className="flex justify-between pt-2.5 border-t border-border text-[15px] font-semibold">
                <dt>Total</dt>
                <dd>{formatINR(totals.total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-[11.5px] font-semibold tracking-wide uppercase text-cocoa-500 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 px-4 rounded-sm border border-border bg-card text-[13.5px] outline-none focus:border-gold-400 transition-colors"
      />
      {hint && <p className="text-[11px] text-cocoa-300 mt-1.5">{hint}</p>}
    </div>
  );
}
