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
      <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: 1.5 }} className="relative z-10 text-center">
          <h1 className="font-serif text-8xl text-white tracking-widest font-light">BOND</h1>
          <p className="text-white/80 text-sm tracking-widest mt-4 font-light">DESIGN COMPANY</p>
        </motion.div>
      </section>

      <section className="py-32 px-6 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#8B7355] text-xs tracking-widest mb-6">BOUTIQUE INTERIOR DESIGN</p>
          <h2 className="font-serif text-6xl text-[#3D3D3D] mb-8 font-light">We don't just design spaces. We design experiences.</h2>
          <p className="text-[#6B6B6B] text-lg font-light">Bond Design Company is a full-service, boutique interior design firm based in Park City, Utah.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#F8F6F3]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-96">
            <Image src="/images/bonding-experience-bg.jpg" alt="Bonding Experience" fill className="object-cover" />
          </div>
          <div>
            <p className="text-[#8B7355] text-xs tracking-widest mb-4">OUR APPROACH</p>
            <h3 className="font-serif italic text-4xl text-[#3D3D3D] mb-6 font-light">A Bonding Experience</h3>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-4">We believe that we are each fundamentally bonded to our environments and that bond should feel intentional, personal, and deeply yours.</p>
            <Link href="/services" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">Our Services</Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#3D3D3D]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><p className="font-serif text-4xl text-white font-light">2019</p><p className="text-[#B8B8B8] text-xs font-light">FOUNDED</p></div>
          <div><p className="font-serif text-4xl text-white font-light">100+</p><p className="text-[#B8B8B8] text-xs font-light">PROJECTS</p></div>
          <div><p className="font-serif text-4xl text-white font-light">6</p><p className="text-[#B8B8B8] text-xs font-light">PRESS</p></div>
          <div><p className="font-serif text-4xl text-white font-light">11</p><p className="text-[#B8B8B8] text-xs font-light">TEAM</p></div>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#F8F6F3]">
        <div className="text-center mb-16">
          <p className="text-[#8B7355] text-xs tracking-widest mb-3">EXPLORE</p>
          <h2 className="font-serif text-5xl text-[#3D3D3D] mb-12 font-light">Our Work & Journal</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Link href="/portfolio" className="block relative h-96 group overflow-hidden">
            <Image src="/images/380A6516-Edit-scaled.jpg" alt="Portfolio" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
              <h3 className="font-serif text-4xl text-white tracking-wide mb-4 font-light">Portfolio</h3>
              <span className="inline-block border border-white text-white px-6 py-2 text-xs tracking-widest uppercase w-fit font-light">View Portfolio</span>
            </div>
          </Link>
          <Link href="/journal" className="block relative h-96 group overflow-hidden">
            <Image src="/images/380A5871-Edit-scaled.jpg" alt="Journal" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
              <h3 className="font-serif text-4xl text-white tracking-wide mb-4 font-light">Journal</h3>
              <span className="inline-block border border-white text-white px-6 py-2 text-xs tracking-widest uppercase w-fit font-light">View Journal</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#EDE9E3]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#8B7355] text-xs tracking-widest mb-4">HOW WE WORK</p>
          <h3 className="font-serif text-5xl text-[#3D3D3D] mb-8 font-light">From Vision to Reality</h3>
          <p className="text-[#6B6B6B] leading-relaxed font-light mb-12">Our full-service process covers everything from selections to final installation.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[1,2,3,4].map(i=><div key={i}><div className="w-12 h-12 rounded-full border border-[#8B7355] flex items-center justify-center mx-auto mb-3"><span className="font-serif font-light">{i}</span></div></div>)}
          </div>
          <Link href="/services" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">Learn More</Link>
        </div>
      </section>

      <section className="py-32 px-6 bg-[#F8F6F3]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif italic text-5xl text-[#3D3D3D] mb-6 font-light">Let's BOND</h2>
          <p className="text-[#6B6B6B] mb-8 text-lg font-light">Your home should tell your story. Each project comes with unique needs.</p>
          <Link href="/contact" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
