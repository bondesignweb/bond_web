"use client";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const posts = [
  { title: "The Art of Layered Lighting in Modern Homes", excerpt: "Discover how ambient, task, and accent lighting work together to create depth, warmth, and visual intrigue in every room.", date: "February 2026", category: "Design Tips", img: "/images/380A6516-Edit-scaled.jpg" },
  { title: "Canyon Cool: A Project Reveal", excerpt: "A behind-the-scenes look at our latest Park City mountain retreat — where contemporary design meets canyon living.", date: "January 2026", category: "Project Reveal", img: "/images/380A5871-Edit-scaled.jpg" },
  { title: "2026 Design Trends", excerpt: "From quiet luxury to textured maximalism — the trends shaping interiors this year and how we're interpreting them.", date: "January 2026", category: "Trends", img: "/images/380A6184-Edit-scaled.jpg" },
  { title: "Selecting the Perfect Stone", excerpt: "A guide to choosing countertop and surface materials that balance beauty, durability, and timeless appeal.", date: "December 2025", category: "Design Tips", img: "/images/Desert-Spanish-Retreat-Kitchen.jpg" },
  { title: "The Bridge House: Before & After", excerpt: "See the dramatic transformation of a 1990s Park City home into a striking contemporary residence.", date: "November 2025", category: "Project Reveal", img: "/images/380A0307-Edit-scaled.jpg" },
  { title: "Why Every New Build Needs a Designer", excerpt: "The earlier you bring in a designer, the more seamless and intentional your home will be.", date: "October 2025", category: "Process", img: "/images/380A4272-Edit-scaled.jpg" },
];

export default function JournalPage() {
  return (
    <PageTransition>
      <section className="pt-36 pb-12 md:pt-48 md:pb-16 px-6 md:px-12 lg:px-20 bg-[var(--color-warm-white)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <span className="section-label block mb-4">From The Studio</span>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-[64px] font-light text-[var(--color-charcoal)] leading-[1.1]">
              Journal
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-16 pb-28">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((p, i) => (
            <ScrollReveal key={p.title} delay={Math.min(i * 0.07, 0.3)}>
              <article className="group cursor-pointer">
                <div className="img-zoom relative aspect-[4/3] overflow-hidden mb-6">
                  <Image src={p.img} alt={p.title} fill className="object-cover" sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-champagne)] font-light" style={{ fontFamily: "var(--font-body)" }}>{p.category}</span>
                  <span className="w-1 h-1 bg-[var(--color-stone-light)] rounded-full" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-stone)] font-light" style={{ fontFamily: "var(--font-body)" }}>{p.date}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl md:text-2xl font-light text-[var(--color-charcoal)] leading-[1.25] mb-3 group-hover:text-[var(--color-champagne)] transition-colors duration-400">{p.title}</h3>
                <p className="text-[var(--color-stone)] text-sm font-light leading-[1.8]" style={{ fontFamily: "var(--font-body)" }}>{p.excerpt}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
