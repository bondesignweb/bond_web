"use client";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const headingFont = { fontFamily: "var(--font-display)" } as const;
const bodyFont = { fontFamily: "var(--font-body)" } as const;

const ctaOutline =
  "inline-block border border-[var(--color-charcoal)] text-[var(--color-charcoal)] px-10 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all font-light";
const ctaSolid =
  "inline-block bg-[var(--color-text-accent)] text-white px-12 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-[var(--color-charcoal)] transition-all font-light";

export default function HomePage() {
  return (
    <PageTransition>
      {/* 1. Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--color-charcoal)]">
        <Image
          src="/images/380A5871-Edit-scaled.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1
            className="text-white tracking-[0.4em] text-5xl md:text-7xl font-light"
            style={headingFont}
          >
            BOND
          </h1>
          <p
            className="text-white/80 text-[10px] tracking-[0.4em] uppercase mt-3"
            style={bodyFont}
          >
            Design Company
          </p>
          <p
            className="mt-12 text-white/90 text-lg md:text-xl font-light leading-relaxed italic"
            style={headingFont}
          >
            We are a full-service, boutique interior design firm based in Park
            City, Utah. We believe your home should tell your unique story.
            Let&apos;s Bond.
          </p>
        </div>
      </section>

      {/* 2. Mission intro */}
      <section className="py-32 md:py-40 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="section-label block mb-6">
              Boutique Interior Design
            </span>
            <p
              className="text-[var(--color-text-light)] text-base md:text-lg font-light leading-[1.9]"
              style={bodyFont}
            >
              Bond Design Company is a full-service, boutique interior design
              firm. Our mission is not only to design beautiful spaces but to
              create moments of joy. We believe that we are each fundamentally
              bonded to our environments and that those environments should be
              an exciting reflection of our lifestyles, personalities, and
              energy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. A Bonding Experience */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-linen)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative w-full aspect-[4/5]">
              <Image
                src="/images/bonding-experience-bg.jpg"
                alt="A bonding experience"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <span className="section-label block mb-4">Our Approach</span>
            <h2
              className="text-4xl md:text-5xl font-light text-[var(--color-charcoal)] mb-8 italic leading-[1.1]"
              style={headingFont}
            >
              A Bonding Experience
            </h2>
            <p
              className="text-[var(--color-text-light)] text-base font-light leading-[1.9] mb-10"
              style={bodyFont}
            >
              We strive to inspire joy in life by connecting people to their
              environment, and we believe that the spaces we create should
              always be a reflection of its user. In an industry where beauty
              and appearances matter, it is important to let clients&apos;
              personalities and lifestyles manifest themselves in their
              homes&apos; designs.
            </p>
            <Link href="/services" className={ctaOutline} style={bodyFont}>
              Learn More
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Portfolio */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="section-label block mb-4">Recent Work</span>
            <h2
              className="text-5xl md:text-6xl font-light text-[var(--color-charcoal)] mb-8 leading-[1.1]"
              style={headingFont}
            >
              Portfolio
            </h2>
            <p
              className="text-[var(--color-text-light)] text-base font-light leading-[1.9] mb-10"
              style={bodyFont}
            >
              Each project tells a unique story shaped by our clients&apos;
              lives, personalities, and the places they call home. Explore a
              collection of completed work — from mountain retreats to city
              escapes.
            </p>
            <Link href="/portfolio" className={ctaOutline} style={bodyFont}>
              More Projects
            </Link>
          </ScrollReveal>
          <ScrollReveal>
            <Link
              href="/portfolio"
              className="block relative w-full aspect-[4/5] group overflow-hidden"
            >
              <Image
                src="/images/3-2.png"
                alt="Portfolio"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Journal */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-linen)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <Link
              href="/journal"
              className="block relative w-full aspect-[4/5] group overflow-hidden"
            >
              <Image
                src="/images/1-2.png"
                alt="Journal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </ScrollReveal>
          <ScrollReveal>
            <span className="section-label block mb-4">Behind The Scenes</span>
            <h2
              className="text-5xl md:text-6xl font-light text-[var(--color-charcoal)] mb-8 leading-[1.1]"
              style={headingFont}
            >
              Journal
            </h2>
            <p
              className="text-[var(--color-text-light)] text-base font-light leading-[1.9] mb-10"
              style={bodyFont}
            >
              Process notes, design inspiration, and stories from the studio.
              Take a look behind the scenes of how we bring our clients&apos;
              visions to life.
            </p>
            <Link href="/journal" className={ctaOutline} style={bodyFont}>
              View Our Blog
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Let's Bond CTA */}
      <section className="relative py-40 px-6 md:px-12 lg:px-20 bg-[var(--color-charcoal)] overflow-hidden">
        <Image
          src="/images/lets-bond-cta-bg.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2
              className="text-5xl md:text-7xl font-light text-white leading-[1.1]"
              style={headingFont}
            >
              Let&apos;s{" "}
              <span className="italic text-[var(--color-text-accent)]">
                Bond
              </span>
            </h2>
            <div className="w-16 h-px bg-[var(--color-text-accent)] mx-auto my-10" />
            <p
              className="text-white/80 text-base md:text-lg font-light leading-[1.9] mb-12"
              style={bodyFont}
            >
              Your home should tell your story. Each project comes with unique
              stylistic needs, and we&apos;re confident that together we can
              make your dreams a reality. Get started by filling out our client
              inquiry form — we&apos;ll be in touch soon.
            </p>
            <Link href="/contact" className={ctaSolid} style={bodyFont}>
              Get Started
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
