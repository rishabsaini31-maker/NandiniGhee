"use client";

import { Star, StarHalf } from "lucide-react";

export function StarRating({ rating, size = 14, className = "" }: { rating: number; size?: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  return (
    <span className={`inline-flex items-center gap-[1px] ${className}`} aria-label={`Rated ${rating} out of 5`} role="img">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full)
          return <Star key={i} size={size} className="fill-gold-500 text-gold-500" strokeWidth={1} />;
        if (i === full && half)
          return (
            <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
              <Star size={size} className="absolute inset-0 text-gold-300" strokeWidth={1} fill="#ecdcb8" />
              <StarHalf size={size} className="absolute inset-0 fill-gold-500 text-gold-500" strokeWidth={1} />
            </span>
          );
        return <Star key={i} size={size} className="text-gold-300" strokeWidth={1} fill="#ecdcb8" />;
      })}
    </span>
  );
}
