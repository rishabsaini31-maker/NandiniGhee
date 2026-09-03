"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Bell, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";
import { useNotifications } from "@/lib/store/notifications";
import { useUI } from "@/lib/store/user";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Ghee", href: "/shop/ghee" },
  { label: "Dry Fruits", href: "/shop/dry-fruits" },
  { label: "Gift Hampers", href: "/shop/gift-hampers" },
  { label: "About Us", href: "/about" },
];

const SHOP_DROPDOWN = [
  { label: "All Products", href: "/shop", desc: "Browse the full collection" },
  { label: "Ghee", href: "/shop/ghee", desc: "Bilona A2 & cultured ghee" },
  { label: "Dry Fruits", href: "/shop/dry-fruits", desc: "Almonds to anjeer" },
  { label: "Combos", href: "/shop/combos", desc: "Curated everyday value" },
  { label: "Gift Hampers", href: "/shop/gift-hampers", desc: "Thoughtful gifting" },
  { label: "Bestsellers", href: "/shop?sort=bestselling", desc: "Customer favourites" },
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const cartCount = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const wishlistCount = useWishlist((s) => s.ids.length);
  const unread = useNotifications((s) => s.notifications.filter((n) => !n.read).length);
  const { toggleCart, toggleSearch, toggleNotif, toggleMobileMenu, mobileMenuOpen } = useUI();

  const isHome = pathname === "/";
  // Transparent over hero on homepage top, solid after scroll or on other pages
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          transparent ? "bg-transparent" : "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(228,219,198,1)]"
        )}
      >
        {/* Announcement bar — hides on scroll */}
        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.div
              initial={{ height: 34, opacity: 1 }}
              animate={{ height: 34, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden bg-forest-900 text-ivory"
            >
              <div className="h-[34px] flex items-center justify-center px-4">
                <p className="text-[10.5px] md:text-[11px] tracking-[0.18em] uppercase text-gold-200">
                  Free shipping on orders above ₹999 · Hand-written notes on all hampers
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav
          className={cn(
            "mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between transition-all duration-500",
            scrolled ? "h-[60px]" : "h-[72px] md:h-[84px]"
          )}
          aria-label="Main navigation"
        >
          {/* Left — logo */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="NANDINI GHEE home">
            <Logo dark={!transparent} className="transition-all duration-500" />
          </Link>

          {/* Center — links (desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              if (link.label === "Shop") {
                return (
                  <div key={link.label} className="relative group">
                    <Link
                      href={link.href}
                      className={cn(
                        "px-3.5 py-2 text-[12.5px] font-medium tracking-[0.12em] uppercase transition-colors flex items-center gap-1",
                        transparent ? "text-ivory/90 hover:text-gold-300" : "text-cocoa-700 hover:text-forest-700",
                        active && (transparent ? "text-gold-300" : "text-forest-800")
                      )}
                    >
                      Shop <ChevronDown size={13} className="transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                      <div className="w-72 bg-card border border-border rounded-md shadow-[0_24px_60px_-16px_rgba(18,33,26,0.28)] p-2">
                        {SHOP_DROPDOWN.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 rounded-sm hover:bg-parchment transition-colors"
                          >
                            <span className="block text-[13px] font-semibold text-forest-900">{item.label}</span>
                            <span className="block text-[11.5px] text-cocoa-400">{item.desc}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-[12.5px] font-medium tracking-[0.12em] uppercase transition-colors",
                    transparent ? "text-ivory/90 hover:text-gold-300" : "text-cocoa-700 hover:text-forest-700",
                    active && (transparent ? "text-gold-300" : "text-forest-800")
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-gold-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-0.5 md:gap-1">
            <IconButton label="Search" onClick={toggleSearch} transparent={transparent}>
              <Search size={19} strokeWidth={1.7} />
            </IconButton>

            <Link href="/wishlist" aria-label="Wishlist" className="hidden md:block">
              <IconButton label="Wishlist" transparent={transparent} asDiv>
                <span className="relative">
                  <Heart size={19} strokeWidth={1.7} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] rounded-full bg-terra-500 text-white text-[9px] font-bold flex items-center justify-center px-0.5 animate-badge-pop">
                      {wishlistCount}
                    </span>
                  )}
                </span>
              </IconButton>
            </Link>

            <IconButton label="Notifications" onClick={toggleNotif} transparent={transparent} className="hidden md:flex">
              <span className="relative">
                <Bell size={19} strokeWidth={1.7} />
                {unread > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] rounded-full bg-terra-500 text-white text-[9px] font-bold flex items-center justify-center px-0.5 animate-badge-pop">
                    {unread}
                  </span>
                )}
              </span>
            </IconButton>

            <Link href="/account" aria-label="Account" className="hidden md:block">
              <IconButton label="Account" transparent={transparent} asDiv>
                <User size={19} strokeWidth={1.7} />
              </IconButton>
            </Link>

            <IconButton label="Cart" onClick={toggleCart} transparent={transparent}>
              <span className="relative">
                <ShoppingBag size={19} strokeWidth={1.7} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] rounded-full bg-terra-500 text-white text-[9px] font-bold flex items-center justify-center px-0.5 animate-badge-pop">
                    {cartCount}
                  </span>
                )}
              </span>
            </IconButton>

            <IconButton label="Menu" onClick={toggleMobileMenu} transparent={transparent} className="lg:hidden">
              {mobileMenuOpen ? <X size={20} strokeWidth={1.7} /> : <Menu size={20} strokeWidth={1.7} />}
            </IconButton>
          </div>
        </nav>
      </header>

      <MobileMenu />
    </>
  );
}

function IconButton({
  children,
  label,
  onClick,
  transparent,
  asDiv = false,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  transparent?: boolean;
  asDiv?: boolean;
  className?: string;
}) {
  const Comp: React.ElementType = asDiv ? "div" : "button";
  const props = asDiv ? { "aria-label": label } : { "aria-label": label, onClick };
  return (
    <Comp
      {...props}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105",
        transparent ? "text-ivory hover:bg-white/10" : "text-cocoa-700 hover:bg-forest-50 hover:text-forest-800",
        className
      )}
    >
      {children}
    </Comp>
  );
}

