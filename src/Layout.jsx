import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { X, Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SITE_PASSWORD = 'Bond2026!';
const SESSION_KEY = 'bond_authed';

function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      onUnlock();
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full max-w-sm"
      >
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970514834be88a2873f329e/29a546d12_image.png"
          alt="Bond Design Company"
          className="h-24 w-auto mb-12"
        />
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            className={`w-full px-4 py-3 border bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] focus:outline-none transition-colors text-center tracking-[0.2em] ${error ? 'border-red-400' : 'border-[#D1CCC4] focus:border-[#3D3D3D]'}`}
          />
          {error && (
            <p className="text-red-400 text-xs tracking-[0.1em] text-center">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#3D3D3D] text-white py-3 text-sm tracking-[0.2em] hover:bg-[#2D2D2D] transition-colors"
          >
            ENTER
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHomePage = currentPageName === 'Home';



  const menuItems = [
    { name: 'Home', page: 'Home' },
    { name: 'Meet Bond', page: 'About' },
    { name: 'Services', page: 'Services' },
    { name: 'Portfolio', page: 'Portfolio' },
    { name: 'Journal', page: 'Journal' },
    { name: 'Press', page: 'Press' },
    { name: 'Contact', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${isHomePage ? 'bg-transparent' : 'bg-[#F8F6F3]'}`}>
        {/* Left - Hashtag */}
        <div className={`text-sm italic tracking-wide ${isHomePage ? 'text-white' : 'text-[#8B7355]'}`}>
          <a href="https://www.instagram.com/bonddesigncompany/" target="_blank" rel="noopener noreferrer" className="hover:text-[#8B7355] transition-colors">#letsbond</a>
        </div>

        {/* Center - Logo */}
        {!isHomePage && (
          <Link to={createPageUrl('Home')} className="absolute left-1/2 -translate-x-1/2">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970514834be88a2873f329e/29a546d12_image.png"
              alt="Bond Design Company"
              className="h-12 md:h-14 w-auto"
            />
          </Link>
        )}

        {/* Right - Menu Button */}
        <button 
          onClick={() => setMenuOpen(true)}
          className={`flex items-center gap-3 text-sm tracking-[0.15em] ${isHomePage ? 'text-white' : 'text-[#3D3D3D]'}`}
        >
          MENU
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-[1px] ${isHomePage ? 'bg-white' : 'bg-[#3D3D3D]'}`}></span>
            <span className={`block w-6 h-[1px] ${isHomePage ? 'bg-white' : 'bg-[#3D3D3D]'}`}></span>
          </div>
        </button>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#3D3D3D] z-[100] flex items-center justify-center"
          >
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-16"
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970514834be88a2873f329e/29a546d12_image.png"
                  alt="Bond Design Company"
                  className="h-14 md:h-16 w-auto mx-auto"
                />
              </motion.div>

              <nav>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + index * 0.1 }}
                  >
                    <Link
                      to={createPageUrl(item.page)}
                      onClick={() => setMenuOpen(false)}
                      className="block text-white font-serif text-3xl md:text-5xl tracking-[0.15em] py-3 hover:text-[#C4A77D] transition-colors duration-300"
                    >
                      {item.name.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="flex justify-center gap-6 mt-12"
              >
                <a href="https://www.instagram.com/bonddesigncompany/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C4A77D] transition-colors">
                  <Instagram size={24} strokeWidth={1} />
                </a>
                <a href="https://www.youtube.com/channel/UCHMh9ZrzCZyeXVwhA-VCi6A" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C4A77D] transition-colors">
                  <Youtube size={24} strokeWidth={1} />
                </a>
                <a href="https://www.facebook.com/bonddesigncompany" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C4A77D] transition-colors">
                  <Facebook size={24} strokeWidth={1} />
                </a>
                <a href="https://www.linkedin.com/company/bonddesigncompany" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C4A77D] transition-colors">
                  <Linkedin size={24} strokeWidth={1} />
                </a>
              </motion.div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#F8F6F3] border-t border-[#E5E1DB] py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Link to={createPageUrl('Home')}>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6970514834be88a2873f329e/29a546d12_image.png"
                alt="Bond Design Company"
                className="h-24 w-auto"
              />
            </Link>
          </div>

          {/* Newsletter Section */}
          <div className="max-w-md mx-auto text-center mb-12">
            <h4 className="font-serif text-xl text-[#3D3D3D] mb-6">Get our Newsletter</h4>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] focus:outline-none focus:border-[#3D3D3D] transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] focus:outline-none focus:border-[#3D3D3D] transition-colors"
              />
              <button className="w-full bg-[#3D3D3D] text-white py-3 text-sm tracking-[0.15em] hover:bg-[#2D2D2D] transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/bonddesigncompany/" target="_blank" rel="noopener noreferrer" className="text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors">
              <Instagram size={20} strokeWidth={1} />
            </a>
            <a href="https://www.youtube.com/channel/UCHMh9ZrzCZyeXVwhA-VCi6A" target="_blank" rel="noopener noreferrer" className="text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors">
              <Youtube size={20} strokeWidth={1} />
            </a>
            <a href="https://www.facebook.com/bonddesigncompany" target="_blank" rel="noopener noreferrer" className="text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors">
              <Facebook size={20} strokeWidth={1} />
            </a>
            <a href="https://www.linkedin.com/company/bonddesigncompany" target="_blank" rel="noopener noreferrer" className="text-[#6B6B6B] hover:text-[#3D3D3D] transition-colors">
              <Linkedin size={20} strokeWidth={1} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-[#9B9B9B] text-sm">
            © {new Date().getFullYear()} Bond Design Company. All rights reserved.
          </p>
              <a href="/admin" className="block text-center text-[10px] text-white/10 hover:text-[#8B7355]/50 tracking-[0.15em] uppercase transition-colors mt-3" style={{fontSize: "9px"}}>Admin</a>
        </div>
      </footer>
    </div>
  );
}