import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fieldLabels = {
  zodiacSign: 'Zodiac Sign',
  tvShow: 'The Last TV Show I Binge-Watched',
  hiddenTalent: 'One Of My Hidden Talents',
  fashionTrend: "The Worst Fashion Trend(s) I've Ever Participated In",
  alternativeCareer: "If I Weren't So Good at My Current Job, Then I Would Be a(n)",
  seasonalColor: 'Seasonal Color Analysis',
  designRuleToBreak: 'A Design Rule I Love To Break',
  notWorking: "When I'm Not Working, You Can Find Me...",
  biggestPetPeeve: 'Biggest Pet Peeve',
  ifAnimal: 'If I Were An Animal, I Would Be A',
  favoritePasta: 'Favorite Pasta Shape',
  karaoSong: 'My Go-To Karaoke Song',
  celebrityCrush: 'First Celebrity Crush',
  favoriteWord: 'Favorite Word In The English Language',
};

const socialKeys = ['instagram', 'linkedin', 'pinterest', 'facebook', 'twitter', 'website'];

const socialIcons = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  pinterest: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><path d="M8 21.2c1-.6 1.7-1.7 2-3l.7-2.8c.4.8 1.5 1.4 2.6 1.4 3.5 0 5.9-3.2 5.9-7 0-3.7-3-6.5-7-6.5-5 0-7.7 3.4-7.7 7.1 0 1.7.9 3.8 2.4 4.5.2.1.4 0 .4-.2l.3-1"/>
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l11.7 16h4.3L8.3 4H4z"/><path d="M4 20l6.8-8"/><path d="M20 4l-6.8 8"/>
    </svg>
  ),
  website: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z"/>
    </svg>
  ),
};

function getSocialUrl(key, value) {
  if (!value) return null;
  if (value.startsWith('http')) return value;
  const v = value.replace(/^@/, '');
  switch (key) {
    case 'instagram': return `https://instagram.com/${v}`;
    case 'linkedin': return value.includes('linkedin.com') ? `https://${value}` : `https://linkedin.com/in/${v}`;
    case 'pinterest': return value.includes('pinterest.com') ? `https://${value}` : `https://pinterest.com/${v}`;
    case 'facebook': return value.includes('facebook.com') ? `https://${value}` : `https://facebook.com/${v}`;
    case 'twitter': return `https://x.com/${v}`;
    case 'website': return `https://${value}`;
    default: return value;
  }
}

export default function TeamMemberModal({ member, isOpen, onClose }) {
  if (!member) return null;

  const allFields = [];
  const builtInKeys = Object.keys(fieldLabels);
  builtInKeys.forEach(key => {
    if (member[key]) allFields.push({ label: fieldLabels[key], value: member[key] });
  });
  if (member.specialties) allFields.push({ label: 'Specialties', value: member.specialties });
  if (member.education) allFields.push({ label: 'Education', value: member.education });
  if (member.fun_fact) allFields.push({ label: 'Fun Fact', value: member.fun_fact });
  if (member.quote) allFields.push({ label: 'Favorite Quote', value: member.quote });

  // Custom fields (excluding social keys)
  if (member.custom_fields && typeof member.custom_fields === 'object') {
    Object.entries(member.custom_fields).forEach(([key, value]) => {
      if (value && typeof value === 'string' && value.trim() && !builtInKeys.includes(key) && !socialKeys.includes(key)) {
        allFields.push({ label: key, value });
      }
    });
  }

  // Collect social links
  const socials = [];
  if (member.custom_fields && typeof member.custom_fields === 'object') {
    socialKeys.forEach(key => {
      const val = member.custom_fields[key];
      if (val && val.trim()) {
        socials.push({ key, value: val, url: getSocialUrl(key, val) });
      }
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#E5E1DC] p-6 flex justify-between items-start z-10">
                <div>
                  <h2 className="font-serif text-3xl text-[#3D3D3D]">{member.name}</h2>
                  <p className="text-[#8B7355] text-sm tracking-[0.2em] mt-2 uppercase">{member.title}</p>
                  {socials.length > 0 && (
                    <div className="flex items-center gap-2 mt-3">
                      {socials.map(s => (
                        <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 border border-[#E5E1DC] flex items-center justify-center text-[#8B8178] hover:bg-[#8B7355] hover:text-white hover:border-[#8B7355] transition-all"
                          title={s.key.charAt(0).toUpperCase() + s.key.slice(1)}>
                          {socialIcons[s.key]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={onClose} className="text-[#3D3D3D] hover:text-[#8B7355] transition-colors flex-shrink-0">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                {/* Photo */}
                <div className="mb-8 w-full">
                  <img src={member.image} alt={member.name} className="w-full h-auto max-h-96 object-contain" />
                </div>

                {/* Bio with paragraph support */}
                {member.bio && (
                  <div className="text-[#6B6B6B] leading-relaxed mb-8 font-light space-y-4">
                    {member.bio.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}



                {/* Contact */}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-[#8B7355] text-sm font-light mb-2 block hover:underline">
                    {member.email}
                  </a>
                )}

                {/* Profile fields */}
                {allFields.length > 0 && (
                  <>
                    <div className="w-full h-px bg-[#E5E1DC] my-8" />
                    <div className="space-y-6">
                      {allFields.map((field, i) => (
                        <div key={i}>
                          <h3 className="font-serif text-lg text-[#3D3D3D] italic mb-2">{field.label}:</h3>
                          <p className="text-[#6B6B6B] font-light">{field.value}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
