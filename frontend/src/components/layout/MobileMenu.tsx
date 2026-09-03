"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bell, User, ChevronRight } from "lucide-react";
import { useUI } from "@/lib/store/user";
import { useWishlist } from "@/lib/store/wishlist";
import { useNotifications } from "@/lib/store/notifications";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Ghee", href: "/shop/ghee" },
  { label: "Dry Fruits", href: "/shop/dry-fruits" },
  { label: "Gift Hampers", href: "/shop/gift-hampers" },
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Track Order", href: "/track-order" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUI();
  const pathname = usePathname();
  const wishlistCount = useWishlist((s) => s.ids.length);
  const unread = useNotifications((s) => s.notifications.filter((n) => !n.read).length);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-forest-950/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-[70] w-[85vw] max-w-[360px] bg-ivory shadow-2xl flex flex-col"
            aria-label="Mobile menu"
          >
            <div className="flex items-center justify-between px-6 h-[76px] border-b border-border">
              <span className="font-display text-xl font-semibold tracking-[0.08em] text-forest-900">NANDINI</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-full flex items-center justify-center text-cocoa-600 hover:bg-parchment"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4" aria-label="Mobile navigation">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-sm text-[15px] font-medium transition-colors ${
                      pathname === link.href ? "bg-parchment text-forest-800" : "text-cocoa-700 hover:bg-parchment"
                    }`}
                  >
                    {link.label}
                    <ChevronRight size={16} className="text-cocoa-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-border p-4 grid grid-cols-3 gap-2">
              <Link href="/wishlist" className="flex flex-col items-center gap-1.5 py-3 rounded-sm bg-parchment text-cocoa-700 text-[11px] font-medium">
                <span className="relative">
                  <Heart size={20} strokeWidth={1.6} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-terra-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </span>
                Wishlist
              </Link>
              <Link href="/account" className="flex flex-col items-center gap-1.5 py-3 rounded-sm bg-parchment text-cocoa-700 text-[11px] font-medium">
                <span className="relative">
                  <Bell size={20} strokeWidth={1.6} />
                  {unread > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-terra-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {unread}
                    </span>
                  )}
                </span>
                Alerts
              </Link>
              <Link href="/account" className="flex flex-col items-center gap-1.5 py-3 rounded-sm bg-parchment text-cocoa-700 text-[11px] font-medium">
                <User size={20} strokeWidth={1.6} />
                Account
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
