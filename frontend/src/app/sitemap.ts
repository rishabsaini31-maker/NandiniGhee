import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/data/products";
import { BLOG_POSTS } from "@/lib/data/content";

const BASE = "https://nandinighee.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/shop", "/shop/ghee", "/shop/dry-fruits", "/shop/combos", "/shop/gift-hampers",
    "/about", "/process", "/quality", "/contact", "/faq", "/blog", "/success-stories",
    "/track-order", "/privacy-policy", "/terms-and-conditions", "/security", "/dpa", "/nda",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
