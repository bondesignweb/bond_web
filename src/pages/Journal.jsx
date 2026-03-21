import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function Journal() {
  const [hoveredPost, setHoveredPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/journal')
      .then(r => r.json())
      .then(data => {
        setAllPosts(data.map(p => ({
          title: p.title,
          date: p.created_at ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
          category: p.category,
          excerpt: p.excerpt,
          image: p.cover_image,
          page: p.page_route,
          featured: p.featured,
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const latestPost = allPosts.find(p => p.featured) || allPosts[0] || {
    title: '', date: '', category: '', excerpt: '', image: '', page: ''
  };
  const posts = allPosts.filter(p => p !== latestPost);

  if (loading || allPosts.length === 0) return (
    <div className="bg-[#F8F6F3] min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-[#F8F6F3] min-h-screen">

      {/* ═══ HERO — Latest Post ═══ */}
      <section className="relative h-screen max-h-[800px] overflow-hidden">
        <img
          src={latestPost.image}
          alt={latestPost.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="px-8 md:px-16 lg:px-24 pb-16 md:pb-20 max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Latest Post</span>
              <span className="w-8 h-px bg-white/30" />
              <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">{latestPost.category}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-5 leading-[1.1] uppercase">
              {latestPost.title}
            </h1>

            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-8 max-w-xl">
              {latestPost.excerpt}
            </p>

            <Link
              to={createPageUrl(latestPost.page)}
              className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-3.5 text-[10px] tracking-[0.25em] uppercase
              hover:bg-white hover:text-[#3D3D3D] transition-all duration-500"
            >
              Read Article
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION LABEL ═══ */}
      <div className="py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase mb-4">Design Insights & Stories</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] font-light">From the Studio</h2>
        </motion.div>
      </div>

      {/* ═══ EDITORIAL GRID ═══ */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-[1300px] mx-auto">

          {/* First row: Large left + Small right */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Large feature */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-7"
              onMouseEnter={() => setHoveredPost(0)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <Link to={createPageUrl(posts[0].page)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#8B7355] text-[9px] tracking-[0.2em] uppercase">{posts[0].category}</span>
                    <span className="w-4 h-px bg-[#D5D0C8]" />
                    <span className="text-[#B5B0A8] text-[9px] tracking-[0.15em]">{posts[0].date}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#3D3D3D] leading-tight mb-3 group-hover:text-[#8B7355] transition-colors duration-300">
                    {posts[0].title}
                  </h3>
                  <p className="text-[#8B8178] font-light text-sm leading-relaxed max-w-md">{posts[0].excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[#8B7355] text-[10px] tracking-[0.2em] uppercase mt-4 group-hover:gap-3 transition-all">
                    Continue Reading
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Small right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="md:col-span-5"
              onMouseEnter={() => setHoveredPost(1)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <Link to={createPageUrl(posts[1].page)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={posts[1].image}
                    alt={posts[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>
                <div className="mt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#8B7355] text-[9px] tracking-[0.2em] uppercase">{posts[1].category}</span>
                    <span className="w-4 h-px bg-[#D5D0C8]" />
                    <span className="text-[#B5B0A8] text-[9px] tracking-[0.15em]">{posts[1].date}</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-[#3D3D3D] leading-tight mb-3 group-hover:text-[#8B7355] transition-colors duration-300">
                    {posts[1].title}
                  </h3>
                  <p className="text-[#8B8178] font-light text-sm leading-relaxed">{posts[1].excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-[#8B7355] text-[10px] tracking-[0.2em] uppercase mt-4 group-hover:gap-3 transition-all">
                    Continue Reading
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E5E1DC] my-12 md:my-16" />

          {/* Second row: Two equal columns */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {posts.slice(2).map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredPost(i + 2)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <Link to={createPageUrl(post.page)} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#8B7355] text-[9px] tracking-[0.2em] uppercase">{post.category}</span>
                      <span className="w-4 h-px bg-[#D5D0C8]" />
                      <span className="text-[#B5B0A8] text-[9px] tracking-[0.15em]">{post.date}</span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-[#3D3D3D] leading-tight mb-3 group-hover:text-[#8B7355] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-[#8B8178] font-light text-sm leading-relaxed">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-[#8B7355] text-[10px] tracking-[0.2em] uppercase mt-4 group-hover:gap-3 transition-all">
                      Continue Reading
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM SECTION ═══ */}
      <section className="py-20 bg-[#EDE9E3]">
        <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between mb-10"
          >
            <div className="text-center md:text-left mb-6 md:mb-0">
              <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase mb-2">Follow Along</p>
              <h3 className="font-serif text-2xl text-[#3D3D3D]">@bonddesigncompany</h3>
            </div>
            
            <a
              href="https://www.instagram.com/bonddesigncompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#3D3D3D] text-[#3D3D3D] px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase
              hover:bg-[#3D3D3D] hover:text-white transition-all duration-500"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
              Follow on Instagram
            </a>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              'https://bonddesigncompany.com/wp-content/uploads/2025/10/16.png',
              'https://bonddesigncompany.com/wp-content/uploads/2025/10/38.png',
              'https://bonddesigncompany.com/wp-content/uploads/2025/10/cropped-33.png',
              'https://bonddesigncompany.com/wp-content/uploads/2025/05/7-1.png',
              'https://bonddesigncompany.com/wp-content/uploads/2025/04/1.png',
              'https://bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Philosophy.jpg',
              'https://bonddesigncompany.com/wp-content/uploads/2023/01/01-USD-WT23-Cover.jpg',
              'https://bonddesigncompany.com/wp-content/uploads/2022/06/Screen-Shot-2023-01-03-at-11.29.17-AM-scaled.jpg',
            ].map((img, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/bonddesigncompany/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden group"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#F8F6F3]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#8B7355] text-[10px] tracking-[0.4em] uppercase mb-6">Stay Inspired</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] font-light mb-6">Ready to Start Your Project?</h2>
          <p className="text-[#8B8178] font-light leading-relaxed mb-10">
            Every space has a story waiting to be told. Let us help you tell yours.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-10 py-4 text-[10px] tracking-[0.25em] uppercase font-light
            hover:bg-[#3D3D3D] hover:text-white transition-all duration-500"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
