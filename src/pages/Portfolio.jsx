import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { title: 'Canyon Cool', image: '/uploads/portfolio-covers/canyon-cool.png', slug: 'CanyonCool', category: 'Remodel', location: 'Park City', year: '2026' },
  { title: 'Laurel Creek', image: '/uploads/portfolio-covers/laurel-creek.png', slug: 'LaurelCreek', category: 'New Construction', location: 'Park City', year: '2025' },
  { title: 'Fifth Avenue Ranch', image: '/uploads/portfolio-covers/fifth-avenue-ranch.png', slug: 'FifthAvenueRanch', category: 'Interior Furnishings', location: 'Salt Lake City', year: '2025' },
  { title: 'The Bridge House', image: '/uploads/portfolio-covers/the-bridge-house.png', slug: 'TheBridgeHouse', category: 'New Construction', location: 'Park City', year: '2025' },
  { title: 'Into The Woods', image: '/uploads/portfolio-covers/into-the-woods.png', slug: 'IntoTheWoods', category: 'Remodel', location: 'Salt Lake City', year: '2022' },
  { title: 'Sapphire Ridge', image: '/uploads/portfolio-covers/sapphire-ridge.png', slug: 'SapphireRidge', category: 'New Construction', location: 'Deer Valley', year: '2025' },
  { title: 'Modern Meadow Remodel', image: '/uploads/portfolio-covers/modern-meadow-remodel.png', slug: 'ModernMeadowRemodel', category: 'Remodel', location: 'Park City', year: '2022' },
  { title: 'The Court House', image: '/uploads/portfolio-covers/the-court-house.jpg', slug: 'TheCourtHouse', category: 'Interior Furnishings', location: 'Deer Valley', year: '2022' },
  { title: 'Summit 4', image: '/uploads/portfolio-covers/summit-4.png', slug: 'Summit4', category: 'New Construction', location: 'Deer Valley', year: '2022' },
];

const categories = ['All', 'New Construction', 'Remodel', 'Interior Furnishings'];
const locations = ['All Locations', 'Park City', 'Salt Lake City', 'Deer Valley'];

function ProjectCard({ project, index, isLarge }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden flex-1"
    >
      <Link to={createPageUrl(project.slug)} className="block relative overflow-hidden h-full">
        <div className={isLarge ? 'aspect-[16/10]' : 'h-full min-h-[200px]'}>
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent group-hover:from-black/75 transition-all duration-500" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <div className="overflow-hidden mb-1">
            <p className="text-white/50 text-[9px] tracking-[0.25em] uppercase font-light translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              {project.category} &middot; {project.location}
            </p>
          </div>
          <h2 className={`font-serif text-white font-light tracking-[0.04em] leading-tight ${isLarge ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}`}>
            {project.title}
          </h2>
          <div className="overflow-hidden mt-3">
            <div className="flex items-center gap-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">
              <span className="text-white/60 text-[9px] tracking-[0.2em] uppercase font-light">View Project</span>
              <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All Locations');

  const filtered = projects.filter(p => {
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (activeLocation !== 'All Locations' && p.location !== activeLocation) return false;
    return true;
  });

  return (
    <div className="bg-[#F8F6F3] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase font-light mb-6">Selected Work</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#3D3D3D] font-light tracking-wide">Our Portfolio</h1>
            <p className="text-[#8B8178] text-base font-light mt-6 max-w-lg mx-auto leading-relaxed">
              Each project tells a unique story — spaces designed with intention, crafted with care, and rooted in the way you live.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filters */}
      <section className="sticky top-0 z-30 bg-[#F8F6F3]/95 backdrop-blur-md border-b border-[#E5E1DC]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                    activeCategory === cat ? 'bg-[#3D3D3D] text-white' : 'text-[#8B8178] hover:text-[#3D3D3D] border border-[#D5D0C8] hover:border-[#3D3D3D]'
                  }`}>{cat}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {locations.map(loc => (
                <button key={loc} onClick={() => setActiveLocation(loc)}
                  className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                    activeLocation === loc ? 'bg-[#8B7355] text-white' : 'text-[#8B8178] hover:text-[#3D3D3D] border border-[#D5D0C8] hover:border-[#8B7355]'
                  }`}>{loc}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects — Structured Rows */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.p key={filtered.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[#8B8178] text-xs tracking-[0.2em] uppercase font-light mb-10">
            {filtered.length} Project{filtered.length !== 1 ? 's' : ''}
          </motion.p>

          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-3">
              {/* Build rows: alternate between [1 large + 2 small] and [3 equal] */}
              {(() => {
                const rows = [];
                let i = 0;
                let rowIndex = 0;

                while (i < filtered.length) {
                  const remaining = filtered.length - i;

                  if (rowIndex % 3 === 0 && remaining >= 3) {
                    // Row type A: 1 large (60%) + 2 stacked small (40%)
                    rows.push(
                      <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="md:col-span-3">
                          <ProjectCard project={filtered[i]} index={i} isLarge={true} />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-3" style={{minHeight: 0}}>
                          <ProjectCard project={filtered[i+1]} index={i+1} />
                          <ProjectCard project={filtered[i+2]} index={i+2} />
                        </div>
                      </div>
                    );
                    i += 3;
                  } else if (rowIndex % 3 === 1 && remaining >= 3) {
                    // Row type B: 3 equal columns
                    rows.push(
                      <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <ProjectCard project={filtered[i]} index={i} />
                        <ProjectCard project={filtered[i+1]} index={i+1} />
                        <ProjectCard project={filtered[i+2]} index={i+2} />
                      </div>
                    );
                    i += 3;
                  } else if (rowIndex % 3 === 2 && remaining >= 3) {
                    // Row type C: 2 stacked small (40%) + 1 large (60%)
                    rows.push(
                      <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="md:col-span-2 flex flex-col gap-3" style={{minHeight: 0}}>
                          <ProjectCard project={filtered[i]} index={i} />
                          <ProjectCard project={filtered[i+1]} index={i+1} />
                        </div>
                        <div className="md:col-span-3">
                          <ProjectCard project={filtered[i+2]} index={i+2} isLarge={true} />
                        </div>
                      </div>
                    );
                    i += 3;
                  } else if (remaining === 2) {
                    rows.push(
                      <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ProjectCard project={filtered[i]} index={i} />
                        <ProjectCard project={filtered[i+1]} index={i+1} />
                      </div>
                    );
                    i += 2;
                  } else {
                    rows.push(
                      <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <ProjectCard project={filtered[i]} index={i} isLarge={true} />
                        </div>
                      </div>
                    );
                    i += 1;
                  }
                  rowIndex++;
                }
                return rows;
              })()}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 bg-[#EDE9E3]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase font-light mb-6">Ready to start?</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#3D3D3D] font-light mb-6 italic">
            Let's <span className="not-italic">BOND</span>
          </h2>
          <p className="text-[#8B8178] font-light leading-relaxed mb-10">
            Every project begins with a conversation. Tell us about your vision and we'll bring it to life.
          </p>
          <Link to={createPageUrl('Contact')}
            className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-light
            hover:bg-[#3D3D3D] hover:text-white transition-all duration-500">
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
