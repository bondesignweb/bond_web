"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const steps = [
  { num: "01", title: "Project Kick-Off", desc: "Clear expectations, thorough communication, project scope, timelines, design inspiration, and deliverables." },
  { num: "02", title: "Exterior Selections", desc: "Roofing, siding, stone, exterior doors, garage doors, window packages, and sconces — coordinated with your builder." },
  { num: "03", title: "Interior Selections", desc: "Plumbing fixtures, appliances, tile, slabs, stone, cabinetry, flooring, paint colors, wall textures, and lighting." },
  { num: "04", title: "Home Furnishings", desc: "Furniture concepts, custom design presentations, space planning, procurement, receiving, inspection, and installation." },
  { num: "05", title: "Complete the Look", desc: "Window treatments, wall treatments, houseware packages, linens, bedding, decorative art, and home accessories." },
  { num: "06", title: "Delivery & Installation", desc: "Our warehouse team delivers and assembles all furniture. We place accessories and hang art — picture-perfect for the big reveal." },
];

const faqs = [
  { q: "What types of projects do you take?", a: "We specialize in high-end residential design, large-scale remodels, and new construction. Our team brings the same level of dedication and creativity to every project, regardless of scope." },
  { q: "Do you take projects outside of Utah?", a: "Absolutely! While we're based in Park City, we serve clients nationwide and have completed projects across the country." },
  { q: "How is your pricing structured?", a: "Our design fee is based on square footage, and we determine a furnishings budget together during the initial consultation." },
  { q: "Who will be on my design team?", a: "Our principal designer Jennifer leads every project, supported by our talented team of designers and project managers who ensure individualized attention." },
  { q: "When should I involve an interior designer?", a: "The earlier the better. We love shaping your home from the ground up, collaborating with architects on floor plans, material selections, and spatial flow." },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-36 pb-8 md:pt-48 md:pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <span className="section-label block mb-4">What We Do</span>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-[64px] font-light text-[var(--color-charcoal)] leading-[1.1]">
              Interior Design <em className="italic">Services</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[var(--color-stone)] text-sm md:text-[16px] font-light leading-[2]" style={{ fontFamily: "var(--font-body)" }}>
              Our services assist with selecting architectural finishes, overseeing the building process, and designing timeless spaces that complement your individual lifestyle. Our goal is to deliver unique and ambitious design solutions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label block mb-4">The Journey</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)]">
                Our <em className="italic">Process</em>
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.05}>
                <div className="border-t border-[var(--color-linen)] py-10 md:py-12 grid md:grid-cols-[80px_1fr] gap-4 md:gap-8">
                  <span style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl font-light text-[var(--color-champagne)]">{s.num}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-xl md:text-2xl font-light text-[var(--color-charcoal)] mb-3">{s.title}</h3>
                    <p className="text-[var(--color-stone)] text-sm font-light leading-[1.9]" style={{ fontFamily: "var(--font-body)" }}>{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="section-label block mb-4">Common Questions</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)]">FAQ</h2>
            </div>
          </ScrollReveal>
          <div>
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="border-b border-[var(--color-linen)]">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-6 text-left group">
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-lg md:text-xl font-normal text-[var(--color-charcoal)] group-hover:text-[var(--color-champagne)] transition-colors pr-8">{f.q}</h3>
                    <span className={`text-[var(--color-champagne)] text-xl flex-shrink-0 transition-transform duration-500 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`faq-content ${openFaq === i ? "open" : ""}`}>
                    <p className="text-[var(--color-stone)] text-sm font-light leading-[1.9] pb-6" style={{ fontFamily: "var(--font-body)" }}>{f.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image src="/images/contact-bg.jpg" alt="Bond Design" fill className="object-cover" />
          </div>
          <div className="flex items-center bg-[var(--color-warm-white)]">
            <div className="px-10 py-20 md:px-16 lg:px-20 w-full">
              <span className="section-label block mb-4">Get In Touch</span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-6">
                Let&apos;s <em className="italic">Bond</em>
              </h2>
              <p className="text-[var(--color-stone)] text-sm font-light leading-[1.9] mb-10" style={{ fontFamily: "var(--font-body)" }}>
                Ready to start your project? Fill out our client inquiry form and we&apos;ll be in touch within 48 hours.
              </p>
              <Link href="/contact" className="btn-luxury text-[var(--color-charcoal)]"><span>Contact Us</span></Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
