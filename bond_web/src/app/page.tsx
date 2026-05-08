"use client";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import { projects } from "@/lib/projects";

const headingFont = { fontFamily: "var(--font-display)" } as const;
const bodyFont = { fontFamily: "var(--font-body)" } as const;

const HOME_GRID_SLUGS = [
  "canyon-cool",
  "the-back-nine",
  "laurel-creek",
  "fifth-avenue-ranch",
  "the-bridge-house",
  "mountain-cottage-revival",
  "into-the-woods",
  "modern-meadow-remodel",
  "speak-easy-play-hard",
];

export default function HomePage() {
  const tiles = HOME_GRID_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <PageTransition>
      {/* 1. Hero — moody interior + overlay quote */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black">
        <Image
          src="/images/380A5980-Edit-scaled.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-8 right-8 md:top-10 md:right-10 z-10 border border-white/40 px-5 py-2">
          <span
            className="text-white/90 text-[10px] tracking-[0.4em] uppercase font-light"
            style={bodyFont}
          >
            Video Preview
          </span>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <h1
            className="text-white text-2xl md:text-4xl lg:text-5xl font-light italic text-center max-w-4xl leading-[1.4] tracking-[0.02em]"
            style={headingFont}
          >
            &ldquo;Each home tells a unique story&hellip;
            <br />
            shaped by the way you live.&rdquo;
          </h1>
        </div>
      </section>

      {/* 2. Explore Our Projects — 3x3 grid */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span
              className="block text-[10px] tracking-[0.4em] uppercase text-[var(--color-text-accent)] font-light mb-4"
              style={bodyFont}
            >
              Explore Our Projects
            </span>
            <span className="block w-px h-8 bg-[var(--color-text-accent)] mx-auto" />
          </div>
        </ScrollReveal>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {tiles.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.04}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="block group"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--color-linen)]">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-baseline justify-between mt-3 px-1">
                  <span
                    className="text-[11px] tracking-[0.25em] uppercase font-light text-[var(--color-charcoal)]"
                    style={bodyFont}
                  >
                    {p.title}
                  </span>
                  <span
                    className="text-[var(--color-text-accent)] text-xs"
                    style={bodyFont}
                  >
                    →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
