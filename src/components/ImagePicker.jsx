import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '@/utils/adminApi';

export default function ImagePicker({ isOpen, onClose, onSelect, currentImage }) {
  const [tab, setTab] = useState('gallery');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const fileRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUrl(currentImage || '');
      api.media.list()
        .then(data => { setImages(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [isOpen]);

  const folders = ['all', ...new Set(images.map(i => i.folder))];
  const filtered = images.filter(img => {
    if (selectedFolder !== 'all' && img.folder !== selectedFolder) return false;
    if (search && !img.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await api.media.upload(file);
      onSelect(result.path);
      onClose();
    } catch (err) { alert('Upload failed: ' + err.message); }
    setUploading(false);
  };

  const handleUrlSubmit = () => {
    if (url.trim()) { onSelect(url.trim()); onClose(); }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}>
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-[#1a1a1a] border border-white/10 w-full max-w-3xl max-h-[85vh] flex flex-col"
          onClick={e => e.stopPropagation()}>

          <div className="flex items-center justify-between p-5 border-b border-white/5 shrink-0">
            <h3 className="text-white font-light tracking-[0.1em] text-sm uppercase">Choose Image</h3>
            <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none">&times;</button>
          </div>

          <div className="flex border-b border-white/5 shrink-0">
            {[
              { id: 'gallery', label: 'Media Gallery' },
              { id: 'upload', label: 'Upload New' },
              { id: 'url', label: 'Paste URL' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 py-3 text-[10px] tracking-[0.15em] uppercase transition-all ${
                  tab === t.id ? 'text-[#8B7355] border-b-2 border-[#8B7355] bg-[#8B7355]/5' : 'text-white/30 hover:text-white/50'
                }`}>{t.label}</button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {tab === 'gallery' && (
              <div>
                <div className="flex gap-3 mb-4">
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search images..."
                    className="flex-1 bg-transparent border border-white/10 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#8B7355]" />
                  <select value={selectedFolder} onChange={e => setSelectedFolder(e.target.value)}
                    className="bg-[#0d0d0d] border border-white/10 px-3 py-2 text-white/50 text-xs focus:outline-none">
                    {folders.map(f => <option key={f} value={f}>{f === 'all' ? 'All Folders' : f}</option>)}
                  </select>
                </div>
                {loading ? (
                  <div className="flex justify-center py-12"><div className="w-5 h-5 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" /></div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-white/20 text-sm">No images found</p>
                    <button onClick={() => setTab('upload')} className="text-[#8B7355] text-xs mt-2 hover:underline">Upload one</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {filtered.map(img => (
                      <button key={img.path} onClick={() => { onSelect(img.path); onClose(); }}
                        className={`group relative aspect-square overflow-hidden border transition-all hover:border-[#8B7355] ${
                          currentImage === img.path ? 'border-[#8B7355] ring-1 ring-[#8B7355]' : 'border-white/5'
                        }`}>
                        <img src={img.path} alt={img.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                        </div>
                        {currentImage === img.path && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-[#8B7355] rounded-full flex items-center justify-center">
                            <span className="text-white text-[10px]">✓</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white/70 text-[8px] truncate">{img.name}</p>
                          <p className="text-white/30 text-[7px]">{formatSize(img.size)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'upload' && (
              <div className="flex flex-col items-center justify-center py-12">
                <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*" className="hidden" />
                <button onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="border-2 border-dashed border-white/10 hover:border-[#8B7355]/50 w-full max-w-md p-12 text-center transition-colors cursor-pointer group">
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" />
                      <p className="text-white/40 text-sm">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border border-white/10 group-hover:border-[#8B7355]/30 flex items-center justify-center transition-colors">
                        <span className="text-white/20 group-hover:text-[#8B7355] text-2xl transition-colors">↑</span>
                      </div>
                      <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">Click to upload an image</p>
                      <p className="text-white/15 text-xs">JPG, PNG, WebP, SVG — Max 20MB</p>
                    </div>
                  )}
                </button>
              </div>
            )}

            {tab === 'url' && (
              <div className="py-8 max-w-md mx-auto">
                <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-3">Image URL</label>
                <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/image.jpg"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#8B7355]" autoFocus />
                {url && (
                  <div className="mt-4 border border-white/5 aspect-video overflow-hidden bg-[#111]">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                )}
                <button onClick={handleUrlSubmit} disabled={!url.trim()}
                  className="w-full mt-4 bg-[#8B7355] text-white py-3 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors disabled:opacity-30">
                  Use This Image
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
