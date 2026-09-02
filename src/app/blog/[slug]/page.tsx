import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Calendar, User } from "lucide-react";
import { BLOG_POSTS, getBlogPost } from "@/lib/data/content";
import { Reveal } from "@/components/shared/Reveal";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }], type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const more = related.length > 0 ? related : BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[44vh] md:h-[52vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/40 to-forest-950/80" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-3xl px-5 md:px-8 pb-10">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-1.5 text-[11.5px]">
                <li><Link href="/" className="text-forest-200/70 hover:text-gold-300">Home</Link></li>
                <li><ChevronRight size={12} className="text-forest-300/60" /></li>
                <li><Link href="/blog" className="text-forest-200/70 hover:text-gold-300">Blog</Link></li>
                <li><ChevronRight size={12} className="text-forest-300/60" /></li>
                <li><span className="text-gold-300 font-medium">{post.category}</span></li>
              </ol>
            </nav>
            <span className="bg-gold-100/90 text-gold-800 text-[10.5px] font-semibold tracking-wider uppercase rounded-full px-3.5 py-1.5">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-[2.7rem] leading-[1.15] font-medium text-ivory mt-4 text-balance">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 mt-5 text-[11.5px] text-forest-100/70">
              <span className="inline-flex items-center gap-1.5"><User size={13} /> {post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 md:px-8 py-14 md:py-16">
        <Reveal>
          <p className="font-display text-[19px] leading-relaxed text-forest-900 border-l-2 border-gold-500 pl-5">
            {post.excerpt}
          </p>
        </Reveal>
        <div className="mt-8 space-y-6">
          {post.content.map((para, i) => (
            <Reveal key={i} delay={Math.min(i * 0.03, 0.15)}>
              <p className="text-[15.5px] leading-[1.85] text-cocoa-600">{para}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 pt-8 border-t border-border/70 flex items-center justify-between flex-wrap gap-4">
            <p className="text-[12.5px] text-cocoa-400">
              Written by <span className="font-semibold text-forest-900">{post.author}</span> · NANDINI GHEE
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 h-11 px-6 rounded-sm bg-forest-800 text-ivory hover:bg-forest-700 text-[11px] font-bold tracking-[0.16em] uppercase transition-colors">
              Shop the Journal&apos;s Ingredients
            </Link>
          </div>
        </Reveal>
      </article>

      {/* Related */}
      <section className="bg-cream/60 texture-grain border-t border-border/60 py-16">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold text-forest-900">Keep Reading</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex gap-5 rounded-lg bg-card border border-border/70 p-4 hover:border-gold-300/60 transition-all">
                <span className="relative w-28 h-28 rounded-md overflow-hidden shrink-0">
                  <Image src={p.image} alt="" fill sizes="112px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </span>
                <span className="min-w-0 py-1">
                  <span className="text-[10px] tracking-wider uppercase text-gold-700 font-semibold">{p.category}</span>
                  <span className="block font-display text-[15.5px] leading-snug font-semibold text-forest-900 mt-1.5 group-hover:text-forest-600 transition-colors line-clamp-2">
                    {p.title}
                  </span>
                  <span className="block text-[11px] text-cocoa-400 mt-1.5">{p.readTime}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
