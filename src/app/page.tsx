"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#F8F6F3]">
      {/* Hero - No nav overlay here, Navigation component handles it */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Hero Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-center">
          <h1 className="font-serif text-9xl text-white tracking-widest font-light">BOND</h1>
          <p className="text-white/80 text-xs tracking-widest mt-6 font-light">DESIGN COMPANY</p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute bottom-20 z-10 flex flex-col items-center gap-4">
          <span className="text-white/60 text-xs tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-px h-12 bg-white/40" />
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-32 px-8 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#8B7355] text-xs tracking-widest mb-8">BOUTIQUE INTERIOR DESIGN · PARK CITY, UTAH</p>
          <h2 className="font-serif text-6xl text-[#3D3D3D] mb-8 font-light">We don't just design spaces. We design experiences.</h2>
          <p className="text-[#6B6B6B] text-base leading-relaxed font-light max-w-2xl mx-auto">Bond Design Company is a full-service, boutique interior design firm based in Park City, Utah. Our mission is not only to design beautiful spaces but to create moments of joy — spaces that are an exciting reflection of your lifestyle, personality, and energy.</p>
        </div>
      </section>

      {/* Bonding Experience */}
      <section className="py-32 px-8 bg-[#F8F6F3]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative w-full h-96">
            <Image src="/images/bonding-experience-bg.jpg" alt="Bonding Experience" fill className="object-cover" />
          </div>
          <div>
            <p className="text-[#8B7355] text-xs tracking-widest mb-4">OUR APPROACH</p>
            <h3 className="font-serif italic text-4xl text-[#3D3D3D] mb-6 font-light">A Bonding Experience</h3>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-4 text-base">We believe that we are each fundamentally bonded to our environments — and that bond should feel intentional, personal, and deeply yours. From the first conversation to the final installation, we guide you through every decision with clarity, creativity, and care.</p>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-8 text-base">Whether you're building a mountain retreat from the ground up, reimagining an existing home, or furnishing your dream space, we bring the same level of passion and precision to every project.</p>
            <Link href="/services" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">Our Services</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-8 bg-[#3D3D3D]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><p className="font-serif text-4xl text-white font-light">2019</p><p className="text-[#B8B8B8] text-xs tracking-widest font-light mt-2">FOUNDED</p></div>
          <div><p className="font-serif text-4xl text-white font-light">100+</p><p className="text-[#B8B8B8] text-xs tracking-widest font-light mt-2">PROJECTS COMPLETED</p></div>
          <div><p className="font-serif text-4xl text-white font-light">6</p><p className="text-[#B8B8B8] text-xs tracking-widest font-light mt-2">PRESS FEATURES</p></div>
          <div><p className="font-serif text-4xl text-white font-light">11</p><p className="text-[#B8B8B8] text-xs tracking-widest font-light mt-2">TEAM MEMBERS</p></div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-32 px-8 bg-[#F8F6F3]">
        <div className="text-center mb-16">
          <p className="text-[#8B7355] text-xs tracking-widest mb-4">EXPLORE</p>
          <h2 className="font-serif text-5xl text-[#3D3D3D] font-light">Our Work & Journal</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <Link href="/portfolio" className="block relative h-96 group overflow-hidden">
            <Image src="/images/380A6516-Edit-scaled.jpg" alt="Portfolio" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-12">
              <h3 className="font-serif text-4xl text-white font-light mb-4">Portfolio</h3>
              <span className="inline-block border border-white text-white px-6 py-2 text-xs tracking-widest uppercase w-fit font-light hover:bg-white hover:text-black transition-all">View Portfolio</span>
            </div>
          </Link>
          <Link href="/journal" className="block relative h-96 group overflow-hidden">
            <Image src="/images/380A5871-Edit-scaled.jpg" alt="Journal" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-12">
              <h3 className="font-serif text-4xl text-white font-light mb-4">Journal</h3>
              <span className="inline-block border border-white text-white px-6 py-2 text-xs tracking-widest uppercase w-fit font-light hover:bg-white hover:text-black transition-all">View Our Blog</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-8 bg-[#EDE9E3]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#8B7355] text-xs tracking-widest mb-4">HOW WE WORK</p>
          <h3 className="font-serif text-5xl text-[#3D3D3D] mb-8 font-light">From Vision to Reality</h3>
          <p className="text-[#6B6B6B] leading-relaxed font-light mb-12">Our full-service process covers everything from exterior selections and architectural finishes to furniture procurement and final installation. We handle the details so you can enjoy the journey.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {["Kick-Off & Vision", "Selections & Design", "Furnishings", "Delivery & Reveal"].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full border border-[#8B7355] flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-sm font-light">{i + 1}</span>
                </div>
                <p className="text-[#3D3D3D] text-xs tracking-widest font-light">{step}</p>
              </div>
            ))}
          </div>
          <Link href="/services" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">Learn More</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-[#F8F6F3]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif italic text-5xl text-[#3D3D3D] mb-6 font-light">Let's <span className="not-italic">BOND</span></h2>
          <p className="text-[#6B6B6B] mb-8 text-base leading-relaxed font-light">Your home should tell your story. Each project comes with unique stylistic needs, and we're confident that together we can make your dreams a reality. Get started by filling out our client inquiry form — we'll be in touch soon.</p>
          <Link href="/contact" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
