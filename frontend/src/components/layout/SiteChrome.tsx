"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckout = pathname.startsWith("/checkout");

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Overlays */}
      <CartDrawer />
      <SearchModal />
      <NotificationPanel />
      {/* Mobile sticky bottom nav (hidden on checkout for distraction-free flow) */}
      {!isCheckout && <MobileBottomBar />}
    </>
  );
}
