"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        ref={frameRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-square overflow-hidden rounded-lg bg-cream cursor-zoom-in hidden md:block"
        aria-label="Product image with zoom on hover"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} — image ${active + 1}`}
              fill
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-200"
              style={zoom ? { transform: "scale(1.9)", transformOrigin: `${origin.x}% ${origin.y}%` } : undefined}
            />
          </motion.div>
        </AnimatePresence>
        <span className="absolute bottom-4 right-4 bg-forest-950/60 backdrop-blur-sm text-ivory text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full">
          Hover to zoom
        </span>
      </div>

      {/* Mobile main image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-cream md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image src={images[active]} alt={`${name} — image ${active + 1}`} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={active === i}
              aria-label={`View image ${i + 1}`}
              className={`relative w-18 h-18 w-[72px] h-[72px] shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                active === i ? "border-gold-500" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
