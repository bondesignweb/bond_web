"use client";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const team = [
  { name: "Jennifer Chipman", role: "Co-Founder & Principal Designer", img: "/images/team-jennifer.jpeg" },
  { name: "Chelsey Milton", role: "Co-Founder", img: "/images/team-chelsey.jpg" },
  { name: "Grant Thorsen", role: "Co-Founder & Business Development", img: "/images/team-grant.jpeg" },
  { name: "Laura Kramer", role: "Designer", img: "/images/team-laura.jpg" },
  { name: "Melissa Kunes", role: "Designer", img: "/images/team-melissa.jpeg" },
  { name: "Alex Kotkiewicz", role: "Designer", img: "/images/3121FA3F-285B-4C6A-8419-1B435E0683FE-2-scaled.jpeg" },
  { name: "Claire English", role: "Project Manager", img: "/images/team-claire.jpeg" },
  { name: "Nicole Messerole", role: "Project Manager", img: "/images/6663786F-1864-4146-B305-36FCF4DA72C8-2-scaled.jpeg" },
  { name: "Andrea Aldana", role: "Project Manager", img: "/images/team-andrea.jpeg" },
  { name: "Hannah Holmes", role: "Marketing Director", img: "/images/team-hannah.jpeg" },
  { name: "Michael Lopez", role: "Operations Specialist", img: "/images/AD483D48-CEF7-4CDF-AD34-AD01597E5D70-2-scaled.jpeg" },
  { name: "Perla", role: "Personal Space Infiltration Officer", img: "/images/Bond-Studio-Perla.jpg" },
];

const press = [
  { name: "Utah Style & Design", year: "2025", img: "/images/press-usd-2025.png", url: "https://issuu.com/bonddesigncompany.com/docs/utah_style_design_bond_design_company_summer" },
  { name: "Homes & Gardens", year: "2024", img: "/images/press-homes-gardens.png", url: "https://www.homesandgardens.com/interior-design/rustic-decor-ideas" },
  { name: "Sunset Magazine", year: "2023", img: "/images/press-sunset.png", url: "https://issuu.com/bonddesigncompany.com/docs/sunset_magazine_bond_design_company_november_2" },
  { name: "One Kindesign", year: "2023", img: "/images/press-onekindesign.png", url: "https://onekindesign.com/2023/02/03/log-cabin-hideaway-utah-mountains/" },
  { name: "Utah Style & Design", year: "2023", img: "/images/press-usd-2023.jpg", url: "https://issuu.com/bonddesigncompany.com/docs/utah_style_design_bond_design_company_winter" },
  { name: "Voyage Utah", year: "2022", img: "/images/press-voyage.png", url: "https://voyageutah.com/interview/check-out-jennifer-chipmans-story/" },
  { name: "Enes Yilmazer", year: "2022", img: "/images/press-enes.jpg", url: "https://youtu.be/Mw_AJOYzt0w" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 lg:px-20 bg-[var(--color-warm-white)]">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <span className="section-label block mb-6">Our Story</span>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-[64px] font-light text-[var(--color-charcoal)] leading-[1.1]">
              Meet Bond <em className="italic">Design</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="w-full">
        <div className="grid lg:grid-cols-2">
          <ScrollReveal className="flex items-center bg-[var(--color-cream)]">
            <div className="px-10 py-20 md:px-16 lg:px-20 xl:px-28">
              <span className="section-label block mb-6">Philosophy</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl lg:text-[42px] font-light text-[var(--color-charcoal)] leading-[1.15] mb-8">
                Design With <em className="italic">Intention</em>
              </h2>
              <p className="text-[var(--color-stone)] text-sm md:text-[15px] font-light leading-[2]" style={{ fontFamily: "var(--font-body)" }}>
                We are firm believers in following our instincts. We love interior design and respect the process plus everything that comes with it. Part of this process includes intuitively understanding the feeling of a space and what it needs to become. We value human connection, relationships, authenticity, and creativity to produce a custom home experience uniquely catered to you.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="relative">
            <div className="relative w-full min-h-[450px] lg:min-h-[600px]">
              <Image src="/images/Bond-Design-Company-Philosophy.jpg" alt="Bond Design Philosophy" fill className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <span className="section-label block mb-4">The People</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl font-light text-[var(--color-charcoal)]">
                Our <em className="italic">Team</em>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
            {team.map((m, i) => (
              <ScrollReveal key={m.name} delay={Math.min(i * 0.04, 0.3)}>
                <div className="group text-center">
                  <div className="img-zoom relative aspect-[3/4] overflow-hidden mb-5">
                    <Image src={m.img} alt={m.name} fill className="object-cover" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-champagne)] font-light mb-1.5" style={{ fontFamily: "var(--font-body)" }}>{m.role}</p>
                  <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg md:text-xl font-normal text-[var(--color-charcoal)]">{m.name}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <span className="section-label block mb-4">Featured In</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl font-light text-[var(--color-charcoal)]">
                Press
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {press.map((p, i) => (
              <ScrollReveal key={`${p.name}-${p.year}`} delay={Math.min(i * 0.05, 0.3)}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-champagne)] font-light mb-3" style={{ fontFamily: "var(--font-body)" }}>{p.year}</p>
                  <div className="img-zoom relative aspect-[3/4] overflow-hidden mb-4">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg font-normal text-[var(--color-charcoal)] group-hover:text-[var(--color-champagne)] transition-colors duration-400">{p.name}</h3>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/lets-bond-cta-bg.png" alt="Lets Bond" fill className="object-cover" />
          <div className="absolute inset-0 bg-[var(--color-midnight)]/50" />
        </div>
        <ScrollReveal>
          <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
            <span className="section-label block mb-6 text-[var(--color-champagne-light)]">Start Your Project</span>
            <h2 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-[56px] font-light text-white leading-[1.1] mb-8">
              Let&apos;s <em className="italic">Bond</em>
            </h2>
            <p className="text-white/65 text-sm md:text-[15px] font-light leading-[2] mb-12" style={{ fontFamily: "var(--font-body)" }}>
              Your home should tell your story. We&apos;re confident that together we can make your dreams a reality.
            </p>
            <Link href="/contact" className="btn-luxury btn-light"><span>Get Started</span></Link>
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
