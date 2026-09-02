import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/shared/Reveal";
import { BLOG_POSTS } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Journal — Ghee, Dry Fruits & Indian Food Traditions",
  description:
    "Essays on bilona ghee, dry fruit grades, winter recipes, Ayurvedic traditions and the people behind NANDINI. Written by our kitchen, not a marketing machine.",
  alternates: { canonical: "/blog" },
};

const CATEGORIES = ["All", "Ghee", "Dry Fruits", "Recipes", "Indian Traditions", "Wellness", "Behind the Brand"];

export default function BlogPage() {
  const posts = BLOG_POSTS;
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="The NANDINI Journal"
        title="Stories Worth Simmering"
        description="Craft explainers, honest nutrition, winter recipes and notes from our farms — written slowly, like our ghee."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20">
        {/* Featured */}
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-2 gap-8 items-center rounded-xl overflow-hidden bg-card border border-border/70 hover:border-gold-300/60 transition-all duration-500"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </div>
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-3 text-[11px]">
                <span className="bg-gold-100 text-gold-700 border border-gold-300 rounded-full px-3 py-1 font-semibold tracking-wide uppercase">{featured.category}</span>
                <span className="text-cocoa-400">{featured.readTime}</span>
              </div>
              <h2 className="font-display text-2xl md:text-[2rem] leading-[1.18] font-medium text-forest-900 mt-4 text-balance group-hover:text-forest-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-[13.5px] leading-relaxed text-cocoa-500 mt-3 line-clamp-3">{featured.excerpt}</p>
              <p className="mt-6 inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase text-gold-700">
                Read More <ArrowUpRight size={14} />
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Category chips */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full border border-border text-[12px] font-medium text-cocoa-500">
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-lg overflow-hidden bg-card border border-border/70 hover:border-gold-300/60 hover:shadow-[0_18px_50px_-20px_rgba(18,33,26,0.25)] transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1100ms] group-hover:scale-107"
                  />
                  <span className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm text-forest-900 text-[10px] font-semibold tracking-wider uppercase rounded-full px-3 py-1">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[11px] text-cocoa-400">
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {post.readTime}
                  </p>
                  <h3 className="font-display text-[19px] leading-snug font-semibold text-forest-900 mt-2.5 group-hover:text-forest-600 transition-colors text-balance">
                    {post.title}
                  </h3>
                  <p className="text-[12.5px] leading-relaxed text-cocoa-500 mt-2.5 line-clamp-3">{post.excerpt}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase text-gold-700">
                    Read More <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
