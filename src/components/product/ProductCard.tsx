"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { StarRating } from "@/components/shared/StarRating";
import { useWishlist } from "@/lib/store/wishlist";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/user";
import { formatINR, discountPercent } from "@/lib/format";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
  showDescription?: boolean;
}

export function ProductCard({ product, index = 0, showDescription = true }: ProductCardProps) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [heartPop, setHeartPop] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const variant = product.variants[Math.min(variantIdx, product.variants.length - 1)];
  const discount = discountPercent(variant.mrp, variant.price);

  const wishlisted = useWishlist((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const addLine = useCart((s) => s.addLine);
  const setCartOpen = useUI((s) => s.setCartOpen);

  const secondaryImage = product.images[1] ?? product.images[0];

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 500);
    if (!wishlisted) toast({ title: "Added to wishlist", description: product.name });
  };

  const handleAddToCart = (e?: React.MouseEvent, openCart = false) => {
    e?.preventDefault();
    e?.stopPropagation();
    addLine(product.id, variant.id, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} · ${variant.label}`,
    });
    if (openCart) setCartOpen(true);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(undefined, true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-card border border-border/70 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_18px_50px_-18px_rgba(18,33,26,0.25)] hover:border-gold-300/60 hover:-translate-y-1"
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream">
        <AnimatePresence mode="wait">
          <motion.div
            key={hovered ? "alt" : "main"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <Image
              src={hovered ? secondaryImage : product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-transform duration-[900ms] ease-out ${hovered ? "scale-110" : "scale-100"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="bg-forest-800/90 text-ivory text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm backdrop-blur-sm">
              {discount}% OFF
            </span>
          )}
          {product.badges.slice(0, 1).map((b) => (
            <span
              key={b}
              className="bg-gold-100/95 text-gold-700 border border-gold-300 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
          {!product.inStock && (
            <span className="bg-cocoa-800/90 text-ivory text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 max-md:opacity-100"
        >
          <Heart
            size={17}
            className={`${heartPop ? "animate-heart-pop" : ""} transition-colors duration-300 ${
              wishlisted ? "fill-terra-500 text-terra-500" : "text-cocoa-600"
            }`}
            strokeWidth={1.6}
          />
        </button>

        {/* Quick add (desktop hover) */}
        <div className="absolute bottom-3 left-3 right-3 z-10 hidden md:block translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full h-10 bg-forest-800/95 hover:bg-forest-700 text-ivory text-[12px] font-semibold tracking-[0.14em] uppercase rounded-sm flex items-center justify-center gap-2 backdrop-blur-sm transition-colors"
          >
            <Plus size={14} strokeWidth={2} /> Quick Add
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5 gap-2">
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className="text-[11px] text-cocoa-400 font-medium">
            {product.rating} ({product.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className="group/link">
          <h3 className="font-display text-[17px] leading-snug font-semibold text-forest-900 transition-colors group-hover/link:text-forest-600">
            {product.name}
          </h3>
        </Link>

        {showDescription && (
          <p className="text-[12.5px] leading-relaxed text-cocoa-400 line-clamp-2">{product.tagline}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[19px] font-semibold text-forest-900 tracking-tight">{formatINR(variant.price)}</span>
          {variant.mrp > variant.price && (
            <>
              <span className="text-[13px] text-cocoa-300 line-through">{formatINR(variant.mrp)}</span>
              <span className="text-[11px] font-semibold text-terra-500">{discount}% off</span>
            </>
          )}
        </div>

        {/* Weight selector */}
        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5" role="group" aria-label="Select weight">
            {product.variants.map((v, i) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.preventDefault();
                  setVariantIdx(i);
                }}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-sm border transition-all duration-200 ${
                  i === variantIdx
                    ? "border-forest-700 bg-forest-800 text-ivory"
                    : "border-border bg-parchment text-cocoa-500 hover:border-gold-400 hover:text-forest-800"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        {/* Add to cart */}
        <button
          onClick={(e) => handleAddToCart(e)}
          disabled={!product.inStock}
          className="mt-auto pt-3"
        >
          <span
            className={`flex items-center justify-center gap-2 h-10 rounded-sm text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
              product.inStock
                ? "border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-ivory hover:shadow-md"
                : "border border-border text-cocoa-300 cursor-not-allowed"
            }`}
          >
            <ShoppingBag size={14} strokeWidth={1.8} />
            {product.inStock ? "Add to Cart" : "Sold Out"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}
