"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  const isHome = pathname === "/";

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-700"
        style={{
          background: scrolled
            ? "rgba(250,248,245,0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.04)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="relative z-[110] group">
              <span
                style={{ fontFamily: "var(--font-display)" }}
                className={`text-2xl md:text-[28px] font-light tracking-[0.15em] uppercase transition-colors duration-500 ${
                  scrolled || !isHome || menuOpen
                    ? "text-[var(--color-charcoal)]"
                    : "text-white"
                }`}
              >
                Bond
              </span>
              <span
                className={`block text-[8px] tracking-[0.35em] uppercase font-light transition-colors duration-500 -mt-0.5 ${
                  scrolled || !isHome || menuOpen
                    ? "text-[var(--color-stone)]"
                    : "text-white/70"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                Design Company
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="relative group">
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] font-light transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-[var(--color-champagne)]"
                        : scrolled || !isHome
                        ? "text-[var(--color-charcoal)] group-hover:text-[var(--color-champagne)]"
                        : "text-white/90 group-hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[var(--color-champagne)] transition-all duration-500 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              <Link
                href="https://www.instagram.com/bonddesigncompany/"
                target="_blank"
                className={`text-[11px] uppercase tracking-[0.2em] font-light transition-colors duration-300 ${
                  scrolled || !isHome
                    ? "text-[var(--color-champagne)] hover:text-[var(--color-charcoal)]"
                    : "text-[var(--color-champagne-light)] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                #letsbond
              </Link>
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-[110] w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-px transition-all duration-500 ${
                  menuOpen
                    ? "rotate-45 translate-y-[3.5px] bg-[var(--color-charcoal)]"
                    : scrolled || !isHome
                    ? "bg-[var(--color-charcoal)]"
                    : "bg-white"
                }`}
              />
              <span
                className={`block w-6 h-px transition-all duration-500 ${
                  menuOpen
                    ? "-rotate-45 -translate-y-[3.5px] bg-[var(--color-charcoal)]"
                    : scrolled || !isHome
                    ? "bg-[var(--color-charcoal)]"
                    : "bg-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[105] bg-[var(--color-warm-white)]"
          >
            <div className="h-full flex flex-col items-center justify-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href}>
                    <span
                      style={{ fontFamily: "var(--font-display)" }}
                      className={`text-4xl md:text-5xl font-light transition-colors duration-300 ${
                        pathname === link.href
                          ? "text-[var(--color-champagne)]"
                          : "text-[var(--color-charcoal)] hover:text-[var(--color-champagne)]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                <span className="divider-champagne" />
                <a
                  href="tel:4352204809"
                  className="text-xs tracking-[0.15em] text-[var(--color-stone)] font-light mt-3"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  (435) 220-4809
                </a>
                <a
                  href="mailto:info@bonddesigncompany.com"
                  className="text-xs tracking-[0.15em] text-[var(--color-stone)] font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  info@bonddesigncompany.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
