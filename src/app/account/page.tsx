"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, Heart, MapPin, Bell, UserCircle, ShieldCheck, LogOut, Plus, Trash2, CheckCheck, Truck,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useUser, Address } from "@/lib/store/user";
import { useWishlist } from "@/lib/store/wishlist";
import { useNotifications } from "@/lib/store/notifications";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { OrderRecord } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "security", label: "Security", icon: ShieldCheck },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AccountInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabState, setTab] = useState<TabId | null>(null);
  const { user, logout, orders, addresses, removeAddress, setDefaultAddress } = useUser();
  const wishlistIds = useWishlist((s) => s.ids);
  const { notifications, markAllRead, clearAll } = useNotifications();
  const mounted = useHasMounted();

  const tab: TabId = tabState ?? (TABS.some((t) => t.id === searchParams.get("tab")) ? (searchParams.get("tab") as TabId) : "overview");

  if (!mounted) return null;

  const wishlistProducts = wishlistIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      <PageHeader
        eyebrow={`Welcome back, ${user.name || "Friend"}`}
        title="My Account"
        description="Orders, wishlist, addresses and preferences — everything in one calm place."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Account" }]}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14">
        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-10">
          {/* Sidebar */}
          <aside className="mb-8 lg:mb-0" aria-label="Account sections">
            <div className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar pb-2 lg:pb-0 lg:sticky lg:top-28">
              {TABS.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-sm text-[13px] font-medium whitespace-nowrap transition-colors min-h-[44px]",
                      tab === t.id ? "bg-forest-800 text-ivory" : "text-cocoa-600 hover:bg-parchment"
                    )}
                  >
                    <Icon size={16} strokeWidth={1.7} />
                    {t.label}
                    {t.id === "notifications" && unread > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-terra-500 text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-sm text-[13px] font-medium text-terra-600 hover:bg-terra-100 transition-colors min-h-[44px]"
              >
                <LogOut size={16} strokeWidth={1.7} /> Logout
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "overview" && <Overview orders={orders} wishlistCount={wishlistIds.length} unread={unread} onGo={setTab} />}
                {tab === "orders" && <Orders orders={orders} />}
                {tab === "wishlist" && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-forest-900 mb-8">My Wishlist</h2>
                    {wishlistProducts.length === 0 ? (
                      <EmptyState icon={<Heart size={26} className="text-cocoa-300" />} text="Nothing saved yet. Tap the heart on products you love." cta={{ label: "Browse Shop", href: "/shop" }} />
                    ) : (
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                        {wishlistProducts.map((p, i) => (
                          <ProductCard key={p.id} product={p} index={i} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {tab === "addresses" && (
                  <Addresses addresses={addresses} onRemove={removeAddress} onSetDefault={setDefaultAddress} />
                )}
                {tab === "notifications" && (
                  <div>
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                      <h2 className="font-display text-2xl font-semibold text-forest-900">Notifications</h2>
                      <div className="flex gap-2">
                        <button onClick={markAllRead} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-forest-700 border border-border rounded-sm px-3 py-2 hover:bg-parchment transition-colors">
                          <CheckCheck size={13} /> Mark all read
                        </button>
                        <button onClick={clearAll} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-terra-600 border border-border rounded-sm px-3 py-2 hover:bg-terra-100 transition-colors">
                          <Trash2 size={12} /> Clear all
                        </button>
                      </div>
                    </div>
                    {notifications.length === 0 ? (
                      <EmptyState icon={<Bell size={26} className="text-cocoa-300" />} text="No notifications. When we have news, it lands here." />
                    ) : (
                      <ul className="space-y-3">
                        {notifications.map((n) => (
                          <li key={n.id} className={cn("rounded-md border p-4 flex gap-3.5", n.read ? "border-border bg-card" : "border-gold-300/60 bg-gold-50/50")}>
                            <span className="w-2 h-2 rounded-full bg-gold-500 mt-2 shrink-0" style={{ opacity: n.read ? 0.2 : 1 }} />
                            <div>
                              <p className="text-[13.5px] font-semibold text-forest-900">{n.title}</p>
                              <p className="text-[12.5px] text-cocoa-500 mt-1 leading-relaxed">{n.body}</p>
                              <p className="text-[10.5px] text-cocoa-300 uppercase tracking-wider mt-2">{n.timestamp}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {tab === "profile" && <Profile />}
                {tab === "security" && <Security />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Sections ── */
function Overview({ orders, wishlistCount, unread, onGo }: { orders: OrderRecord[]; wishlistCount: number; unread: number; onGo: (t: TabId) => void }) {
  const stats = [
    { label: "Orders Placed", value: orders.length, tab: "orders" as TabId },
    { label: "Wishlist Items", value: wishlistCount, tab: "wishlist" as TabId },
    { label: "Unread Alerts", value: unread, tab: "notifications" as TabId },
  ];
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-forest-900">Dashboard</h2>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <button key={s.label} onClick={() => onGo(s.tab)} className="rounded-md border border-border bg-card p-5 text-left hover:border-gold-400 transition-colors">
            <p className="font-display text-4xl font-semibold text-forest-900">{s.value}</p>
            <p className="text-[12px] text-cocoa-400 mt-1 uppercase tracking-wide">{s.label}</p>
          </button>
        ))}
      </div>
      <h3 className="font-display text-lg font-semibold text-forest-900 mt-10 mb-4">Recent Order</h3>
      {orders.length === 0 ? (
        <EmptyState icon={<Package size={26} className="text-cocoa-300" />} text="No orders yet. Your first jar of golden goodness awaits." cta={{ label: "Shop Now", href: "/shop" }} />
      ) : (
        <div className="rounded-md border border-border bg-card p-5 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[13.5px] font-semibold text-forest-900">{orders[0].orderNumber}</p>
            <p className="text-[12px] text-cocoa-400 mt-0.5">
              {orders[0].items.length} items · {formatINR(orders[0].total)} · {orders[0].status}
            </p>
          </div>
          <Link href="/track-order" className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.12em] uppercase text-forest-800 hover:text-gold-700">
            <Truck size={14} /> Track
          </Link>
        </div>
      )}
    </div>
  );
}

function Orders({ orders }: { orders: OrderRecord[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-forest-900 mb-8">My Orders</h2>
      {orders.length === 0 ? (
        <EmptyState icon={<Package size={26} className="text-cocoa-300" />} text="No orders yet. Place your first order to see it here." cta={{ label: "Start Shopping", href: "/shop" }} />
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="rounded-md border border-border bg-card p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[13.5px] font-semibold text-forest-900">{o.orderNumber}</p>
                  <p className="text-[11.5px] text-cocoa-400 mt-0.5">
                    {new Date(o.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {o.paymentMethod}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[10px] font-bold tracking-[0.12em] uppercase rounded-full px-3 py-1.5",
                    o.status === "Delivered" ? "bg-forest-50 text-forest-700 border border-forest-100" : "bg-gold-50 text-gold-700 border border-gold-200"
                  )}>
                    {o.status}
                  </span>
                  <span className="text-[14px] font-semibold text-forest-900">{formatINR(o.total)}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                {o.items.map((i, idx) => (
                  <span key={idx} className="text-[11px] bg-parchment rounded-full px-2.5 py-1 text-cocoa-600">
                    {i.name} × {i.quantity}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Addresses({ addresses, onRemove, onSetDefault }: { addresses: Address[]; onRemove: (id: string) => void; onSetDefault: (id: string) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl font-semibold text-forest-900">Saved Addresses</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((a) => (
          <div key={a.id} className={cn("rounded-md border p-5", a.isDefault ? "border-forest-700 bg-forest-50/50" : "border-border bg-card")}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold-700">{a.label}</span>
              {a.isDefault && <span className="text-[9.5px] font-bold tracking-wider uppercase bg-forest-800 text-ivory rounded-full px-2.5 py-1">Default</span>}
            </div>
            <p className="text-[13.5px] font-semibold text-forest-900 mt-3">{a.fullName}</p>
            <p className="text-[12.5px] text-cocoa-500 leading-relaxed mt-1">
              {a.line1}, {a.city}, {a.state} — {a.pincode}
            </p>
            <p className="text-[12px] text-cocoa-400 mt-1">{a.phone}</p>
            <div className="mt-4 flex gap-4">
              {!a.isDefault && (
                <button onClick={() => onSetDefault(a.id)} className="text-[11.5px] font-semibold text-forest-700 hover:text-forest-900">
                  Set as default
                </button>
              )}
              <button onClick={() => onRemove(a.id)} className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-terra-600 hover:text-terra-500">
                <Trash2 size={12} /> Remove
              </button>
            </div>
          </div>
        ))}
        <button className="rounded-md border border-dashed border-cocoa-300 p-5 flex flex-col items-center justify-center gap-2 text-cocoa-400 hover:border-gold-400 hover:text-forest-800 transition-colors min-h-[160px]">
          <Plus size={22} strokeWidth={1.6} />
          <span className="text-[12px] font-medium">Add a new address</span>
        </button>
      </div>
    </div>
  );
}

function Profile() {
  const user = useUser((s) => s.user);
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-forest-900 mb-8">Profile</h2>
      <div className="rounded-md border border-border bg-card p-6 md:p-8 max-w-xl">
        <div className="flex items-center gap-5">
          <span className="w-16 h-16 rounded-full bg-forest-800 text-gold-300 font-display text-2xl font-semibold flex items-center justify-center">
            {(user.name || "N").charAt(0)}
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-forest-900">{user.name || "NANDINI Member"}</p>
            <p className="text-[12.5px] text-cocoa-400 mt-0.5">Member since 2026</p>
          </div>
        </div>
        <dl className="mt-8 space-y-4 text-[13.5px]">
          <div className="flex justify-between border-b border-border/60 pb-3">
            <dt className="text-cocoa-500">Email</dt>
            <dd className="font-medium text-forest-900">{user.email || "—"}</dd>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-3">
            <dt className="text-cocoa-500">Mobile</dt>
            <dd className="font-medium text-forest-900">{user.phone || "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cocoa-500">Status</dt>
            <dd className="font-medium text-forest-700">Active member</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function Security() {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-forest-900 mb-8">Security</h2>
      <div className="space-y-4 max-w-xl">
        <div className="rounded-md border border-border bg-card p-5 flex items-start gap-4">
          <ShieldCheck size={20} className="text-forest-700 mt-0.5" />
          <div>
            <p className="text-[13.5px] font-semibold text-forest-900">Two-factor authentication</p>
            <p className="text-[12.5px] text-cocoa-500 mt-1">OTP verification is enabled by default on every login via mobile.</p>
          </div>
          <span className="ml-auto text-[10px] font-bold tracking-wider uppercase bg-forest-50 text-forest-700 border border-forest-100 rounded-full px-2.5 py-1">On</span>
        </div>
        <div className="rounded-md border border-border bg-card p-5 flex items-start gap-4">
          <ShieldCheck size={20} className="text-forest-700 mt-0.5" />
          <div>
            <p className="text-[13.5px] font-semibold text-forest-900">Login alerts</p>
            <p className="text-[12.5px] text-cocoa-500 mt-1">We email you whenever a new device signs into your account.</p>
          </div>
          <span className="ml-auto text-[10px] font-bold tracking-wider uppercase bg-forest-50 text-forest-700 border border-forest-100 rounded-full px-2.5 py-1">On</span>
        </div>
        <div className="rounded-md border border-border bg-card p-5 flex items-start gap-4">
          <ShieldCheck size={20} className="text-forest-700 mt-0.5" />
          <div>
            <p className="text-[13.5px] font-semibold text-forest-900">Data & privacy</p>
            <p className="text-[12.5px] text-cocoa-500 mt-1">
              Read how we handle your data in our{" "}
              <Link href="/privacy-policy" className="text-forest-800 underline decoration-gold-400 underline-offset-2">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/security" className="text-forest-800 underline decoration-gold-400 underline-offset-2">
                Security
              </Link>{" "}
              pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text, cta }: { icon: React.ReactNode; text: string; cta?: { label: string; href: string } }) {
  return (
    <div className="text-center py-16 rounded-md border border-dashed border-border">
      <span className="inline-flex w-16 h-16 rounded-full bg-parchment items-center justify-center">{icon}</span>
      <p className="text-[13.5px] text-cocoa-400 mt-5 max-w-xs mx-auto leading-relaxed">{text}</p>
      {cta && (
        <Link href={cta.href} className="mt-6 inline-flex h-11 px-8 items-center rounded-sm bg-forest-800 text-ivory text-[11.5px] font-semibold tracking-[0.14em] uppercase hover:bg-forest-700 transition-colors">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense>
      <AccountInner />
    </Suspense>
  );
}
