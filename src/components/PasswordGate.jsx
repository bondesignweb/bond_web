import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SITE_PASSWORD = 'bond2026';

export default function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('bond_site_auth');
    if (stored === 'true') setAuthenticated(true);
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem('bond_site_auth', 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (loading) return null;
  if (authenticated) return children;

  return (
    <div className="fixed inset-0 bg-[#F8F6F3] z-[9999] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-sm w-full"
      >
        {/* Logo */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-[#3D3D3D] tracking-[0.15em] leading-tight">
            BO<span className="block -mt-2">ND</span>
          </h1>
          <p className="text-[#8B7355] text-[9px] tracking-[0.4em] uppercase mt-3">Design Company</p>
        </div>

        {/* Message */}
        <p className="text-[#8B8178] font-light text-sm mb-8 leading-relaxed">
          This site is currently under development.<br />
          Enter the password to preview.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              className={`w-full bg-transparent border-b ${error ? 'border-red-400' : 'border-[#D5D0C8]'} py-3 text-center text-[#3D3D3D] placeholder-[#C5C0B8] focus:outline-none focus:border-[#8B7355] transition-colors text-sm tracking-[0.15em] font-light`}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400/80 text-[10px] tracking-wider"
            >
              Incorrect password
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-[#3D3D3D] text-white py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-[#8B7355] transition-all duration-500 font-light"
          >
            Enter Site
          </button>
        </form>

        <p className="text-[#C5C0B8] text-[9px] tracking-wider mt-8">
          Park City, Utah
        </p>
      </motion.div>
    </div>
  );
}
