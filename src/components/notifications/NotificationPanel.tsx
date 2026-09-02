"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Package, Tag, Sparkles, HeartHandshake, UserCircle, CheckCheck, Trash2 } from "lucide-react";
import { useNotifications } from "@/lib/store/notifications";
import { useUI } from "@/lib/store/user";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<string, { icon: React.ElementType; className: string }> = {
  order: { icon: Package, className: "bg-forest-50 text-forest-700" },
  offer: { icon: Tag, className: "bg-terra-100 text-terra-600" },
  stock: { icon: Sparkles, className: "bg-gold-100 text-gold-700" },
  wishlist: { icon: HeartHandshake, className: "bg-terra-100 text-terra-600" },
  account: { icon: UserCircle, className: "bg-forest-50 text-forest-700" },
  product: { icon: Sparkles, className: "bg-gold-100 text-gold-700" },
};

export function NotificationPanel() {
  const { notifOpen, setNotifOpen } = useUI();
  const { notifications, markRead, markAllRead, clearAll } = useNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (notifOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [notifOpen]);

  return (
    <AnimatePresence>
      {notifOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-forest-950/40 backdrop-blur-[2px]"
            onClick={() => setNotifOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-[400px] bg-card shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between px-5 h-[68px] border-b border-border shrink-0">
              <h2 className="font-display text-lg font-semibold text-forest-900 flex items-center gap-2">
                <Bell size={17} strokeWidth={1.8} />
                Notifications
                {unread > 0 && (
                  <span className="text-[11px] font-sans font-semibold bg-terra-500 text-white rounded-full px-2 py-0.5">
                    {unread} new
                  </span>
                )}
              </h2>
              <button
                onClick={() => setNotifOpen(false)}
                aria-label="Close notifications"
                className="w-9 h-9 rounded-full flex items-center justify-center text-cocoa-600 hover:bg-parchment transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {notifications.length > 0 && (
              <div className="flex items-center justify-between px-5 py-2.5 border-b border-border/70 shrink-0">
                <button
                  onClick={markAllRead}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-forest-700 hover:text-forest-500 transition-colors"
                >
                  <CheckCheck size={13} /> Mark all as read
                </button>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-cocoa-400 hover:text-terra-500 transition-colors"
                >
                  <Trash2 size={12} /> Clear all
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-8">
                  <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center">
                    <Bell size={24} className="text-cocoa-300" strokeWidth={1.4} />
                  </div>
                  <p className="text-[13.5px] text-cocoa-400">You&apos;re all caught up. No notifications right now.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border/60">
                  {notifications.map((n, i) => {
                    const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.product;
                    const Icon = cfg.icon;
                    return (
                      <motion.li
                        key={n.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={n.href ?? "/account"}
                          onClick={() => markRead(n.id)}
                          className={cn(
                            "flex gap-3.5 px-5 py-4 hover:bg-parchment/70 transition-colors relative",
                            !n.read && "bg-gold-50/50"
                          )}
                        >
                          <span className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5", cfg.className)}>
                            <Icon size={16} strokeWidth={1.7} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className={cn("block text-[13.5px] leading-snug text-forest-900", !n.read ? "font-semibold" : "font-medium")}>
                              {n.title}
                            </span>
                            <span className="block text-[12px] text-cocoa-400 leading-relaxed mt-1">{n.body}</span>
                            <span className="block text-[10.5px] text-cocoa-300 mt-1.5 uppercase tracking-wider">{n.timestamp}</span>
                          </span>
                          {!n.read && (
                            <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold-500" aria-label="unread" />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-border px-5 py-3.5 shrink-0">
              <Link
                href="/account?tab=notifications"
                onClick={() => setNotifOpen(false)}
                className="block text-center text-[11.5px] font-semibold tracking-[0.14em] uppercase text-forest-800 hover:text-forest-500 transition-colors"
              >
                View all in account
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
