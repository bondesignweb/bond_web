"use client";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

type Project = {
  slug: string;
  title: string;
  tagline: string;
  story: string;
  description?: string;
  hero: string;
  designer: string;
  location: string;
  scope: string;
  builder: string;
  architect: string;
  images: string[];
};

const headingFont = { fontFamily: "var(--font-display)" } as const;
const bodyFont = { fontFamily: "var(--font-body)" } as const;

export default function ProjectDetailClient({ project }: { project: Project }) {
  const imgs = project.images;
  const row1 = imgs.slice(0, 3);
  const featureImg = imgs[3] || imgs[0];
  const row2 = imgs.slice(4, 8);
  const detailImg = imgs[8] || imgs[1];
  const row3 = imgs.slice(9, 12);

  return (
    <div>
      {/* HERO */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] mt-[72px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={project.hero} alt={project.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="absolute top-8 right-8 md:top-10 md:right-10 z-10 border border-white/40 px-5 py-2">
          <span className="text-white/90 text-[10px] tracking-[0.4em] uppercase font-light" style={bodyFont}>
            Video Preview
          </span>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white text-center tracking-[0.15em] uppercase italic mb-3"
            style={headingFont}
          >
            {project.title}
          </h1>
          <p
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/70 font-light"
            style={bodyFont}
          >
            <span className="block w-8 h-px bg-white/50" />
            Watch the full tour
            <span className="block w-8 h-px bg-white/50" />
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <p
              className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-accent)] font-light mb-6"
              style={bodyFont}
            >
              What&apos;s the story?
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--color-charcoal)] leading-[1.3] uppercase tracking-[0.05em]"
              style={headingFont}
            >
              {project.tagline}
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* 3-IMAGE ROW */}
      {row1.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 pb-6">
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {row1.map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.08}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={img}
                    alt={`${project.title} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* FEATURE IMAGE + STORY TEXT */}
      <section className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <ScrollReveal>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image src={featureImg} alt={project.title} fill className="object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <div className="flex items-center h-full px-4 md:px-10 lg:px-16 py-8">
              <p
                className="text-[var(--color-text-light)] text-sm font-light leading-[1.9]"
                style={bodyFont}
              >
                {project.story}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4-IMAGE ROW */}
      {row2.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 py-6">
          <div className="max-w-[1500px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {row2.map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.06}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={img}
                    alt={`${project.title} - ${i + 5}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* PROJECT DETAILS + IMAGE */}
      <section className="px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <ScrollReveal>
            <div className="flex items-center h-full py-8 px-4 md:px-10 lg:px-16">
              <div className="space-y-6">
                {[
                  { label: "Designer", value: project.designer },
                  { label: "Location", value: project.location },
                  { label: "Design Scope", value: project.scope },
                  { label: "Builder", value: project.builder },
                  { label: "Architect", value: project.architect },
                ].map((item) => (
                  <div key={item.label} className="text-right">
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-charcoal)] font-medium mb-1"
                      style={bodyFont}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-light)] font-light"
                      style={bodyFont}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image src={detailImg} alt={`${project.title} detail`} fill className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3-IMAGE ROW (bottom) */}
      {row3.length > 0 && (
        <section className="px-4 md:px-8 lg:px-12 py-6 pb-16">
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {row3.map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.08}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={img}
                    alt={`${project.title} - ${i + 10}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* BACK */}
      <section className="py-12 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--color-charcoal)] font-light hover:text-[var(--color-text-accent)] transition-colors"
          style={bodyFont}
        >
          <span className="block w-8 h-px bg-current" />
          Back to Portfolio
        </Link>
      </section>
    </div>
  );
}
