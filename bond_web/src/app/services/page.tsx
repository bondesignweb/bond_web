"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const headingFont = { fontFamily: "var(--font-display)" } as const;
const bodyFont = { fontFamily: "var(--font-body)" } as const;

const phases = [
  {
    title: "Project Kick-Off",
    desc: "Clear expectations, thorough communication, project scope, timelines, design inspiration, and deliverables.",
  },
  {
    title: "Exterior Selections",
    desc: "Roofing, siding, stone, exterior doors, garage doors, window packages, and sconces — coordinated with your builder.",
  },
  {
    title: "Interior Selections",
    desc: "Plumbing fixtures, appliances, tile, slabs, stone, cabinetry, flooring, paint colors, wall textures, and lighting.",
  },
  {
    title: "Home Furnishings",
    desc: "Furniture concepts, custom design presentations, space planning, procurement, receiving, inspection, and installation.",
  },
  {
    title: "Styling & Accessories",
    desc: "Window treatments, wall treatments, houseware packages, linens, bedding, decorative art, and home accessories.",
  },
  {
    title: "Delivery & Installation",
    desc: "Our warehouse team delivers and assembles all furniture. We place accessories and hang art — picture-perfect for the big reveal.",
  },
];

const faqs = [
  {
    q: "When should I involve an interior designer?",
    a: "The earlier the better. We love shaping your home from the ground up, collaborating with architects on floor plans, material selections, and spatial flow.",
  },
  {
    q: "What types of projects do you take?",
    a: "We specialize in high-end residential design, large-scale remodels, and new construction. Our team brings the same dedication and creativity to every project, regardless of scope.",
  },
  {
    q: "Do you take projects outside of Utah?",
    a: "Absolutely. While we're based in Park City, we serve clients nationwide and have completed projects across the country.",
  },
  {
    q: "How is your pricing structured?",
    a: "Our design fee is based on square footage, and we determine a furnishings budget together during the initial consultation.",
  },
];

const SERVICE_OPTIONS = [
  "New Construction",
  "Remodel",
  "Interior Furnishings",
];

export default function ServicesPage() {
  const [openPhase, setOpenPhase] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          services: serviceType ? [serviceType] : [],
          message,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Submission failed.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-[var(--color-charcoal)]/40 py-3 text-sm font-light text-[var(--color-charcoal)] focus:border-[var(--color-text-accent)] outline-none";
  const labelCls =
    "text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-light)] font-light block mb-2";

  return (
    <PageTransition>
      {/* 1. Hero — 2 column */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[500px] lg:min-h-[700px] bg-black">
          <Image
            src="/images/Bond-Design-Company-Philosophy.jpg"
            alt="Bond Design Company"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="bg-[var(--color-cream)] flex items-center">
          <div className="px-10 py-20 md:px-16 lg:px-20 max-w-[640px] w-full">
            <ScrollReveal>
              <span
                className="block text-[10px] tracking-[0.4em] uppercase text-[var(--color-text-accent)] font-light mb-8"
                style={bodyFont}
              >
                Services
              </span>
              <h1
                className="text-3xl md:text-4xl tracking-[0.08em] uppercase font-light text-[var(--color-charcoal)] mb-10 leading-[1.2]"
                style={headingFont}
              >
                A Boutique Design <em className="italic">Experience</em>
              </h1>
              <div
                className="space-y-5 text-[var(--color-text-light)] text-[15px] font-light leading-[1.9] mb-12"
                style={bodyFont}
              >
                <p>
                  At Bond Design Company, our services are built around two
                  ideas: creating homes with intention and inclusion.
                </p>
                <p>
                  We don&apos;t believe in one-size-fits-all design or a
                  signature look that gets repeated project after project.
                  Every home is a reflection of the client&apos;s personality,
                  rhythm, and lifestyle — and our job is to make sure every
                  decision, from architectural finishes to furnishings, feels
                  like theirs.
                </p>
                <p>
                  The goal is always the same: a home that feels both
                  effortless and entirely yours, designed in collaboration with
                  the people who live there.
                </p>
                <p>
                  Based in Park City, Utah, we work with clients locally and
                  nationwide — wherever you call home, we&apos;re ready to
                  bond.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-block border border-[var(--color-charcoal)] text-[var(--color-charcoal)] px-10 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all font-light"
                style={bodyFont}
              >
                Book a Discovery Call
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Video preview band */}
      <section className="relative min-h-[500px] md:min-h-[600px] bg-black overflow-hidden">
        <Image
          src="/images/380A6516-Edit-scaled.jpg"
          alt=""
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute top-8 right-8 md:top-10 md:right-10 z-10 border border-white/40 px-5 py-2">
          <span
            className="text-white/90 text-[10px] tracking-[0.4em] uppercase font-light"
            style={bodyFont}
          >
            Video Preview
          </span>
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[500px] md:min-h-[600px] text-center px-6 py-24">
          <h2
            className="text-white text-2xl md:text-4xl lg:text-5xl font-light italic leading-[1.3] max-w-4xl tracking-[0.02em]"
            style={headingFont}
          >
            From new builds to remodels, architectural decisions to
            furnishings.
          </h2>
        </div>
      </section>

      {/* 3. Our Process — 2 column with expandable phases */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[500px] lg:min-h-[760px] order-2 lg:order-1">
          <Image
            src="/images/2023-02-08-Bond-Studio4901-nicole-gerulat-1.jpg"
            alt="Design materials"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[var(--color-cream)] flex items-center order-1 lg:order-2">
          <div className="px-10 py-20 md:px-16 lg:px-20 w-full max-w-[640px]">
            <ScrollReveal>
              <h2
                className="text-3xl md:text-5xl uppercase tracking-[0.05em] font-light text-[var(--color-charcoal)] mb-10 text-center"
                style={headingFont}
              >
                Our Process
              </h2>
              <div className="border-t border-[var(--color-charcoal)]/30">
                {phases.map((p, i) => {
                  const isOpen = openPhase === i;
                  const num = String(i + 1);
                  return (
                    <div
                      key={p.title}
                      className="border-b border-[var(--color-charcoal)]/30"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenPhase(isOpen ? null : i)
                        }
                        className="w-full flex items-center justify-between py-5 text-left group"
                      >
                        <span
                          className="text-[12px] tracking-[0.25em] uppercase font-light text-[var(--color-charcoal)] group-hover:text-[var(--color-text-accent)] transition-colors"
                          style={bodyFont}
                        >
                          Phase {num} — {p.title}
                        </span>
                        <span
                          className={`text-[var(--color-text-accent)] text-lg flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        >
                          ›
                        </span>
                      </button>
                      {isOpen && (
                        <p
                          className="text-[var(--color-text-light)] text-sm font-light leading-[1.9] pb-5 pr-8"
                          style={bodyFont}
                        >
                          {p.desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. FAQ — 4-column grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-bg-primary)]">
        <ScrollReveal>
          <h2
            className="text-center text-2xl md:text-4xl uppercase tracking-[0.05em] font-light text-[var(--color-charcoal)] mb-16"
            style={headingFont}
          >
            Frequently Asked Questions
          </h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 max-w-6xl mx-auto">
          {faqs.map((f, i) => (
            <ScrollReveal key={f.q} delay={i * 0.08}>
              <div>
                <h3
                  className="text-base md:text-lg font-normal text-[var(--color-charcoal)] mb-4 leading-[1.4] tracking-[0.02em]"
                  style={headingFont}
                >
                  {f.q}
                </h3>
                <p
                  className="text-[var(--color-text-light)] text-[13px] font-light leading-[1.8]"
                  style={bodyFont}
                >
                  {f.a}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. Let's Bond — inquiry form + image */}
      <section className="grid lg:grid-cols-2">
        <div className="bg-[var(--color-cream)] flex items-center">
          <div className="px-10 py-20 md:px-16 lg:px-20 w-full max-w-[600px]">
            <ScrollReveal>
              <h2
                className="text-5xl md:text-6xl uppercase tracking-[0.05em] font-light text-[var(--color-charcoal)] mb-3 leading-[1]"
                style={headingFont}
              >
                Let&apos;s Bond
              </h2>
              <p
                className="block text-[10px] tracking-[0.4em] uppercase text-[var(--color-text-accent)] font-light mb-12"
                style={bodyFont}
              >
                Submit an Inquiry Form
              </p>

              {submitted ? (
                <div className="py-8">
                  <div className="w-12 h-px bg-[var(--color-text-accent)] mb-6" />
                  <h3
                    className="text-2xl font-light text-[var(--color-charcoal)] mb-3"
                    style={headingFont}
                  >
                    Thank You
                  </h3>
                  <p
                    className="text-[var(--color-text-light)] text-sm font-light"
                    style={bodyFont}
                  >
                    We&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={labelCls} style={bodyFont}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                      style={bodyFont}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={bodyFont}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                      style={bodyFont}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={bodyFont}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                      style={bodyFont}
                    />
                  </div>
                  <div>
                    <label className={labelCls} style={bodyFont}>
                      Project Type
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className={inputCls}
                      style={bodyFont}
                    >
                      <option value="">Select…</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} style={bodyFont}>
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputCls} resize-none`}
                      style={bodyFont}
                    />
                  </div>
                  {error && (
                    <p
                      className="text-sm font-light text-red-700"
                      style={bodyFont}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-block bg-[var(--color-charcoal)] text-white px-12 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--color-text-accent)] transition-all font-light disabled:opacity-60"
                    style={bodyFont}
                  >
                    {submitting ? "Sending…" : "Submit"}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
        <div className="relative min-h-[500px] lg:min-h-full">
          <Image
            src="/images/team-jennifer.jpeg"
            alt="Bond Design"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </PageTransition>
  );
}
