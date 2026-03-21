import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '@/utils/adminApi';
import ImagePicker from '@/components/ImagePicker';

const EMPTY_FORM = {
  title: '', slug: '', category: '', excerpt: '', content: '', cover_image: '', page_route: '', status: 'draft', featured: false
};

export default function JournalManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.journal.list(true)
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openAdd = () => { setEditPost(null); setForm(EMPTY_FORM); setModalOpen(true); };

  const openEdit = (post) => {
    setEditPost(post);
    setForm({
      title: post.title || '', slug: post.slug || '', category: post.category || '',
      excerpt: post.excerpt || '', content: post.content || '', cover_image: post.cover_image || '',
      page_route: post.page_route || '', status: post.status || 'draft', featured: !!post.featured
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form, featured: form.featured ? 1 : 0 };
    if (editPost) {
      api.journal.update(editPost.id, data).then(updated => {
        setPosts(posts.map(p => p.id === editPost.id ? { ...p, ...updated } : p));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.journal.create(data).then(created => {
        setPosts([...posts, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this journal post?')) {
      api.journal.delete(id).then(() => setPosts(posts.filter(p => p.id !== id)));
    }
  };

  const toggleStatus = (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    api.journal.update(post.id, { status: newStatus }).then(updated => {
      setPosts(posts.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
    });
  };

  const filtered = posts.filter(p => {
    if (filter === 'published') return p.status === 'published';
    if (filter === 'draft') return p.status === 'draft';
    return true;
  });

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-6 h-6 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <p className="text-white/30 text-xs">{posts.length} posts</p>
          <div className="flex gap-1">
            {['all', 'published', 'draft'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 text-[10px] tracking-wider uppercase transition-all border ${
                  filter === f ? 'border-[#8B7355] text-[#8B7355] bg-[#8B7355]/10' : 'border-white/10 text-white/30 hover:text-white/50'
                }`}>{f}</button>
            ))}
          </div>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
          <span>+</span> New Post
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(post => (
          <div key={post.id} className="group bg-[#1a1a1a] border border-white/5 hover:border-[#8B7355]/30 transition-all overflow-hidden">
            <div className="relative aspect-video bg-[#111] overflow-hidden">
              {post.cover_image ? (
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/10 text-2xl font-serif">Journal</div>
              )}
              {/* Status + Featured badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                {post.featured ? <span className="text-[7px] tracking-wider uppercase px-1.5 py-0.5 bg-[#8B7355]/80 text-white">Featured</span> : null}
                <span className={`text-[7px] tracking-wider uppercase px-1.5 py-0.5 ${post.status === 'published' ? 'bg-emerald-500/80 text-white' : 'bg-white/20 text-white/60'}`}>
                  {post.status}
                </span>
              </div>
              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button onClick={() => openEdit(post)} className="bg-white/10 backdrop-blur-sm text-white p-2.5 hover:bg-white/20" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button onClick={() => toggleStatus(post)}
                    className={`backdrop-blur-sm p-2.5 transition-colors ${post.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/30'}`}
                    title={post.status === 'published' ? 'Unpublish' : 'Publish'}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="bg-white/10 backdrop-blur-sm text-red-400/70 p-2.5 hover:bg-red-500/20" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#8B7355] text-[8px] tracking-wider uppercase">{post.category}</span>
              </div>
              <h3 className="text-white/80 text-sm font-light tracking-wide leading-snug">{post.title}</h3>
              <p className="text-white/25 text-[10px] mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ═══ EDIT / CREATE MODAL ═══ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-6 pt-12 overflow-y-auto"
            onClick={() => setModalOpen(false)}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 w-full max-w-2xl mb-12"
              onClick={e => e.stopPropagation()}>

              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-white font-light tracking-[0.1em] text-sm uppercase">
                  {editPost ? 'Edit Post' : 'New Journal Post'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-white/30 hover:text-white text-xl">&times;</button>
              </div>

              <div className="p-6 space-y-5">
                {/* Cover image preview */}
                {form.cover_image && (
                  <div className="aspect-video bg-[#111] overflow-hidden border border-white/5">
                    <img src={form.cover_image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Title</label>
                  <input value={form.title} onChange={e => {
                    const title = e.target.value;
                    const slug = editPost ? form.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setForm({...form, title, slug});
                  }}
                    className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                    placeholder="Post title" />
                </div>

                {/* Slug + Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Slug</label>
                    <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2 text-white/50 text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="post-url-slug" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Category</label>
                    <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="e.g. Wallcoverings, Kitchen Design" />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Excerpt</label>
                  <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} rows={2}
                    className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] resize-none font-light"
                    placeholder="Brief description shown on the Journal page..." />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Cover Image</label>
                  <div className="flex gap-3">
                    <input value={form.cover_image} onChange={e => setForm({...form, cover_image: e.target.value})}
                      className="flex-1 bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355] font-light"
                      placeholder="Paste URL or browse..." />
                    <button type="button" onClick={() => setImagePickerOpen(true)}
                      className="px-4 border border-white/10 text-white/40 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors text-xs tracking-wider uppercase">
                      Browse
                    </button>
                  </div>
                  <ImagePicker isOpen={imagePickerOpen} onClose={() => setImagePickerOpen(false)}
                    onSelect={(path) => setForm({...form, cover_image: path})} currentImage={form.cover_image} />
                </div>

                {/* Page Route (for linking to existing blog pages) */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-1">Page Route (optional)</label>
                  <input value={form.page_route} onChange={e => setForm({...form, page_route: e.target.value})}
                    className="w-full bg-transparent border border-white/10 px-4 py-2 text-white/50 text-sm focus:outline-none focus:border-[#8B7355] font-light"
                    placeholder="e.g. BlogPaintPaletteLaurelCreek (links to existing page)" />
                  <p className="text-white/15 text-[9px] mt-1">Leave blank for posts without a dedicated page</p>
                </div>

                {/* Status + Featured */}
                <div className="flex items-center justify-between py-3 border-t border-white/5">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setForm({...form, status: 'draft'})}
                      className={`px-3 py-1.5 text-[10px] tracking-wider uppercase transition-all ${
                        form.status === 'draft' ? 'bg-white/10 text-white/50 border border-white/20' : 'text-white/20 border border-white/5'
                      }`}>Draft</button>
                    <button type="button" onClick={() => setForm({...form, status: 'published'})}
                      className={`px-3 py-1.5 text-[10px] tracking-wider uppercase transition-all ${
                        form.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/20 border border-white/5'
                      }`}>Published</button>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-white/30 text-[10px] tracking-wider uppercase">Featured</span>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${form.featured ? 'bg-[#8B7355]' : 'bg-white/10'}`}
                      onClick={() => setForm({...form, featured: !form.featured})}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${form.featured ? 'left-4' : 'left-0.5'}`} />
                    </div>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button onClick={handleSave}
                    className="flex-1 bg-[#8B7355] text-white py-3 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
                    {editPost ? 'Save Changes' : 'Create Post'}
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
