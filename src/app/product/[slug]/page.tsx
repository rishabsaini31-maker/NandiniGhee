import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { PRODUCTS, getProduct } from "@/lib/data/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.variants[0].label}`,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} | NANDINI GHEE`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <div className="pt-24 md:pt-32 pb-4">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-[11.5px] flex-wrap">
              <li><Link href="/" className="text-cocoa-400 hover:text-forest-800 transition-colors">Home</Link></li>
              <li><ChevronRight size={12} className="text-cocoa-300" /></li>
              <li><Link href="/shop" className="text-cocoa-400 hover:text-forest-800 transition-colors">Shop</Link></li>
              <li><ChevronRight size={12} className="text-cocoa-300" /></li>
              <li><Link href={`/shop/${product.category}`} className="text-cocoa-400 hover:text-forest-800 transition-colors capitalize">{product.category.replace("-", " ")}</Link></li>
              <li><ChevronRight size={12} className="text-cocoa-300" /></li>
              <li><span className="text-forest-900 font-medium">{product.name}</span></li>
            </ol>
          </nav>
        </div>
      </div>
      <ProductDetail product={product} />
      <RelatedProducts product={product} />
      <RecentlyViewed excludeId={product.id} />
    </>
  );
}
