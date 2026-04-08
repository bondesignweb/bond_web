"use client";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import { projects } from "@/lib/projects";

export default function PortfolioPage() {
  return (
    <PageTransition>
      <section className="pt-36 pb-12 md:pt-48 md:pb-16 px-6 md:px-12 lg:px-20 bg-[var(--color-warm-white)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <ScrollReveal>
            <span className="section-label block mb-4">Our Work</span>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-[64px] font-light text-[var(--color-charcoal)] leading-[1.1]">
              Portfolio
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-16 pb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={Math.min(i * 0.04, 0.25)}>
              <Link href={`/portfolio/${p.slug}`} className="group block cursor-pointer">
                <div className="img-zoom relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image src={p.img} alt={p.title} fill className="object-cover" sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw" />
                  <div className="portfolio-card-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-champagne-light)] font-light block mb-1.5" style={{ fontFamily: "var(--font-body)" }}>{p.category} &middot; {p.location}</span>
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl md:text-2xl font-light text-white">{p.title}</h3>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
