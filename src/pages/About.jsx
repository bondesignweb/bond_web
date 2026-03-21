import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TeamMemberModal from '../components/TeamMemberModal';
// Team members loaded from API (supports publish/draft)

export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then(data => {
        // Map API fields to component fields
        setTeamMembers(data.map(m => ({
          id: m.id,
          name: m.name,
          title: m.title,
          image: m.image_path,
          bio: m.bio,
          zodiacSign: m.custom_fields?.zodiacSign || '',
          tvShow: m.custom_fields?.tvShow || '',
          hiddenTalent: m.custom_fields?.hiddenTalent || '',
          fashionTrend: m.custom_fields?.fashionTrend || '',
          alternativeCareer: m.custom_fields?.alternativeCareer || '',
          specialties: m.specialties,
          education: m.education,
          fun_fact: m.fun_fact,
          quote: m.quote,
          email: m.email,
          phone: m.phone,
          custom_fields: m.custom_fields || {},
        })));
      })
      .catch(console.error);
  }, []);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <div className="bg-[#F8F6F3]">
      <section className="py-20 px-6 md:px-16 lg:px-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-6">BOUTIQUE INTERIOR DESIGN · PARK CITY, UTAH</p>
          <h1 className="font-serif text-5xl text-[#3D3D3D] mb-8">Our Story</h1>
          <p className="text-[#6B6B6B] max-w-3xl mx-auto font-light leading-relaxed">
            Bond Design Company was founded in Park City, Utah with a simple but powerful conviction: the spaces we live in shape who we are.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-6 md:px-16 lg:px-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif italic text-3xl text-[#3D3D3D] mb-6">Born from a love of design and a belief in connection</h2>
            <p className="text-[#6B6B6B] font-light leading-relaxed mb-6">
              Bond Design Company was founded in Park City, Utah with a simple but powerful conviction: the spaces we live in shape who we are. When your home reflects your true self, something remarkable happens — you feel more at ease, more inspired, more you.
            </p>
            <p className="text-[#6B6B6B] font-light leading-relaxed">
              From the beginning, our goal has been to build a boutique firm where the client relationship comes first. We keep our team intentionally small and our attention fiercely personal. Every project we take on receives the full creative investment of our principals and designers.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#3D3D3D] text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
          {[
            { number: '2019', label: 'FOUNDED' },
            { number: '100+', label: 'PROJECTS COMPLETED' },
            { number: '11', label: 'TEAM MEMBERS' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-4xl text-white mb-2">{stat.number}</p>
              <p className="text-[#B8B8B8] text-xs tracking-[0.2em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 lg:px-32">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-4xl text-[#3D3D3D] text-center mb-16"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: 'Human Connection',
                description: 'We lead with relationships. Every project starts with listening — truly understanding who you are and how you live.'
              },
              {
                title: 'Authenticity',
                description: 'No two homes look the same because no two clients are the same. We resist trends in favor of timeless, personal design.'
              },
              {
                title: 'Creativity',
                description: 'We push past the expected. Our designers bring a fearless, layered approach to every space we touch.'
              },
              {
                title: 'Joy',
                description: 'Our ultimate measure of success is simple: does this space bring you joy? That question guides every decision we make.'
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-l-4 border-[#8B7355] pl-6"
              >
                <h3 className="font-serif italic text-2xl text-[#3D3D3D] mb-3">{value.title}</h3>
                <p className="text-[#6B6B6B] font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#EDE9E3]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-4">THE PEOPLE BEHIND THE WORK</p>
          <h2 className="font-serif text-4xl text-[#3D3D3D]">Our Team</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openModal(member)}
              className="cursor-pointer group"
            >
              <div className="overflow-hidden rounded-lg mb-4 h-96">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-xl text-[#3D3D3D] mb-1">{member.name}</h3>
              <p className="text-[#8B7355] text-xs tracking-[0.2em] uppercase font-light">{member.title}</p>
              {member.custom_fields && (member.custom_fields.instagram || member.custom_fields.linkedin || member.custom_fields.pinterest || member.custom_fields.facebook || member.custom_fields.twitter || member.custom_fields.website) && (
                <div className="flex items-center gap-2 mt-2" onClick={e => e.stopPropagation()}>
                  {member.custom_fields.instagram && (
                    <a href={member.custom_fields.instagram.startsWith('http') ? member.custom_fields.instagram : `https://instagram.com/${member.custom_fields.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#8B8178] hover:text-[#8B7355] transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                    </a>
                  )}
                  {member.custom_fields.linkedin && (
                    <a href={member.custom_fields.linkedin.startsWith('http') ? member.custom_fields.linkedin : `https://linkedin.com/in/${member.custom_fields.linkedin}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#8B8178] hover:text-[#8B7355] transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  )}
                  {member.custom_fields.pinterest && (
                    <a href={member.custom_fields.pinterest.startsWith('http') ? member.custom_fields.pinterest : `https://pinterest.com/${member.custom_fields.pinterest}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#8B8178] hover:text-[#8B7355] transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 21.2c1-.6 1.7-1.7 2-3l.7-2.8c.4.8 1.5 1.4 2.6 1.4 3.5 0 5.9-3.2 5.9-7 0-3.7-3-6.5-7-6.5-5 0-7.7 3.4-7.7 7.1 0 1.7.9 3.8 2.4 4.5.2.1.4 0 .4-.2l.3-1"/></svg>
                    </a>
                  )}
                  {member.custom_fields.facebook && (
                    <a href={member.custom_fields.facebook.startsWith('http') ? member.custom_fields.facebook : `https://facebook.com/${member.custom_fields.facebook}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#8B8178] hover:text-[#8B7355] transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                  )}
                  {member.custom_fields.twitter && (
                    <a href={member.custom_fields.twitter.startsWith('http') ? member.custom_fields.twitter : `https://x.com/${member.custom_fields.twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#8B8178] hover:text-[#8B7355] transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.7 16h4.3L8.3 4H4z"/><path d="M4 20l6.8-8"/><path d="M20 4l-6.8 8"/></svg>
                    </a>
                  )}
                  {member.custom_fields.website && (
                    <a href={member.custom_fields.website.startsWith('http') ? member.custom_fields.website : `https://${member.custom_fields.website}`} target="_blank" rel="noopener noreferrer"
                      className="text-[#8B8178] hover:text-[#8B7355] transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z"/></svg>
                    </a>
                  )}
                </div>
              )}
              <p className="text-[#6B6B6B] font-light text-sm mt-3 leading-relaxed">{member.bio ? member.bio.substring(0, 100) + '...' : ''}</p>
              <button className="text-[#3D3D3D] text-sm tracking-[0.1em] mt-4 hover:text-[#8B7355] transition-colors font-light">
                LEARN MORE →
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
