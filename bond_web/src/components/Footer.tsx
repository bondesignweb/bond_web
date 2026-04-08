"use client";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function Footer() {
  const links = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[var(--color-midnight)] text-white">
      {/* Top Section */}
      <div className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-10">
              {/* Logo */}
              <Link href="/" className="group">
                <span
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-white/90 group-hover:text-[var(--color-champagne)] transition-colors duration-500"
                >
                  Bond
                </span>
                <span
                  className="block text-[9px] tracking-[0.35em] uppercase font-light text-white/40 text-center -mt-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Design Company
                </span>
              </Link>

              {/* Divider */}
              <div className="w-10 h-px bg-[var(--color-champagne)]" />

              {/* Navigation */}
              <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[11px] tracking-[0.18em] text-white/40 hover:text-[var(--color-champagne)] transition-colors duration-400 font-light uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2">
                <a
                  href="tel:4352204809"
                  className="text-[12px] tracking-[0.12em] text-white/50 hover:text-[var(--color-champagne)] transition-colors font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  (435) 220-4809
                </a>
                <span className="hidden sm:block w-1 h-1 bg-white/15 rounded-full" />
                <a
                  href="mailto:info@bonddesigncompany.com"
                  className="text-[12px] tracking-[0.12em] text-white/50 hover:text-[var(--color-champagne)] transition-colors font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  info@bonddesigncompany.com
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[10px] tracking-[0.12em] text-white/25 font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &copy; {new Date().getFullYear()} Bond Design Company. All rights reserved.
          </p>
          <p
            className="text-[10px] tracking-[0.12em] text-white/25 font-light"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Park City, Utah
          </p>
        </div>
      </div>
    </footer>
  );
}
