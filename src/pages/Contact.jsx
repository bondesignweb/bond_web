import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', idealStartDate: '', idealEndDate: '',
    services: [], projectLocation: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }); } catch(err) {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F6F3] flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-md">
          <div className="w-20 h-20 border border-[#8B7355]/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 className="font-serif text-5xl text-[#3D3D3D] font-light mb-4">Thank You</h2>
          <p className="text-[#8B8178] font-light leading-relaxed mb-10">We've received your inquiry and will be in touch soon to discuss your vision.</p>
          <a href="/" className="inline-block border border-[#3D3D3D] text-[#3D3D3D] px-10 py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#3D3D3D] hover:text-white transition-all duration-500">Return Home</a>
        </motion.div>
      </div>
    );
  }

  const inputClass = "w-full bg-transparent border-b border-[#D5D0C8] py-3.5 text-[#3D3D3D] placeholder-[#C5C0B8] focus:outline-none focus:border-[#8B7355] transition-colors text-sm tracking-wide font-light";
  const labelClass = "block text-[9px] text-[#8B7355] tracking-[0.3em] uppercase mb-2";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F6F3]">

      {/* ═══ LEFT PANEL — Typography + Info ═══ */}
      <div className="lg:w-[42%] bg-[#EDE9E3] relative overflow-hidden flex flex-col justify-between min-h-[50vh] lg:min-h-screen lg:sticky lg:top-0">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #8B7355 0.5px, transparent 0)', backgroundSize: '32px 32px'}} />

        <div className="relative z-10 px-8 md:px-14 lg:px-16 pt-36 lg:pt-44">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-[#8B7355] text-[9px] tracking-[0.5em] uppercase font-light mb-8">Park City, Utah</p>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#3D3D3D] font-light tracking-wide leading-[1.05]">
              Let's
            </h1>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#3D3D3D]/80 font-light tracking-wide leading-[1.05] italic">
              Bond
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-10 max-w-sm">
            <div className="w-10 h-px bg-[#8B7355]/40 mb-6" />
            <p className="text-[#6B6B6B] font-light text-sm leading-relaxed">
              Your home should tell your story. Each project comes with unique stylistic needs, and we're
              confident that together we can make your dreams a reality.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 px-8 md:px-14 lg:px-16 pb-12 lg:pb-16 mt-12">

          <div className="space-y-6">
            <div>
              <p className="text-[9px] text-[#8B7355]/60 tracking-[0.3em] uppercase mb-2">Email</p>
              <a href="mailto:hello@bonddesigncompany.com" className="text-[#3D3D3D] font-light text-sm hover:text-[#8B7355] transition-colors">
                hello@bonddesigncompany.com
              </a>
            </div>
            <div>
              <p className="text-[9px] text-[#8B7355]/60 tracking-[0.3em] uppercase mb-2">Location</p>
              <p className="text-[#3D3D3D] font-light text-sm">Park City, Utah</p>
            </div>
            <div>
              <p className="text-[9px] text-[#8B7355]/60 tracking-[0.3em] uppercase mb-3">Follow</p>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', url: 'https://www.instagram.com/bonddesigncompany/', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
                  { name: 'Pinterest', url: 'https://www.pinterest.com/bonddesigncompany/', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 21.2c1-.6 1.7-1.7 2-3l.7-2.8c.4.8 1.5 1.4 2.6 1.4 3.5 0 5.9-3.2 5.9-7 0-3.7-3-6.5-7-6.5-5 0-7.7 3.4-7.7 7.1 0 1.7.9 3.8 2.4 4.5.2.1.4 0 .4-.2l.3-1"/></svg> },
                  { name: 'Facebook', url: 'https://www.facebook.com/bonddesigncompany', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                ].map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#D5D0C8] flex items-center justify-center text-[#8B8178] hover:text-[#8B7355] hover:border-[#8B7355] transition-all"
                    title={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ RIGHT PANEL — Form ═══ */}
      <div className="lg:w-[58%] bg-[#F8F6F3]">
        <div className="px-8 md:px-14 lg:px-20 py-16 lg:py-36 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
            <p className="text-[9px] text-[#8B7355] tracking-[0.4em] uppercase mb-10">Client Inquiry</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className={inputClass} placeholder="Jane Smith" required />
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className={inputClass} placeholder="+1 (000) 000-0000" required />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={inputClass} placeholder="jane@example.com" required />
              </div>

              <div>
                <label className={labelClass}>Where Is Your Project Located?</label>
                <input type="text" name="projectLocation" value={formData.projectLocation} onChange={handleChange}
                  className={inputClass} placeholder="Park City, UT" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Ideal Start Date</label>
                  <input type="date" name="idealStartDate" value={formData.idealStartDate} onChange={handleChange}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Ideal End Date</label>
                  <input type="date" name="idealEndDate" value={formData.idealEndDate} onChange={handleChange}
                    className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>What design services are you interested in?</label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {['New Construction', 'Remodel', 'Interior Furnishings'].map(service => (
                    <button key={service} type="button" onClick={() => handleServiceChange(service)}
                      className={`px-5 py-2.5 text-[9px] tracking-[0.25em] uppercase transition-all duration-300 ${
                        formData.services.includes(service)
                          ? 'bg-[#3D3D3D] text-white border border-[#3D3D3D]'
                          : 'bg-transparent text-[#6B6B6B] border border-[#D5D0C8] hover:border-[#8B7355] hover:text-[#8B7355]'
                      }`}>
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Tell Us About Your Vision</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4}
                  className={inputClass + " resize-none mt-1"}
                  placeholder="Share your vision, style preferences, timeline, or any questions..." />
              </div>

              <div className="pt-4">
                <button type="submit"
                  className="w-full md:w-auto bg-[#3D3D3D] text-white px-16 py-4 text-[10px] tracking-[0.3em] uppercase
                  hover:bg-[#8B7355] transition-all duration-500 font-light">
                  Submit Inquiry
                </button>
                <p className="text-[#B5B0A8] text-[9px] mt-4 tracking-wider font-light">
                  We typically respond within 24–48 hours.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
