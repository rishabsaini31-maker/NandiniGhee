import Link from "next/link";
import { LogoMark } from "@/components/shared/Logo";
import { ExternalLink, ShieldCheck, Lock } from "lucide-react";

const SHOP_LINKS = [
  { label: "Ghee", href: "/shop/ghee" },
  { label: "Dry Fruits", href: "/shop/dry-fruits" },
  { label: "Combos", href: "/shop/combos" },
  { label: "Gift Hampers", href: "/shop/gift-hampers" },
  { label: "Bestsellers", href: "/shop?sort=bestselling" },
  { label: "New Arrivals", href: "/shop?tag=new" },
];

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "Help & Support", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Security", href: "/security" },
  { label: "Data Processing Agreement (DPA)", href: "/dpa" },
  { label: "Non-Disclosure Agreement (NDA)", href: "/nda" },
];

const CONNECT_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", external: true },
  { label: "WhatsApp", href: "https://wa.me/919820012345", external: true },
  { label: "Instagram", href: "https://www.instagram.com", external: true },
  { label: "Facebook", href: "https://www.facebook.com", external: true },
];

const PAYMENT_METHODS = ["UPI", "VISA", "Mastercard", "RuPay", "Cash on Delivery"];

export function Footer() {
  return (
    <footer className="mt-auto bg-forest-950 text-forest-100 texture-grain relative" aria-label="Site footer">
      <div className="gold-hairline" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-28 lg:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div>
                <p className="font-display text-xl font-semibold tracking-[0.06em] text-ivory">NANDINI</p>
                <p className="text-[8.5px] font-sans tracking-[0.42em] uppercase text-gold-400 mt-0.5">Ghee</p>
              </div>
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-forest-200/70 max-w-xs">
              Pure by Tradition. Authentic A2 bilona ghee and handpicked premium dry fruits, inspired by the timeless
              traditions of Rajasthan — delivered fresh across India.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11px] text-forest-200/60">
              <ShieldCheck size={14} className="text-gold-400" />
              <span>FSSAI Lic. No. 12226998000123</span>
            </div>
          </div>

          {/* Shop */}
          <FooterCol title="Shop" links={SHOP_LINKS} className="lg:col-span-2" />
          {/* Company */}
          <FooterCol title="Company & Support" links={COMPANY_LINKS} className="lg:col-span-2" />
          {/* Legal */}
          <FooterCol title="Legal" links={LEGAL_LINKS} className="lg:col-span-2" />

          {/* Connect */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <h3 className="eyebrow text-gold-400 mb-5">Connect</h3>
            <ul className="space-y-3">
              {CONNECT_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] text-forest-200/80 hover:text-gold-300 transition-colors group"
                  >
                    <SocialIcon name={l.label} />
                    {l.label}
                    <ExternalLink size={11} className="opacity-40 group-hover:opacity-80 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-md bg-forest-900/80 border border-forest-800">
              <div className="flex items-center gap-2 text-gold-300">
                <Lock size={13} />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase">Secure Payments</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {PAYMENT_METHODS.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] font-semibold tracking-wide text-forest-200/80 bg-forest-800 border border-forest-700 rounded-sm px-2 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-forest-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11.5px] text-forest-200/50 text-center md:text-left">
            © 2026 NANDINI GHEE. All Rights Reserved.
          </p>
          <p className="text-[10.5px] tracking-[0.3em] uppercase text-gold-400/80">Pure by Tradition.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = "" }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h3 className="eyebrow text-gold-400 mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-[13px] text-forest-200/80 hover:text-gold-300 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ name }: { name: string }) {
  const cls = "w-4 h-4";
  switch (name) {
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
        </svg>
      );
    case "WhatsApp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.89 9.88zm8.42-18.29A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.48-8.4z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
        </svg>
      );
    default:
      return null;
  }
}
