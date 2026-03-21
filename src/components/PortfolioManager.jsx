import ImagePicker from "@/components/ImagePicker";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '@/utils/adminApi';

// Categories and locations loaded from API
// (dynamic)
const STATUSES = ['All', 'Published', 'Draft'];

function PortfolioManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid | list
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(null);
  const fileRef = useRef(null);
  const [dynamicCategories, setDynamicCategories] = useState([]);
  const [dynamicLocations, setDynamicLocations] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);

  const CATEGORIES = ['All', ...dynamicCategories.map(c => c.name)];
  const LOCATIONS = ['All Locations', ...dynamicLocations.map(l => l.name)];
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  const [form, setForm] = useState({
    title: '', category: dynamicCategories[0]?.name || 'New Construction', location: dynamicLocations[0]?.name || 'Park City',
    description: '', year: '', status: 'Draft', featured: false, cover_image: ''
  });

  useEffect(() => {
    api.categories.list().then(setDynamicCategories).catch(console.error);
    api.locations.list().then(setDynamicLocations).catch(console.error);
  }, []);

  useEffect(() => {
    api.portfolios.list()
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filtered = projects.filter(p => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (locationFilter !== 'All Locations' && p.location !== locationFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    return true;
  });

  const openAdd = () => {
    setEditProject(null);
    setForm({ title: '', category: dynamicCategories[0]?.name || 'New Construction', location: dynamicLocations[0]?.name || 'Park City', description: '', year: new Date().getFullYear().toString(), status: 'Draft', featured: false, cover_image: '' });
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditProject(project);
    setForm({
      title: project.title, category: project.category || 'New Construction',
      location: project.location || 'Park City', description: project.description || '',
      year: project.year || '', status: project.status || 'Draft',
      featured: !!project.featured, cover_image: project.cover_image || ''
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form };
    if (editProject) {
      api.portfolios.update(editProject.id, data).then(updated => {
        setProjects(projects.map(p => p.id === editProject.id ? { ...p, ...updated } : p));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.portfolios.create(data).then(created => {
        setProjects([...projects, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project? This cannot be undone.')) {
      api.portfolios.delete(id).then(() => setProjects(projects.filter(p => p.id !== id))).catch(e => alert(e.message));
    }
  };

  const toggleFeatured = (id) => {
    const p = projects.find(x => x.id === id);
    api.portfolios.update(id, { featured: !p.featured }).then(updated => {
      setProjects(projects.map(x => x.id === id ? { ...x, ...updated } : x));
    }).catch(e => alert(e.message));
  };

  const toggleStatus = (id) => {
    const p = projects.find(x => x.id === id);
    const newStatus = p.status === 'Published' ? 'Draft' : 'Published';
    api.portfolios.update(id, { status: newStatus }).then(updated => {
      setProjects(projects.map(x => x.id === id ? { ...x, ...updated } : x));
    }).catch(e => alert(e.message));
  };


  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    api.categories.create(newCategory.trim()).then(cat => {
      setDynamicCategories([...dynamicCategories, cat]);
      setNewCategory('');
      setShowAddCategory(false);
    }).catch(e => alert(e.message || 'Category already exists'));
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Remove this category?')) {
      api.categories.delete(id).then(() => {
        setDynamicCategories(dynamicCategories.filter(c => c.id !== id));
      });
    }
  };

  const handleAddLocation = () => {
    if (!newLocation.trim()) return;
    api.locations.create(newLocation.trim()).then(loc => {
      setDynamicLocations([...dynamicLocations, loc]);
      setNewLocation('');
      setShowAddLocation(false);
    }).catch(e => alert(e.message || 'Location already exists'));
  };

  const handleDeleteLocation = (id) => {
    if (window.confirm('Remove this location?')) {
      api.locations.delete(id).then(() => {
        setDynamicLocations(dynamicLocations.filter(l => l.id !== id));
      });
    }
  };

  // Stats
  const publishedCount = projects.filter(p => p.status === 'Published').length;
  const featuredCount = projects.filter(p => p.featured).length;
  const categoryBreakdown = CATEGORIES.slice(1).map(c => ({
    name: c, count: projects.filter(p => p.category === c).length
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#1a1a1a] border border-white/5 p-4">
          <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mb-1">Total Projects</p>
          <p className="text-2xl text-white/80 font-light font-serif">{projects.length}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-4">
          <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mb-1">Published</p>
          <p className="text-2xl text-emerald-400/70 font-light font-serif">{publishedCount}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-4">
          <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mb-1">Featured</p>
          <p className="text-2xl text-[#8B7355] font-light font-serif">{featuredCount}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-4">
          <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mb-1">Categories</p>
          <div className="flex gap-2 mt-1">
            {categoryBreakdown.map(c => (
              <span key={c.name} className="text-[9px] text-white/25">{c.count} {c.name.split(' ')[0]}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category filters */}
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase transition-all border ${
                categoryFilter === c
                  ? 'border-[#8B7355] text-[#8B7355] bg-[#8B7355]/10'
                  : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
              }`}>
              {c}
            </button>
          ))}
          {showAddCategory ? (
            <div className="flex items-center gap-1">
              <input value={newCategory} onChange={e => setNewCategory(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                placeholder="New category..."
                className="bg-transparent border border-[#8B7355]/30 px-2 py-1 text-[10px] text-white/60 w-32 focus:outline-none focus:border-[#8B7355]" autoFocus />
              <button onClick={handleAddCategory} className="text-[#8B7355] text-xs px-1 hover:text-white">✓</button>
              <button onClick={() => setShowAddCategory(false)} className="text-white/20 text-xs px-1 hover:text-white/50">✕</button>
            </div>
          ) : (
            <button onClick={() => setShowAddCategory(true)}
              className="px-2 py-1.5 text-[10px] border border-dashed border-white/10 text-white/20 hover:border-[#8B7355]/30 hover:text-[#8B7355] transition-all"
              title="Add category">+</button>
          )}
          <span className="w-px h-5 bg-white/10 mx-1" />
          {/* Location filters */}
          {LOCATIONS.map(l => (
            <button key={l} onClick={() => setLocationFilter(l)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase transition-all border ${
                locationFilter === l
                  ? 'border-[#8B7355] text-[#8B7355] bg-[#8B7355]/10'
                  : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
              }`}>
              {l}
            </button>
          ))}
          {showAddLocation ? (
            <div className="flex items-center gap-1">
              <input value={newLocation} onChange={e => setNewLocation(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddLocation()}
                placeholder="New location..."
                className="bg-transparent border border-[#8B7355]/30 px-2 py-1 text-[10px] text-white/60 w-32 focus:outline-none focus:border-[#8B7355]" autoFocus />
              <button onClick={handleAddLocation} className="text-[#8B7355] text-xs px-1 hover:text-white">✓</button>
              <button onClick={() => setShowAddLocation(false)} className="text-white/20 text-xs px-1 hover:text-white/50">✕</button>
            </div>
          ) : (
            <button onClick={() => setShowAddLocation(true)}
              className="px-2 py-1.5 text-[10px] border border-dashed border-white/10 text-white/20 hover:border-[#8B7355]/30 hover:text-[#8B7355] transition-all"
              title="Add location">+</button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex border border-white/10">
            <button onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-white/10 text-white/60' : 'text-white/20'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </button>
            <button onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-white/10 text-white/60' : 'text-white/20'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
          {/* Status filter */}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="bg-[#0d0d0d] border border-white/10 text-white/40 text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 focus:outline-none focus:border-[#8B7355]">
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Project
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-white/20 text-xs mb-4">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>

      {/* ═══ GRID VIEW ═══ */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group bg-[#1a1a1a] border border-white/5 hover:border-[#8B7355]/30 transition-all overflow-hidden"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] bg-[#111] overflow-hidden">
                  {project.cover_image ? (
                    <img src={project.cover_image} alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.featured ? (
                      <span className="bg-[#8B7355] text-white text-[8px] tracking-[0.15em] uppercase px-2 py-1">Featured</span>
                    ) : null}
                    <span className={`text-[8px] tracking-[0.15em] uppercase px-2 py-1 ${
                      project.status === 'Published' ? 'bg-emerald-500/80 text-white' : 'bg-black/60 text-white/60'
                    }`}>{project.status}</span>
                  </div>
                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(project)}
                        className="bg-white/10 backdrop-blur-sm text-white p-2.5 hover:bg-white/20 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => toggleFeatured(project.id)}
                        className={`backdrop-blur-sm p-2.5 transition-colors ${project.featured ? 'bg-[#8B7355]/40 text-[#8B7355]' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                        ★
                      </button>
                      <button onClick={() => toggleStatus(project.id)}
                        className="bg-white/10 backdrop-blur-sm text-white p-2.5 hover:bg-white/20 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(project.id)}
                        className="bg-white/10 backdrop-blur-sm text-red-400/70 p-2.5 hover:bg-red-500/20 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-white/80 text-sm tracking-wide font-light">{project.title}</h3>
                      <p className="text-white/25 text-[10px] tracking-[0.1em] uppercase mt-1">
                        {project.category} · {project.location}
                      </p>
                    </div>
                    {project.year && (
                      <span className="text-white/15 text-xs font-serif">{project.year}</span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-white/20 text-xs mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] text-white/20">{project.image_count || 0} images</span>
                    <span className="text-white/10">·</span>
                    <span className="text-[9px] text-white/20">/{project.slug}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* ═══ LIST VIEW ═══ */
        <div className="space-y-2">
          {filtered.map(project => (
            <div key={project.id} className="bg-[#1a1a1a] border border-white/5 p-4 hover:border-[#8B7355]/20 transition-colors flex items-center gap-4">
              {/* Thumbnail */}
              <div className="w-24 h-16 bg-[#111] overflow-hidden shrink-0">
                {project.cover_image ? (
                  <img src={project.cover_image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-white/70 text-sm tracking-wide">{project.title}</h4>
                  {project.featured && <span className="text-[#8B7355] text-xs">★</span>}
                </div>
                <p className="text-white/20 text-[10px] tracking-[0.1em] uppercase mt-0.5">
                  {project.category} · {project.location} {project.year ? `· ${project.year}` : ''}
                </p>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${
                  project.status === 'Published' ? 'bg-emerald-400/10 text-emerald-400/70' : 'bg-white/5 text-white/30'
                }`}>{project.status}</span>
                <button onClick={() => openEdit(project)} className="p-1.5 text-white/20 hover:text-[#8B7355] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-white/15 text-sm">No projects match these filters</p>
        </div>
      )}

      {/* ═══ EDIT / CREATE MODAL ═══ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-6 pt-20 overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 w-full max-w-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h3 className="text-white font-light tracking-[0.1em] text-sm uppercase">
                  {editProject ? 'Edit Project' : 'New Project'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-white/30 hover:text-white text-xl">&times;</button>
              </div>

              <div className="p-6 space-y-5">
                {/* Cover image preview */}
                {form.cover_image && (
                  <div className="relative aspect-[16/9] bg-[#111] overflow-hidden mb-4">
                    <img src={form.cover_image} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/60 text-white/60 text-[9px] tracking-wider px-2 py-1">COVER IMAGE</span>
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Project Title</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-base font-light focus:outline-none focus:border-[#8B7355] transition-colors font-serif tracking-wide"
                    placeholder="e.g. Canyon Cool" />
                </div>

                {/* Category + Location row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Category</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                      {dynamicCategories.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Location</label>
                    <select value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                      {dynamicLocations.map(l => <option key={l.id}>{l.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Year + Status row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Year</label>
                    <input value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                      className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]"
                      placeholder="2025" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                      className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                      <option>Draft</option>
                      <option>Published</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    rows={3}
                    className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] resize-none leading-relaxed"
                    placeholder="A brief description of the project, its design vision, and key features..." />
                </div>
                {/* Cover image */}
                <div>
                  <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Cover Image</label>
                  <div className="flex gap-3">
                    <input value={form.cover_image} onChange={e => setForm({...form, cover_image: e.target.value})}
                      className="flex-1 bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]"
                      placeholder="Paste URL or choose from gallery..." />
                    <button type="button" onClick={() => setImagePickerOpen(true)}
                      className="px-4 border border-white/10 text-white/40 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors text-xs tracking-wider uppercase">
                      Browse
                    </button>
                  </div>
                  <ImagePicker
                    isOpen={imagePickerOpen}
                    onClose={() => setImagePickerOpen(false)}
                    onSelect={(path) => setForm({...form, cover_image: path})}
                    currentImage={form.cover_image}
                  />
                </div>

                {/* Featured toggle */}                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${form.featured ? 'bg-[#8B7355]' : 'bg-white/10'}`}
                    onClick={() => setForm({...form, featured: !form.featured})}>
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-white/50 text-sm tracking-wide group-hover:text-white/70 transition-colors">Featured on homepage</span>
                </label>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button onClick={handleSave}
                    className="flex-1 bg-[#8B7355] text-white py-3 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
                    {editProject ? 'Save Changes' : 'Create Project'}
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

export default PortfolioManager;
