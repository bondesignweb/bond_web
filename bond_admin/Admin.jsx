import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Hardcoded admin credentials (replace with real auth later) ──
const ADMIN_PASSWORD = 'bond2026';

// ── Icons as inline SVG components ──
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Portfolio: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 8h20"/><path d="M8 2v20"/>
    </svg>
  ),
  Team: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.662"/>
    </svg>
  ),
  Analytics: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
    </svg>
  ),
  Press: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Upload: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Delete: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Image: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
};


// ── Sample Data ──
const initialUsers = [
  { id: 1, name: 'Brian Gibbs', email: 'brian@bonddesigncompany.com', role: 'Admin', status: 'Active', lastLogin: '2026-03-19' },
  { id: 2, name: 'Ashley Bond', email: 'ashley@bonddesigncompany.com', role: 'Admin', status: 'Active', lastLogin: '2026-03-18' },
  { id: 3, name: 'Brandon Bond', email: 'brandon@bonddesigncompany.com', role: 'Admin', status: 'Active', lastLogin: '2026-03-17' },
];

const initialPortfolios = [
  { id: 1, title: 'Deer Valley Retreat', category: 'Residential', status: 'Published', featured: true, images: 12, date: '2025-11-15' },
  { id: 2, title: 'Park City Modern', category: 'Residential', status: 'Published', featured: true, images: 8, date: '2025-09-22' },
  { id: 3, title: 'Summit House', category: 'Residential', status: 'Draft', featured: false, images: 5, date: '2026-01-10' },
  { id: 4, title: 'Mountain Luxe Condo', category: 'Residential', status: 'Published', featured: false, images: 10, date: '2025-06-03' },
  { id: 5, title: 'The Bungalow', category: 'Commercial', status: 'Published', featured: true, images: 15, date: '2024-12-18' },
];

const initialTeamMembers = [
  { id: 1, name: 'Ashley Bond', title: 'Co-Founder / Principal Designer', image: '', active: true },
  { id: 2, name: 'Brandon Bond', title: 'Co-Founder / CEO', image: '', active: true },
  { id: 3, name: 'Laura Kramer', title: 'Designer', image: '', active: true },
  { id: 4, name: 'Melissa Kunes', title: 'Designer', image: '', active: true },
  { id: 5, name: 'Alex Kotkiewicz', title: 'Designer', image: '', active: true },
  { id: 6, name: 'Claire English', title: 'Project Manager', image: '', active: true },
  { id: 7, name: 'Nicole Messerole', title: 'Project Manager', image: '', active: true },
  { id: 8, name: 'Andrea Aldana', title: 'Project Manager', image: '', active: true },
  { id: 9, name: 'Hannah Holmes', title: 'Executive Assistant', image: '', active: true },
  { id: 10, name: 'Michael Lopez', title: 'Warehouse Manager', image: '', active: true },
  { id: 11, name: 'Heather Gibbs', title: 'Accounting', image: '', active: true },
];

const initialPressReleases = [
  { id: 1, title: 'Bond Design Featured in Architectural Digest', date: '2025-12-10', status: 'Published', file: 'ad-feature-2025.pdf' },
  { id: 2, title: 'Mountain Living: Top Designers of Park City', date: '2025-08-15', status: 'Published', file: 'mountain-living-2025.pdf' },
  { id: 3, title: 'Luxe Interiors + Design Feature', date: '2026-01-20', status: 'Draft', file: '' },
];

// ── Fake Analytics Data ──
const analyticsData = {
  totalVisitors: 14283,
  monthlyVisitors: 3847,
  avgSessionDuration: '2:34',
  bounceRate: '38.2%',
  topPages: [
    { page: '/portfolio', views: 5621, pct: 39 },
    { page: '/', views: 4102, pct: 29 },
    { page: '/about', views: 2340, pct: 16 },
    { page: '/services', views: 1420, pct: 10 },
    { page: '/contact', views: 800, pct: 6 },
  ],
  monthlyTraffic: [
    { month: 'Oct', visitors: 2100 },
    { month: 'Nov', visitors: 2850 },
    { month: 'Dec', visitors: 3200 },
    { month: 'Jan', visitors: 3650 },
    { month: 'Feb', visitors: 3400 },
    { month: 'Mar', visitors: 3847 },
  ],
  referrers: [
    { source: 'Google', visits: 6420, pct: 45 },
    { source: 'Instagram', visits: 3571, pct: 25 },
    { source: 'Direct', visits: 2142, pct: 15 },
    { source: 'Pinterest', visits: 1142, pct: 8 },
    { source: 'Other', visits: 1008, pct: 7 },
  ],
};


// ═══════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid password');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-white tracking-[0.3em] font-light mb-2">BOND</h1>
          <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase">Admin Portal</p>
        </div>

        <div className="bg-[#1a1a1a] border border-white/5 p-8">
          <div className="w-full">
            <label className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full bg-transparent border border-white/10 px-4 py-3 text-white text-sm tracking-wider focus:outline-none focus:border-[#8B7355] transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400/80 text-xs mt-2 tracking-wide"
              >
                {error}
              </motion.p>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-[#8B7355] text-white py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#A08B6E] transition-colors disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Enter'}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-white/15 mt-8 tracking-wider">
          Bond Design Company &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// STAT CARD
// ═══════════════════════════════════════════════════
function StatCard({ label, value, change, icon }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/5 p-6 hover:border-[#8B7355]/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">{label}</span>
        <span className="text-white/20">{icon}</span>
      </div>
      <p className="font-serif text-3xl text-white font-light tracking-wide">{value}</p>
      {change && (
        <p className={`text-xs mt-2 tracking-wide ${change.startsWith('+') ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
          {change} from last month
        </p>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════
// BAR CHART (pure CSS)
// ═══════════════════════════════════════════════════
function BarChart({ data, maxVal }) {
  const max = maxVal || Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-3 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / max) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="w-full bg-[#8B7355]/60 hover:bg-[#8B7355] transition-colors rounded-t-sm min-h-[4px]"
          />
          <span className="text-[9px] text-white/30 tracking-wider">{d.label}</span>
        </div>
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════════════
// HORIZONTAL BAR
// ═══════════════════════════════════════════════════
function HorizontalBar({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/60 tracking-wide">{item.label}</span>
            <span className="text-white/30">{item.value}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.pct}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full bg-[#8B7355]/70 rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}


// ═══════════════════════════════════════════════════
// MODAL WRAPPER
// ═══════════════════════════════════════════════════
function Modal({ isOpen, onClose, title, children, wide }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`bg-[#1a1a1a] border border-white/10 w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[85vh] overflow-y-auto`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h3 className="text-white font-light tracking-[0.1em] text-sm uppercase">{title}</h3>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-xl leading-none">&times;</button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// ═══════════════════════════════════════════════════
// SECTION: DASHBOARD OVERVIEW
// ═══════════════════════════════════════════════════
function DashboardSection() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Visitors" value="14.3K" change="+12.3%" icon={<Icons.Eye />} />
        <StatCard label="Portfolio Projects" value="5" change="+2" icon={<Icons.Portfolio />} />
        <StatCard label="Team Members" value="11" icon={<Icons.Team />} />
        <StatCard label="Press Features" value="6" change="+1" icon={<Icons.Press />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1a1a1a] border border-white/5 p-6">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-6">Monthly Traffic</h4>
          <BarChart
            data={analyticsData.monthlyTraffic.map(m => ({ label: m.month, value: m.visitors }))}
          />
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-6">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-6">Top Pages</h4>
          <HorizontalBar
            items={analyticsData.topPages.map(p => ({ label: p.page, value: `${p.views.toLocaleString()}`, pct: p.pct }))}
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 p-6">
        <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-4">Recent Activity</h4>
        <div className="space-y-3">
          {[
            { action: 'Portfolio "Deer Valley Retreat" updated', time: '2 hours ago', user: 'Ashley Bond' },
            { action: 'New press release uploaded', time: '1 day ago', user: 'Brian Gibbs' },
            { action: 'Team member Nicole Messerole profile updated', time: '3 days ago', user: 'Brandon Bond' },
            { action: 'Contact form submission from Sarah J.', time: '4 days ago', user: 'System' },
            { action: 'Portfolio "Summit House" set to draft', time: '1 week ago', user: 'Ashley Bond' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-2 border-b border-white/3 last:border-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B7355] mt-1.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-sm tracking-wide">{item.action}</p>
                <p className="text-white/20 text-xs mt-0.5">{item.user} &middot; {item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// SECTION: MANAGE USERS
// ═══════════════════════════════════════════════════
function UsersSection() {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'Editor', status: 'Active' });

  const openAdd = () => {
    setEditUser(null);
    setForm({ name: '', email: '', role: 'Editor', status: 'Active' });
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      setUsers([...users, { id: Date.now(), ...form, lastLogin: 'Never' }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/30 text-sm">{users.length} users</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
          <Icons.Plus /> Add User
        </button>
      </div>

      <div className="bg-[#1a1a1a] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[10px] tracking-[0.15em] text-white/30 uppercase p-4">Name</th>
                <th className="text-left text-[10px] tracking-[0.15em] text-white/30 uppercase p-4">Email</th>
                <th className="text-left text-[10px] tracking-[0.15em] text-white/30 uppercase p-4">Role</th>
                <th className="text-left text-[10px] tracking-[0.15em] text-white/30 uppercase p-4">Status</th>
                <th className="text-left text-[10px] tracking-[0.15em] text-white/30 uppercase p-4">Last Login</th>
                <th className="text-right text-[10px] tracking-[0.15em] text-white/30 uppercase p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="p-4 text-white/70 text-sm tracking-wide">{user.name}</td>
                  <td className="p-4 text-white/40 text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 tracking-wider ${user.role === 'Admin' ? 'bg-[#8B7355]/20 text-[#8B7355]' : 'bg-white/5 text-white/40'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs tracking-wide ${user.status === 'Active' ? 'text-emerald-400/70' : 'text-white/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-white/20'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/30 text-sm">{user.lastLogin}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(user)} className="p-1.5 text-white/20 hover:text-[#8B7355] transition-colors"><Icons.Edit /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><Icons.Delete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editUser ? 'Edit User' : 'Add User'}>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Full Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Email</label>
            <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Role</label>
              <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                <option>Admin</option><option>Editor</option><option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex-1 bg-[#8B7355] text-white py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
              {editUser ? 'Update User' : 'Create User'}
            </button>
            <button onClick={() => setModalOpen(false)} className="px-6 border border-white/10 text-white/40 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-white/30 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// SECTION: MANAGE PORTFOLIOS
// ═══════════════════════════════════════════════════
function PortfoliosSection() {
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Residential', status: 'Draft', featured: false });
  const [filter, setFilter] = useState('All');

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', category: 'Residential', status: 'Draft', featured: false });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ title: item.title, category: item.category, status: item.status, featured: item.featured });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editItem) {
      setPortfolios(portfolios.map(p => p.id === editItem.id ? { ...p, ...form } : p));
    } else {
      setPortfolios([...portfolios, { id: Date.now(), ...form, images: 0, date: new Date().toISOString().split('T')[0] }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this portfolio project?')) {
      setPortfolios(portfolios.filter(p => p.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setPortfolios(portfolios.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const filtered = filter === 'All' ? portfolios : portfolios.filter(p => p.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {['All', 'Published', 'Draft'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs tracking-[0.15em] uppercase transition-colors ${filter === f ? 'text-[#8B7355]' : 'text-white/30 hover:text-white/50'}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
          <Icons.Plus /> Add Project
        </button>
      </div>

      <div className="grid gap-3">
        {filtered.map(project => (
          <div key={project.id} className="bg-[#1a1a1a] border border-white/5 p-5 hover:border-[#8B7355]/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-white/5 flex items-center justify-center text-white/10">
                  <Icons.Image />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-white/80 text-sm tracking-wide">{project.title}</h4>
                    {project.featured && (
                      <span className="text-[9px] tracking-[0.15em] text-[#8B7355] bg-[#8B7355]/10 px-2 py-0.5 uppercase">Featured</span>
                    )}
                  </div>
                  <p className="text-white/25 text-xs mt-1">{project.category} &middot; {project.images} images &middot; {project.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 tracking-wider ${project.status === 'Published' ? 'bg-emerald-400/10 text-emerald-400/70' : 'bg-white/5 text-white/30'}`}>
                  {project.status}
                </span>
                <button onClick={() => toggleFeatured(project.id)} className={`p-1.5 transition-colors ${project.featured ? 'text-[#8B7355]' : 'text-white/15 hover:text-[#8B7355]'}`}>
                  ★
                </button>
                <button onClick={() => openEdit(project)} className="p-1.5 text-white/20 hover:text-[#8B7355] transition-colors"><Icons.Edit /></button>
                <button onClick={() => handleDelete(project.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><Icons.Delete /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Project' : 'Add Project'} wide>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Project Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                <option>Residential</option><option>Commercial</option><option>Hospitality</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                <option>Draft</option><option>Published</option>
              </select>
            </div>
          </div>
          <div className="border border-dashed border-white/10 p-8 text-center">
            <Icons.Upload />
            <p className="text-white/30 text-sm mt-3">Drag & drop project images here</p>
            <p className="text-white/15 text-xs mt-1">or click to browse files</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})}
              className="w-4 h-4 accent-[#8B7355]" />
            <span className="text-white/50 text-sm tracking-wide">Mark as featured project</span>
          </label>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex-1 bg-[#8B7355] text-white py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
              {editItem ? 'Update Project' : 'Create Project'}
            </button>
            <button onClick={() => setModalOpen(false)} className="px-6 border border-white/10 text-white/40 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-white/30 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// SECTION: TEAM / MEET BOND
// ═══════════════════════════════════════════════════
function TeamSection() {
  const [members, setMembers] = useState(initialTeamMembers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [form, setForm] = useState({ name: '', title: '', image: '', active: true });

  const openAdd = () => {
    setEditMember(null);
    setForm({ name: '', title: '', image: '', active: true });
    setModalOpen(true);
  };

  const openEdit = (member) => {
    setEditMember(member);
    setForm({ name: member.name, title: member.title, image: member.image, active: member.active });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editMember) {
      setMembers(members.map(m => m.id === editMember.id ? { ...m, ...form } : m));
    } else {
      setMembers([...members, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this team member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const toggleActive = (id) => {
    setMembers(members.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/30 text-sm">{members.length} team members</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
          <Icons.Plus /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <div key={member.id} className={`bg-[#1a1a1a] border border-white/5 p-5 hover:border-[#8B7355]/20 transition-colors ${!member.active ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-white/20 shrink-0 overflow-hidden">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-lg">{member.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white/80 text-sm tracking-wide">{member.name}</h4>
                <p className="text-white/30 text-xs mt-0.5">{member.title}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => toggleActive(member.id)}
                    className={`text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 transition-colors ${member.active ? 'bg-emerald-400/10 text-emerald-400/70' : 'bg-white/5 text-white/30'}`}>
                    {member.active ? 'Active' : 'Hidden'}
                  </button>
                  <button onClick={() => openEdit(member)} className="p-1 text-white/20 hover:text-[#8B7355] transition-colors"><Icons.Edit /></button>
                  <button onClick={() => handleDelete(member.id)} className="p-1 text-white/20 hover:text-red-400 transition-colors"><Icons.Delete /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editMember ? 'Edit Team Member' : 'Add Team Member'}>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Full Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Title / Role</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors" />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Photo</label>
            <div className="border border-dashed border-white/10 p-6 text-center cursor-pointer hover:border-[#8B7355]/30 transition-colors">
              <Icons.Upload />
              <p className="text-white/30 text-xs mt-2">Upload headshot photo</p>
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Image URL (optional)</label>
            <input value={form.image} onChange={e => setForm({...form, image: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors"
              placeholder="https://..." />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})}
              className="w-4 h-4 accent-[#8B7355]" />
            <span className="text-white/50 text-sm tracking-wide">Show on website</span>
          </label>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex-1 bg-[#8B7355] text-white py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
              {editMember ? 'Update Member' : 'Add Member'}
            </button>
            <button onClick={() => setModalOpen(false)} className="px-6 border border-white/10 text-white/40 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-white/30 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// SECTION: ANALYTICS
// ═══════════════════════════════════════════════════
function AnalyticsSection() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Visitors" value="14,283" change="+12.3%" icon={<Icons.Eye />} />
        <StatCard label="Monthly Visitors" value="3,847" change="+8.7%" icon={<Icons.Analytics />} />
        <StatCard label="Avg. Session" value="2:34" change="+0:12" icon={<Icons.Dashboard />} />
        <StatCard label="Bounce Rate" value="38.2%" change="-2.1%" icon={<Icons.Analytics />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1a1a1a] border border-white/5 p-6">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-6">Monthly Traffic (Last 6 Months)</h4>
          <BarChart
            data={analyticsData.monthlyTraffic.map(m => ({ label: m.month, value: m.visitors }))}
          />
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-6">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-6">Traffic Sources</h4>
          <HorizontalBar
            items={analyticsData.referrers.map(r => ({ label: r.source, value: `${r.visits.toLocaleString()}`, pct: r.pct }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] border border-white/5 p-6">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-6">Most Viewed Pages</h4>
          <HorizontalBar
            items={analyticsData.topPages.map(p => ({ label: p.page, value: `${p.views.toLocaleString()} views`, pct: p.pct }))}
          />
        </div>
        <div className="bg-[#1a1a1a] border border-white/5 p-6">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase mb-6">Device Breakdown</h4>
          <HorizontalBar
            items={[
              { label: 'Desktop', value: '6,856', pct: 48 },
              { label: 'Mobile', value: '5,713', pct: 40 },
              { label: 'Tablet', value: '1,714', pct: 12 },
            ]}
          />
        </div>
      </div>

      <div className="mt-6 bg-[#1a1a1a] border border-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] tracking-[0.15em] text-white/40 uppercase">Integration Note</h4>
        </div>
        <p className="text-white/30 text-sm leading-relaxed">
          This analytics dashboard shows sample data. To display real analytics, connect Google Analytics 4 or Plausible Analytics 
          by adding your tracking ID to the site configuration. The admin panel will then pull live data from the API.
        </p>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// SECTION: PRESS RELEASES
// ═══════════════════════════════════════════════════
function PressSection() {
  const [releases, setReleases] = useState(initialPressReleases);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', status: 'Draft', file: '', content: '' });
  const fileInputRef = useRef(null);

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', date: new Date().toISOString().split('T')[0], status: 'Draft', file: '', content: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({ title: item.title, date: item.date, status: item.status, file: item.file, content: item.content || '' });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editItem) {
      setReleases(releases.map(r => r.id === editItem.id ? { ...r, ...form } : r));
    } else {
      setReleases([...releases, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this press release?')) {
      setReleases(releases.filter(r => r.id !== id));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({...form, file: file.name });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/30 text-sm">{releases.length} press releases</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
          <Icons.Plus /> New Release
        </button>
      </div>

      <div className="grid gap-3">
        {releases.map(release => (
          <div key={release.id} className="bg-[#1a1a1a] border border-white/5 p-5 hover:border-[#8B7355]/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-12 bg-white/5 flex items-center justify-center text-white/15">
                  <Icons.Press />
                </div>
                <div>
                  <h4 className="text-white/80 text-sm tracking-wide">{release.title}</h4>
                  <p className="text-white/25 text-xs mt-1">
                    {release.date}
                    {release.file && <> &middot; <span className="text-[#8B7355]/60">{release.file}</span></>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 tracking-wider ${release.status === 'Published' ? 'bg-emerald-400/10 text-emerald-400/70' : 'bg-white/5 text-white/30'}`}>
                  {release.status}
                </span>
                <button onClick={() => openEdit(release)} className="p-1.5 text-white/20 hover:text-[#8B7355] transition-colors"><Icons.Edit /></button>
                <button onClick={() => handleDelete(release.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><Icons.Delete /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Press Release' : 'New Press Release'} wide>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                className="w-full bg-[#0d0d0d] border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355]">
                <option>Draft</option><option>Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Content</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})}
              rows={6}
              className="w-full bg-transparent border border-white/10 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#8B7355] transition-colors resize-none"
              placeholder="Write the press release content..." />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Attach PDF</label>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-white/10 p-4 text-center hover:border-[#8B7355]/30 transition-colors"
            >
              <div className="flex items-center justify-center gap-2 text-white/30 text-sm">
                <Icons.Upload />
                {form.file ? <span className="text-[#8B7355]">{form.file}</span> : 'Upload PDF file'}
              </div>
            </button>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="flex-1 bg-[#8B7355] text-white py-2.5 text-xs tracking-[0.15em] uppercase hover:bg-[#A08B6E] transition-colors">
              {editItem ? 'Update Release' : 'Publish Release'}
            </button>
            <button onClick={() => setModalOpen(false)} className="px-6 border border-white/10 text-white/40 py-2.5 text-xs tracking-[0.15em] uppercase hover:border-white/30 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// ═══════════════════════════════════════════════════
// MAIN ADMIN COMPONENT
// ═══════════════════════════════════════════════════
const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
  { key: 'users', label: 'Users', icon: Icons.Users },
  { key: 'portfolios', label: 'Portfolios', icon: Icons.Portfolio },
  { key: 'team', label: 'Meet Bond', icon: Icons.Team },
  { key: 'analytics', label: 'Analytics', icon: Icons.Analytics },
  { key: 'press', label: 'Press', icon: Icons.Press },
];

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check session
  useEffect(() => {
    const session = sessionStorage.getItem('bond_admin_auth');
    if (session === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('bond_admin_auth', 'true');
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bond_admin_auth');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />;
      case 'users': return <UsersSection />;
      case 'portfolios': return <PortfoliosSection />;
      case 'team': return <TeamSection />;
      case 'analytics': return <AnalyticsSection />;
      case 'press': return <PressSection />;
      default: return <DashboardSection />;
    }
  };

  const activeItem = navItems.find(n => n.key === activeSection);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-[#111] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#8B7355]/50 flex items-center justify-center shrink-0">
              <span className="font-serif text-xs text-[#8B7355]">B</span>
            </div>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-white/70 text-xs tracking-[0.15em] uppercase font-light">Admin</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all ${
                  isActive
                    ? 'text-[#8B7355] bg-[#8B7355]/5 border-r-2 border-[#8B7355]'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/2'
                }`}
              >
                <Icon />
                {sidebarOpen && (
                  <span className="text-xs tracking-[0.1em] uppercase">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-1 py-2 text-white/20 hover:text-red-400/60 transition-colors"
          >
            <Icons.Logout />
            {sidebarOpen && <span className="text-xs tracking-[0.1em] uppercase">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#111]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <h2 className="text-white/60 text-sm tracking-[0.15em] uppercase font-light">
              {activeItem?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-white/20 hover:text-[#8B7355] tracking-[0.1em] uppercase transition-colors">
              View Site →
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
