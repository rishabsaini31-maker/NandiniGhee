"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/user";
import { cn } from "@/lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname();
  const cartCount = useCart((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const { toggleSearch, toggleCart } = useUI();

  const items = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: Grid3X3 },
    { label: "Search", action: toggleSearch, icon: Search },
    { label: "Cart", action: toggleCart, icon: ShoppingBag, badge: cartCount },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-ivory/95 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href && pathname === item.href;
          const inner = (
            <span className="relative flex flex-col items-center justify-center gap-1 h-14 min-h-[44px]">
              <span className="relative">
                <Icon size={20} strokeWidth={active ? 2 : 1.6} className={active ? "text-forest-800" : "text-cocoa-500"} />
                {"badge" in item && item.badge ? (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-terra-500 text-white text-[9px] font-bold flex items-center justify-center px-0.5 animate-badge-pop">
                    {item.badge}
                  </span>
                ) : null}
              </span>
              <span className={cn("text-[9.5px] font-medium tracking-wide uppercase", active ? "text-forest-800" : "text-cocoa-400")}>
                {item.label}
              </span>
            </span>
          );
          return item.href ? (
            <Link key={item.label} href={item.href} aria-label={item.label} className={active ? "bg-parchment/60" : ""}>
              {inner}
            </Link>
          ) : (
            <button key={item.label} onClick={item.action} aria-label={item.label}>
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
