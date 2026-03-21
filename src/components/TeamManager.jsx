import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '@/utils/adminApi';
import ImagePicker from '@/components/ImagePicker';

const EMPTY_FORM = {
  name: '', title: '', bio: '', image_path: '', email: '', phone: '',
  specialties: '', education: '', fun_fact: '', quote: '', custom_fields: {}, active: 1
};

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [newFieldKey, setNewFieldKey] = useState('');

  useEffect(() => {
    fetch('/api/team?all=true', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem('bond_token') } }).then(r => r.json())
      .then(data => { setMembers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openAdd = () => {
    setEditMember(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (member) => {
    setEditMember(member);
    setForm({
      name: member.name || '',
      title: member.title || '',
      bio: member.bio || '',
      image_path: member.image_path || '',
      email: member.email || '',
      phone: member.phone || '',
      specialties: member.specialties || '',
      education: member.education || '',
      fun_fact: member.fun_fact || '',
      quote: member.quote || '',
      custom_fields: member.custom_fields || {},
      active: member.active !== undefined ? member.active : 1,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form };
    if (editMember) {
      api.team.update(editMember.id, data).then(updated => {
        setMembers(members.map(m => m.id === editMember.id ? { ...m, ...updated } : m));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.team.create(data).then(created => {
        setMembers([...members, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this team member?')) {
      api.team.delete(id).then(() => setMembers(members.filter(m => m.id !== id)));
    }
  };

  const addCustomField = () => {
    const key = newFieldKey.trim();
    if (!key) return;
    setForm({ ...form, custom_fields: { ...form.custom_fields, [key]: '' } });
    setNewFieldKey('');
  };

  const updateCustomField = (key, value) => {
    setForm({ ...form, custom_fields: { ...form.custom_fields, [key]: value } });
  };

  const removeCustomField = (key) => {
    const cf = { ...form.custom_fields };
    delete cf[key];
    setForm({ ...form, custom_fields: cf });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/30 text-xs">{members.length} team members</p>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
          <span>+</span> Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map(member => (
          <div key={member.id} className="group bg-[#1a1a1a] border border-white/5 hover:border-[#8B7355]/30 transition-all overflow-hidden">
            {/* Photo */}
            <div className="relative aspect-[3/4] bg-[#111] overflow-hidden">
              {member.image_path ? (
                <img src={member.image_path} alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10 text-4xl font-serif">
                  {member.name?.charAt(0)}
                </div>
              )}
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button onClick={() => openEdit(member)}
                    className="bg-white/10 backdrop-blur-sm text-white p-2.5 hover:bg-white/20 transition-colors"
                    title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button onClick={() => {
                    const newActive = member.active ? 0 : 1;
                    api.team.update(member.id, { active: newActive }).then(updated => {
                      setMembers(members.map(m => m.id === member.id ? { ...m, active: newActive } : m));
                    });
                  }}
                    className={`backdrop-blur-sm p-2.5 transition-colors ${member.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/30 hover:bg-white/20'}`}
                    title={member.active ? 'Unpublish' : 'Publish'}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(member.id)}
                    className="bg-white/10 backdrop-blur-sm text-red-400/70 p-2.5 hover:bg-red-500/20 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Info */}
            <div className="p-3">
              <div className="flex items-center gap-2">
                <h3 className="text-white/80 text-sm font-light tracking-wide">{member.name}</h3>
                <span className={`text-[7px] tracking-wider uppercase px-1.5 py-0.5 ${member.active ? 'bg-emerald-500/20 text-emerald-400/80' : 'bg-white/5 text-white/25'}`}>
                  {member.active ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-white/30 text-[10px] tracking-[0.1em] uppercase mt-0.5">{member.title}</p>
              {Object.keys(member.custom_fields || {}).length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/5">
                  {Object.entries(member.custom_fields).map(([k, v]) => (
                    <p key={k} className="text-white/15 text-[9px]"><span className="text-white/25">{k}:</span> {v}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ EDIT / CREATE MODAL ═══ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-6 pt-12 overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 w-full max-w-2xl mb-12"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-white font-light tracking-[0.1em] text-sm uppercase">
                  {editMember ? 'Edit Team Member' : 'New Team Member'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-white/30 hover:text-white text-xl">&times;</button>
              </div>

              <div className="p-6 space-y-5">
                {/* Photo + Name row */}
                <div className="flex gap-5">
                  {/* Photo */}
                  <div className="shrink-0">
                    <div className="w-28 h-36 bg-[#111] overflow-hidden border border-white/5 relative group cursor-pointer"
                      onClick={() => setImagePickerOpen(true)}>
                      {form.image_path ? (
                        <img src={form.image_path} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 text-3xl font-serif">
                          {form.name?.charAt(0) || '?'}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all">
                        <span className="text-white/0 group-hover:text-white/70 text-xs transition-all">Change</span>
                      </div>
                    </div>
                    <ImagePicker
                      isOpen={imagePickerOpen}
                      onClose={() => setImagePickerOpen(false)}
                      onSelect={(path) => setForm({...form, image_path: path})}
                      currentImage={form.image_path}
                    />
                  </div>
                  {/* Name + Title */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Name</label>
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                        placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Title / Role</label>
                      <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                        className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                        placeholder="e.g. Principal Designer" />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Bio</label>
                  <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3}
                    className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] resize-none leading-relaxed font-light"
                    placeholder="A short biography..." />
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Email</label>
                    <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="email@bond.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Phone</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="(435) 555-1234" />
                  </div>
                </div>

                {/* Profile fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Specialties</label>
                    <input value={form.specialties} onChange={e => setForm({...form, specialties: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="e.g. Mountain Modern, Rustic Luxury" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Education</label>
                    <input value={form.education} onChange={e => setForm({...form, education: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="e.g. BFA Interior Design, SCAD" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Fun Fact</label>
                  <input value={form.fun_fact} onChange={e => setForm({...form, fun_fact: e.target.value})}
                    className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                    placeholder="Something personal and fun..." />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Quote</label>
                  <input value={form.quote} onChange={e => setForm({...form, quote: e.target.value})}
                    className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light italic"
                    placeholder="A favorite design quote..." />
                </div>

                                {/* Social Media */}
                <div className="border-t border-white/5 pt-4">
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-3">Social Media</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'instagram', label: 'Instagram', placeholder: '@bonddesign' },
                      { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/...' },
                      { key: 'pinterest', label: 'Pinterest', placeholder: 'pinterest.com/...' },
                      { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/...' },
                      { key: 'twitter', label: 'X / Twitter', placeholder: '@handle' },
                      { key: 'website', label: 'Website', placeholder: 'https://...' },
                    ].map(s => (
                      <div key={s.key}>
                        <label className="block text-[9px] tracking-wider text-white/25 uppercase mb-1">{s.label}</label>
                        <input
                          value={(form.custom_fields || {})[s.key] || ''}
                          onChange={e => setForm({...form, custom_fields: {...(form.custom_fields || {}), [s.key]: e.target.value}})}
                          className="w-full bg-transparent border border-white/10 px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                          placeholder={s.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status toggle */}
                <div className="flex items-center justify-between py-3 border-t border-white/5">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] text-white/40 uppercase">Status</label>
                    <p className="text-white/15 text-[9px] mt-0.5">Draft members are hidden from the public site</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setForm({...form, active: 0})}
                      className={`px-3 py-1.5 text-[10px] tracking-wider uppercase transition-all ${
                        !form.active ? 'bg-white/10 text-white/50 border border-white/20' : 'text-white/20 border border-white/5 hover:border-white/10'
                      }`}>Draft</button>
                    <button type="button" onClick={() => setForm({...form, active: 1})}
                      className={`px-3 py-1.5 text-[10px] tracking-wider uppercase transition-all ${
                        form.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/20 border border-white/5 hover:border-white/10'
                      }`}>Published</button>
                  </div>
                </div>

                {/* ═══ CUSTOM FIELDS ═══ */}
                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] tracking-[0.15em] text-white/40 uppercase">Custom Profile Fields</label>
                    <p className="text-white/15 text-[9px]">Add any extra info to display on their profile</p>
                  </div>

                  {/* Existing custom fields */}
                  {Object.entries(form.custom_fields || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 mb-2">
                      <span className="text-[#8B7355] text-[10px] tracking-wider uppercase w-28 shrink-0 truncate" title={key}>{key}</span>
                      <input value={value} onChange={e => updateCustomField(key, e.target.value)}
                        className="flex-1 bg-transparent border border-white/10 px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light" />
                      <button onClick={() => removeCustomField(key)}
                        className="text-white/15 hover:text-red-400 transition-colors text-sm px-1">✕</button>
                    </div>
                  ))}

                  {/* Add new custom field */}
                  <div className="flex items-center gap-2 mt-3">
                    <input value={newFieldKey} onChange={e => setNewFieldKey(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCustomField()}
                      placeholder="Field name (e.g. Instagram, Hobby)..."
                      className="flex-1 bg-transparent border border-dashed border-white/10 px-3 py-1.5 text-white/50 text-[10px] focus:outline-none focus:border-[#8B7355]" />
                    <button onClick={addCustomField}
                      className="px-3 py-1.5 border border-dashed border-white/10 text-white/20 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors text-[10px] tracking-wider uppercase">
                      + Add Field
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button onClick={handleSave}
                    className="flex-1 bg-[#8B7355] text-white py-3 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
                    {editMember ? 'Save Changes' : 'Add Team Member'}
                  </button>
                  <button onClick={() => setModalOpen(false)}
                    className="px-6 border border-white/10 text-white/40 py-3 text-xs tracking-[0.15em] uppercase hover:border-white/30 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
