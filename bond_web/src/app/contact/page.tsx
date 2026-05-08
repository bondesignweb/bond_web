"use client";
import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputClass = "w-full bg-transparent border-b border-[var(--color-linen)] py-3 text-sm font-light text-[var(--color-charcoal)]";
  const labelClass = "text-[10px] uppercase tracking-[0.25em] text-[var(--color-stone)] font-light block mb-2";

  return (
    <PageTransition>
      <section className="pt-36 pb-8 md:pt-48 md:pb-12 px-6 md:px-12 lg:px-20 bg-[var(--color-warm-white)]">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <span className="section-label block mb-4">Get In Touch</span>
            <h1 style={{ fontFamily: "var(--font-display)" }} className="text-4xl md:text-5xl lg:text-[64px] font-light text-[var(--color-charcoal)] leading-[1.1]">
              Contact
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="w-full">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-full">
            <Image src="/images/contact-bg.jpg" alt="Bond Design Company" fill className="object-cover" />
          </div>
          <div className="flex items-center bg-[var(--color-warm-white)]">
            <div className="px-10 py-20 md:px-16 lg:px-20 w-full">
              <ScrollReveal>
                <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl md:text-4xl font-light text-[var(--color-charcoal)] mb-3">
                  Let&apos;s <em className="italic">Bond</em>
                </h2>
                <p className="text-[var(--color-stone)] text-sm font-light leading-[1.8] mb-10" style={{ fontFamily: "var(--font-body)" }}>
                  Tell us about your project and we&apos;ll be in touch within 48 hours.
                </p>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="divider-champagne mx-auto mb-8" />
                    <h3 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-light text-[var(--color-charcoal)] mb-4">Thank You</h3>
                    <p className="text-[var(--color-stone)] text-sm font-light" style={{ fontFamily: "var(--font-body)" }}>We&apos;ll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Full Name *</label>
                      <input type="text" required className={inputClass} style={{ fontFamily: "var(--font-body)" }} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-7">
                      <div>
                        <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Phone *</label>
                        <input type="tel" required className={inputClass} style={{ fontFamily: "var(--font-body)" }} />
                      </div>
                      <div>
                        <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Email *</label>
                        <input type="email" required className={inputClass} style={{ fontFamily: "var(--font-body)" }} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Services interested in?</label>
                      <div className="flex flex-wrap gap-4 mt-1">
                        {["New Construction", "Remodel", "Interior Furnishings"].map((s) => (
                          <label key={s} className="flex items-center gap-2 text-sm text-[var(--color-stone)] font-light cursor-pointer" style={{ fontFamily: "var(--font-body)" }}>
                            <input type="checkbox" className="accent-[var(--color-champagne)]" /> {s}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-7">
                      <div>
                        <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Start Date</label>
                        <input type="date" className={inputClass} style={{ fontFamily: "var(--font-body)" }} />
                      </div>
                      <div>
                        <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>End Date</label>
                        <input type="date" className={inputClass} style={{ fontFamily: "var(--font-body)" }} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Project location?</label>
                      <input type="text" className={inputClass} style={{ fontFamily: "var(--font-body)" }} />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Tell us about your project</label>
                      <textarea rows={4} className={`${inputClass} resize-none`} style={{ fontFamily: "var(--font-body)" }} />
                    </div>
                    <button type="submit" className="btn-luxury btn-filled mt-2">
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
        <div className="max-w-[600px] mx-auto text-center space-y-4">
          <a href="tel:4352204809" className="block text-[var(--color-charcoal)] hover:text-[var(--color-champagne)] transition-colors text-sm font-light" style={{ fontFamily: "var(--font-body)" }}>(435) 220-4809</a>
          <a href="mailto:info@bonddesigncompany.com" className="block text-[var(--color-charcoal)] hover:text-[var(--color-champagne)] transition-colors text-sm font-light" style={{ fontFamily: "var(--font-body)" }}>info@bonddesigncompany.com</a>
          <a href="https://www.instagram.com/bonddesigncompany/" target="_blank" className="inline-block text-[var(--color-champagne)] text-sm font-light mt-2" style={{ fontFamily: "var(--font-body)" }}>@bonddesigncompany</a>
        </div>
      </section>
    </PageTransition>
  );
}
