import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteChrome } from "@/components/layout/SiteChrome";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://nandinighee.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NANDINI GHEE — Pure by Tradition | Authentic A2 Bilona Ghee & Premium Dry Fruits",
    template: "%s | NANDINI GHEE",
  },
  description:
    "Authentic Desi Cow A2 Bilona Ghee and handpicked premium dry fruits, inspired by the timeless traditions of Rajasthan. Traditional craftsmanship, quality checked, delivered fresh across India.",
  keywords: [
    "desi cow ghee",
    "A2 ghee",
    "bilona ghee",
    "premium dry fruits",
    "gift hampers India",
    "NANDINI GHEE",
    "organic ghee",
    "almonds cashews online",
  ],
  authors: [{ name: "NANDINI GHEE" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "NANDINI GHEE — Pure by Tradition",
    description:
      "Authentic Desi Cow A2 Bilona Ghee & Premium Dry Fruits, inspired by the timeless traditions of Rajasthan.",
    url: SITE_URL,
    siteName: "NANDINI GHEE",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NANDINI GHEE — Pure by Tradition",
    description:
      "Authentic Desi Cow A2 Bilona Ghee & Premium Dry Fruits from Rajasthan.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f3a2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} antialiased bg-background text-foreground font-sans min-h-screen flex flex-col`}
      >
        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  );
}
