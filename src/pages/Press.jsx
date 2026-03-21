import React from 'react';
import { motion } from 'framer-motion';

const pressFeatures = [
  {
    year: '2025',
    title: 'Utah Style & Design',
    description: 'Featured in the "Chic Summer Style" issue — At Ease: Laid-back spaces, indoors & out.',
    image: 'https://bonddesigncompany.com/wp-content/uploads/2025/07/3.png',
    link: null,
  },
  {
    year: '2024',
    title: 'Homes & Gardens',
    description: 'Bond Design Company featured for their exceptional Park City interior work.',
    image: 'https://bonddesigncompany.com/wp-content/uploads/2025/07/5.png',
    link: null,
  },
  {
    year: '2023',
    title: 'Sunset Magazine',
    description: 'Featured in "Winter in the West" — Epic seasonal celebrations, mountain getaways, and ranch house design.',
    image: 'https://bonddesigncompany.com/wp-content/uploads/2025/07/6.png',
    link: null,
  },
  {
    year: '2023',
    title: 'One Kindesign',
    description: 'Bond Design Company\'s mountain modern work showcased for innovative residential design.',
    image: 'https://bonddesigncompany.com/wp-content/uploads/2023/01/01-USD-WT23-Cover.jpg',
    link: null,
  },
  {
    year: '2023',
    title: 'Utah Style & Design',
    description: 'Bold shapes take style to the next level — Fresh Perspective feature.',
    image: 'https://bonddesigncompany.com/wp-content/uploads/2025/07/4.png',
    link: null,
  },
  {
    year: '2022',
    title: 'Voyage Utah',
    description: 'An in-depth feature on Bond Design Company\'s journey and design philosophy.',
    image: 'https://bonddesigncompany.com/wp-content/uploads/2025/07/7.png',
    link: null,
  },
];

export default function Press() {
  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase font-light mb-6">In the Media</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#3D3D3D] font-light tracking-wide">Press</h1>
            <p className="text-[#8B8178] text-base font-light mt-6 max-w-lg mx-auto leading-relaxed">
              Bond Design Company in the spotlight — featured in leading design publications and media.
            </p>
          </motion.div>
        </div>
      </section>

      {/* YouTube Feature */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B7355] text-xs tracking-[0.3em] uppercase mb-6 text-center">Featured Video</p>
            <div className="aspect-video w-full overflow-hidden shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/1kInZGLS0wY"
                title="Bond Design Company — Enes Yilmazer Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-[#8B8178] font-light text-sm mt-4 italic">
              Enes Yilmazer tours a Bond Design Company project
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[200px] mx-auto h-px bg-[#D5D0C8] mb-20" />

      {/* Press Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white border border-[#E5E1DC] overflow-hidden hover:shadow-lg transition-shadow duration-500">
                  {/* Year badge */}
                  <div className="px-6 pt-5">
                    <span className="text-[#8B7355] text-[10px] tracking-[0.3em] uppercase font-light">{feature.year}</span>
                  </div>

                  {/* Cover image */}
                  <div className="px-6 py-4">
                    <div className="aspect-[3/4] overflow-hidden bg-[#F0EDE8]">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-6 pb-6">
                    <h3 className="font-serif text-xl text-[#3D3D3D] mb-2">{feature.title}</h3>
                    <p className="text-[#8B8178] font-light text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-[#EDE9E3]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase font-light mb-6">Media Inquiries</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D3D3D] font-light mb-6">Get in Touch</h2>
          <p className="text-[#8B8178] font-light leading-relaxed mb-10">
            For press inquiries, collaborations, or media features, please reach out to our team.
          </p>
          <a href="mailto:hello@bonddesigncompany.com"
            className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-light
            hover:bg-[#3D3D3D] hover:text-white transition-all duration-500">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
