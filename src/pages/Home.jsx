import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#F8F6F3]">
      {/* Hero Section with Video */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <iframe
            src="https://player.vimeo.com/video/932254900?title=0&muted=1&autopause=0&autoplay=1&loop=1&byline=0&portrait=0&background=1"
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title="Bond Design Company"
          />
        </div>
        
        {/* Logo Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-center text-white">
            <h1 className="font-serif text-7xl md:text-9xl tracking-[0.3em] font-extralight">BOND</h1>
            <p className="font-serif tracking-[0.5em] text-sm md:text-lg mt-4 font-light">DESIGN COMPANY</p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs tracking-[0.3em]">SCROLL</span>
          <div className="w-[1px] h-10 bg-white/40" />
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-28 px-6 md:px-16 lg:px-32 bg-[#F8F6F3]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-6">BOUTIQUE INTERIOR DESIGN · PARK CITY, UTAH</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#3D3D3D] tracking-wide mb-8 leading-snug">
            We don't just design spaces.<br />We design experiences.
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed text-base md:text-lg font-light max-w-2xl mx-auto">
            Bond Design Company is a full-service, boutique interior design firm based in Park City, Utah. Our mission is not only to design beautiful spaces but to create moments of joy — spaces that are an exciting reflection of your lifestyle, personality, and energy.
          </p>
        </motion.div>
      </section>

      {/* A Bonding Experience Section */}
      <section className="py-10 px-6 md:px-16 lg:px-32 bg-[#F8F6F3]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <img
              src="https://bonddesigncompany.com/wp-content/uploads/2025/08/3-2.png"
              alt="A Bonding Experience"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-4">OUR APPROACH</p>
            <h3 className="font-serif italic text-2xl md:text-3xl text-[#3D3D3D] mb-6">
              A Bonding Experience
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-4">
              We believe that we are each fundamentally bonded to our environments — and that bond should feel intentional, personal, and deeply yours. From the first conversation to the final installation, we guide you through every decision with clarity, creativity, and care.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-8">
              Whether you're building a mountain retreat from the ground up, reimagining an existing home, or furnishing your dream space, we bring the same level of passion and precision to every project.
            </p>
            <Link 
              to={createPageUrl('Services')}
              className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-sm tracking-[0.2em] hover:bg-[#3D3D3D] hover:text-white transition-all duration-300"
            >
              OUR SERVICES
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#3D3D3D] mt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '2019', label: 'FOUNDED' },
            { number: '100+', label: 'PROJECTS COMPLETED' },
            { number: '6', label: 'PRESS FEATURES' },
            { number: '11', label: 'TEAM MEMBERS' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-3xl md:text-4xl text-white mb-2">{stat.number}</p>
              <p className="text-[#B8B8B8] text-xs tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio & Journal Grid */}
      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#F8F6F3]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-3">EXPLORE</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] tracking-wide">Our Work & Journal</h2>
        </motion.div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Portfolio Card */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to={createPageUrl('Portfolio')} className="group block relative overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://bonddesigncompany.com/wp-content/uploads/2025/08/3-2.png"
                  alt="Portfolio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wide mb-4">Portfolio</h3>
                <span className="inline-block border border-white text-white px-6 py-2 text-sm tracking-[0.15em] w-fit hover:bg-white hover:text-[#3D3D3D] transition-all duration-300">
                  MORE PROJECTS
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Journal Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to={createPageUrl('Journal')} className="group block relative overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://bonddesigncompany.com/wp-content/uploads/2025/08/1-2.png"
                  alt="Journal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
                <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wide mb-4">Journal</h3>
                <span className="inline-block border border-white text-white px-6 py-2 text-sm tracking-[0.15em] w-fit hover:bg-white hover:text-[#3D3D3D] transition-all duration-300">
                  VIEW OUR BLOG
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Teaser */}
      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#EDE9E3]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-4">HOW WE WORK</p>
            <h3 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] mb-6 tracking-wide">From Vision to Reality</h3>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-10 max-w-2xl mx-auto">
              Our full-service process covers everything from exterior selections and architectural finishes to furniture procurement and final installation. We handle the details so you can enjoy the journey.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {['Kick-Off & Vision', 'Selections & Design', 'Furnishings', 'Delivery & Reveal'].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-full border border-[#8B7355] flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#8B7355] text-sm font-serif">{i + 1}</span>
                  </div>
                  <p className="text-[#3D3D3D] text-xs tracking-[0.1em] font-light">{step.toUpperCase()}</p>
                </motion.div>
              ))}
            </div>
            <Link 
              to={createPageUrl('Services')}
              className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-sm tracking-[0.2em] hover:bg-[#3D3D3D] hover:text-white transition-all duration-300"
            >
              LEARN MORE
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Let's Bond CTA */}
      <section className="py-28 px-6 md:px-16 lg:px-32 bg-[#F8F6F3]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="font-serif italic text-2xl md:text-3xl text-[#3D3D3D] mb-6">
            Let's BOND
          </h3>
          <p className="text-[#6B6B6B] leading-relaxed mb-8 font-light">
            Your home should tell your story. Each project comes with unique stylistic needs, and we're confident that together we can make your dreams a reality. Get started by filling out our client inquiry form — we'll be in touch soon.
          </p>
          <Link 
            to={createPageUrl('Contact')}
            className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-sm tracking-[0.2em] hover:bg-[#3D3D3D] hover:text-white transition-all duration-300"
          >
            GET STARTED
          </Link>
        </motion.div>
      </section>
    </div>
  );
}