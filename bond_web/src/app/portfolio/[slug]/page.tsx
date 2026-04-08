"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import { projects } from "@/lib/projects";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="pt-48 pb-32 text-center">
        <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl font-light text-[var(--color-charcoal)]">
          Project Not Found
        </h1>
        <Link href="/portfolio" className="mt-8 btn-luxury text-[var(--color-charcoal)] inline-flex">
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Hero Image */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image src={project.img} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-midnight)]/70 via-transparent to-[var(--color-midnight)]/20" />
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <span className="section-label block mb-4 text-[var(--color-champagne-light)]">{project.category}</span>
              <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-6xl lg:text-[72px] font-light text-white leading-[1.05]">
                {project.title}
              </h1>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-16">
          <ScrollReveal>
            <div className="space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-champagne)] font-light block mb-2" style={{ fontFamily: "var(--font-body)" }}>Location</span>
                <p className="text-[var(--color-charcoal)] text-sm font-light" style={{ fontFamily: "var(--font-body)" }}>{project.location}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-champagne)] font-light block mb-2" style={{ fontFamily: "var(--font-body)" }}>Year</span>
                <p className="text-[var(--color-charcoal)] text-sm font-light" style={{ fontFamily: "var(--font-body)" }}>{project.year}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-champagne)] font-light block mb-2" style={{ fontFamily: "var(--font-body)" }}>Type</span>
                <p className="text-[var(--color-charcoal)] text-sm font-light" style={{ fontFamily: "var(--font-body)" }}>{project.category}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-2xl md:text-3xl font-light text-[var(--color-charcoal)] leading-[1.3] mb-6 italic">
              {project.subtitle}
            </h2>
            <p className="text-[var(--color-stone)] text-sm md:text-[15px] font-light leading-[2]" style={{ fontFamily: "var(--font-body)" }}>
              {project.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 1 && (
        <section className="pb-20 md:pb-28 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.slice(1).map((img, i) => (
              <ScrollReveal key={img} delay={i * 0.1}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image src={img} alt={`${project.title} - ${i + 2}`} fill className="object-cover" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Next Project */}
      <section className="border-t border-[var(--color-linen)]">
        <Link href={`/portfolio/${nextProject.slug}`} className="group block">
          <div className="relative h-[50vh] overflow-hidden">
            <Image src={nextProject.img} alt={nextProject.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[var(--color-midnight)]/50 group-hover:bg-[var(--color-midnight)]/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <span className="section-label block mb-4 text-[var(--color-champagne-light)]">Next Project</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-5xl font-light text-white">
                {nextProject.title}
              </h2>
            </div>
          </div>
        </Link>
      </section>
    </PageTransition>
  );
}
