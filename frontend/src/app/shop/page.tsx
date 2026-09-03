import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { PRODUCTS } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Shop Our Collection",
  description:
    "Browse the full NANDINI GHEE collection — traditional bilona A2 ghee, premium dry fruits, curated combos and hand-finished gift hampers. Free shipping above ₹999.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://nandinighee.in" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://nandinighee.in/shop" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PageHeader
        eyebrow="The Collection"
        title="Shop Our Collection"
        description="Ghee churned the old way, dry fruits graded with obsession, and gifts assembled by hand. Take your pick."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <ShopView products={PRODUCTS} />
    </>
  );
}
