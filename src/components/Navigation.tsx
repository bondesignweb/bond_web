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
    { href: "/", label: "HOME" },
    { href: "/about", label: "MEET BOND" },
    { href: "/services", label: "SERVICES" },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/journal", label: "JOURNAL" },
    { href: "/contact", label: "CONTACT" },
  ];

  const isHome = pathname === "/";

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-700"
        style={{
          background: scrolled
            ? "rgba(250,248,245,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* #letsbond */}
            <Link href="/" className="relative z-[110]">
              <span
                className={`text-xs tracking-[0.3em] font-light transition-colors duration-500 ${
                  scrolled || !isHome || menuOpen
                    ? "text-[#3D3D3D]"
                    : "text-white"
                }`}
              >
                #letsbond
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-12">
              {links.filter(l => l.href !== "/").map((link) => (
                <Link key={link.href} href={link.href} className="relative group">
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] font-light transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-[#8B7355]"
                        : scrolled || !isHome
                        ? "text-[#3D3D3D] hover:text-[#8B7355]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="underline"
                      className={`absolute bottom-0 left-0 h-px w-full ${
                        scrolled || !isHome ? "bg-[#8B7355]" : "bg-white"
                      }`}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[110] lg:hidden flex flex-col gap-1.5 w-6 h-5"
              aria-label="Toggle menu"
            >
              <span
                className={`h-0.5 transition-all duration-300 ${
                  scrolled || !isHome || menuOpen
                    ? "bg-[#3D3D3D]"
                    : "bg-white"
                } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 transition-all duration-300 ${
                  scrolled || !isHome || menuOpen
                    ? "bg-[#3D3D3D]"
                    : "bg-white"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 transition-all duration-300 ${
                  scrolled || !isHome || menuOpen
                    ? "bg-[#3D3D3D]"
                    : "bg-white"
                } ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#3D3D3D] flex flex-col items-center justify-center pt-24"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white z-[111] flex flex-col gap-1.5 w-6 h-5"
            >
              <span className="h-0.5 bg-white rotate-45 translate-y-2" />
              <span className="h-0.5 bg-white opacity-0" />
              <span className="h-0.5 bg-white -rotate-45 -translate-y-1.5" />
            </button>

            {/* BOND Logo */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 border border-white flex items-center justify-center mx-auto">
                <span className="font-serif text-xl text-white font-light tracking-tight">BOND</span>
              </div>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-2xl uppercase tracking-[0.2em] font-light text-white hover:text-white/70 transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="absolute bottom-12 flex gap-6 justify-center">
              <a href="#" className="border border-white text-white p-3 hover:bg-white hover:text-[#3D3D3D] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.011 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.011 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.011-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.011-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/></svg>
              </a>
              <a href="#" className="border border-white text-white p-3 hover:bg-white hover:text-[#3D3D3D] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 11-13 4.3 4 4 0 0 0 3.4 2.5 2 2 0 0 0 3.2-1.8v-5a4 4 0 0 1 4-4"/></svg>
              </a>
              <a href="#" className="border border-white text-white p-3 hover:bg-white hover:text-[#3D3D3D] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"/></svg>
              </a>
              <a href="#" className="border border-white text-white p-3 hover:bg-white hover:text-[#3D3D3D] transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
