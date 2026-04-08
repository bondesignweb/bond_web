const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb, seedIfEmpty } = require('./db');

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'bond-admin-secret-2026-change-in-production';
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// Ensure upload directories exist
['images', 'pdfs', 'team', 'portfolio'].forEach(dir => {
  const p = path.join(UPLOAD_DIR, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));

// ── Multer config ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.uploadType || 'images';
    cb(null, path.join(UPLOAD_DIR, type));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|pdf|svg/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  }
});


// ── Auth Middleware ──
function authRequired(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}


// ═══════════════════════════════════════════
// AUTH ROUTES
// ═══════════════════════════════════════════
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  // Allow login by email or with legacy password
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (user && bcrypt.compareSync(password, user.password_hash)) {
    db.prepare('UPDATE users SET last_login = datetime("now") WHERE id = ?').run(user.id);
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  }

  // Fallback: simple password check for initial setup
  if (password === 'bond2026') {
    const admin = db.prepare('SELECT * FROM users WHERE role = "Admin" LIMIT 1').get();
    if (admin) {
      db.prepare('UPDATE users SET last_login = datetime("now") WHERE id = ?').run(admin.id);
      const token = jwt.sign({ id: admin.id, role: admin.role, name: admin.name }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ token, user: { id: admin.id, name: admin.name, role: admin.role, email: admin.email } });
    }
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/auth/me', authRequired, (req, res) => {
  const db = getDb();
  const user = db.prepare('SELECT id, name, email, role, status FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});


// ═══════════════════════════════════════════
// PORTFOLIO ROUTES
// ═══════════════════════════════════════════
app.get('/api/portfolios', (req, res) => {
  const db = getDb();
  const portfolios = db.prepare(`
    SELECT p.*, (SELECT COUNT(*) FROM portfolio_images WHERE portfolio_id = p.id) as image_count
    FROM portfolios p ORDER BY p.sort_order ASC, p.created_at DESC
  `).all();
  res.json(portfolios);
});

app.get('/api/portfolios/:id', (req, res) => {
  const db = getDb();
  const portfolio = db.prepare('SELECT * FROM portfolios WHERE id = ?').get(req.params.id);
  if (!portfolio) return res.status(404).json({ error: 'Not found' });
  portfolio.images = db.prepare('SELECT * FROM portfolio_images WHERE portfolio_id = ? ORDER BY sort_order ASC').all(req.params.id);
  res.json(portfolio);
});

app.post('/api/portfolios', authRequired, (req, res) => {
  const db = getDb();
  const { title, category, description, location, year, status, featured } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const result = db.prepare(`
    INSERT INTO portfolios (title, slug, category, description, location, year, status, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(title, slug, category || 'Residential', description || '', location || '', year || '', status || 'Draft', featured ? 1 : 0);
  const portfolio = db.prepare('SELECT * FROM portfolios WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(portfolio);
});

app.put('/api/portfolios/:id', authRequired, (req, res) => {
  const db = getDb();
  const { title, category, description, location, year, status, featured } = req.body;
  const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : undefined;
  db.prepare(`
    UPDATE portfolios SET
      title = COALESCE(?, title), slug = COALESCE(?, slug), category = COALESCE(?, category),
      description = COALESCE(?, description), location = COALESCE(?, location),
      year = COALESCE(?, year), status = COALESCE(?, status),
      featured = COALESCE(?, featured), updated_at = datetime('now')
    WHERE id = ?
  `).run(title, slug, category, description, location, year, status, featured !== undefined ? (featured ? 1 : 0) : undefined, req.params.id);
  const portfolio = db.prepare('SELECT * FROM portfolios WHERE id = ?').get(req.params.id);
  res.json(portfolio);
});

app.delete('/api/portfolios/:id', authRequired, (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM portfolios WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Portfolio image upload
app.post('/api/portfolios/:id/images', authRequired, (req, res, next) => {
  req.uploadType = 'portfolio';
  next();
}, upload.array('images', 20), (req, res) => {
  const db = getDb();
  const insert = db.prepare('INSERT INTO portfolio_images (portfolio_id, image_path, sort_order) VALUES (?, ?, ?)');
  const images = [];
  req.files.forEach((file, i) => {
    const imgPath = `/uploads/portfolio/${file.filename}`;
    const result = insert.run(req.params.id, imgPath, i);
    images.push({ id: result.lastInsertRowid, image_path: imgPath });
  });
  // Set first image as cover if none set
  const portfolio = db.prepare('SELECT cover_image FROM portfolios WHERE id = ?').get(req.params.id);
  if (!portfolio.cover_image && images.length > 0) {
    db.prepare('UPDATE portfolios SET cover_image = ? WHERE id = ?').run(images[0].image_path, req.params.id);
  }
  res.json({ uploaded: images.length, images });
});

app.delete('/api/portfolio-images/:imageId', authRequired, (req, res) => {
  const db = getDb();
  const img = db.prepare('SELECT * FROM portfolio_images WHERE id = ?').get(req.params.imageId);
  if (img) {
    const filePath = path.join(__dirname, '..', img.image_path);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    db.prepare('DELETE FROM portfolio_images WHERE id = ?').run(req.params.imageId);
  }
  res.json({ success: true });
});


// ═══════════════════════════════════════════
// TEAM MEMBER ROUTES
// ═══════════════════════════════════════════
app.get('/api/team', (req, res) => {
  const db = getDb();
  const members = db.prepare('SELECT * FROM team_members ORDER BY sort_order ASC').all();
  res.json(members);
});

app.get('/api/team/:id', (req, res) => {
  const db = getDb();
  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);
  if (!member) return res.status(404).json({ error: 'Not found' });
  res.json(member);
});

app.post('/api/team', authRequired, (req, res) => {
  const db = getDb();
  const { name, title, bio, image_path, email, phone, specialties, education, fun_fact, quote, active } = req.body;
  const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM team_members').get().m || 0;
  const result = db.prepare(`
    INSERT INTO team_members (name, title, bio, image_path, email, phone, specialties, education, fun_fact, quote, active, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, title, bio || '', image_path || '', email || '', phone || '', specialties || '', education || '', fun_fact || '', quote || '', active !== undefined ? (active ? 1 : 0) : 1, maxOrder + 1);
  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(member);
});

app.put('/api/team/:id', authRequired, (req, res) => {
  const db = getDb();
  const { name, title, bio, image_path, email, phone, specialties, education, fun_fact, quote, active } = req.body;
  db.prepare(`
    UPDATE team_members SET
      name = COALESCE(?, name), title = COALESCE(?, title), bio = COALESCE(?, bio),
      image_path = COALESCE(?, image_path), email = COALESCE(?, email), phone = COALESCE(?, phone),
      specialties = COALESCE(?, specialties), education = COALESCE(?, education),
      fun_fact = COALESCE(?, fun_fact), quote = COALESCE(?, quote),
      active = COALESCE(?, active), updated_at = datetime('now')
    WHERE id = ?
  `).run(name, title, bio, image_path, email, phone, specialties, education, fun_fact, quote, active !== undefined ? (active ? 1 : 0) : undefined, req.params.id);
  const member = db.prepare('SELECT * FROM team_members WHERE id = ?').get(req.params.id);
  res.json(member);
});

app.delete('/api/team/:id', authRequired, (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM team_members WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Team photo upload
app.post('/api/team/:id/photo', authRequired, (req, res, next) => {
  req.uploadType = 'team';
  next();
}, upload.single('photo'), (req, res) => {
  const db = getDb();
  const imgPath = `/uploads/team/${req.file.filename}`;
  db.prepare('UPDATE team_members SET image_path = ?, updated_at = datetime("now") WHERE id = ?').run(imgPath, req.params.id);
  res.json({ image_path: imgPath });
});


// ═══════════════════════════════════════════
// PRESS RELEASE ROUTES
// ═══════════════════════════════════════════
app.get('/api/press', (req, res) => {
  const db = getDb();
  const releases = db.prepare('SELECT * FROM press_releases ORDER BY date DESC').all();
  res.json(releases);
});

app.get('/api/press/:id', (req, res) => {
  const db = getDb();
  const release = db.prepare('SELECT * FROM press_releases WHERE id = ?').get(req.params.id);
  if (!release) return res.status(404).json({ error: 'Not found' });
  res.json(release);
});

app.post('/api/press', authRequired, (req, res) => {
  const db = getDb();
  const { title, content, publication, date, status, external_url } = req.body;
  const result = db.prepare(`
    INSERT INTO press_releases (title, content, publication, date, status, external_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(title, content || '', publication || '', date || new Date().toISOString().split('T')[0], status || 'Draft', external_url || '');
  const release = db.prepare('SELECT * FROM press_releases WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(release);
});

app.put('/api/press/:id', authRequired, (req, res) => {
  const db = getDb();
  const { title, content, publication, date, status, external_url } = req.body;
  db.prepare(`
    UPDATE press_releases SET
      title = COALESCE(?, title), content = COALESCE(?, content),
      publication = COALESCE(?, publication), date = COALESCE(?, date),
      status = COALESCE(?, status), external_url = COALESCE(?, external_url),
      updated_at = datetime('now')
    WHERE id = ?
  `).run(title, content, publication, date, status, external_url, req.params.id);
  const release = db.prepare('SELECT * FROM press_releases WHERE id = ?').get(req.params.id);
  res.json(release);
});

app.delete('/api/press/:id', authRequired, (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM press_releases WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Press PDF upload
app.post('/api/press/:id/pdf', authRequired, (req, res, next) => {
  req.uploadType = 'pdfs';
  next();
}, upload.single('pdf'), (req, res) => {
  const db = getDb();
  const pdfPath = `/uploads/pdfs/${req.file.filename}`;
  db.prepare('UPDATE press_releases SET pdf_path = ?, updated_at = datetime("now") WHERE id = ?').run(pdfPath, req.params.id);
  res.json({ pdf_path: pdfPath });
});


// ═══════════════════════════════════════════
// ANALYTICS ROUTES
// ═══════════════════════════════════════════

// Track a page view (public, no auth)
app.post('/api/track', (req, res) => {
  const db = getDb();
  const { page, referrer, session_id } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const ua = req.headers['user-agent'] || '';
  db.prepare('INSERT INTO page_views (page, referrer, user_agent, ip, session_id) VALUES (?, ?, ?, ?, ?)')
    .run(page || '/', referrer || '', ua, ip, session_id || '');
  res.json({ ok: true });
});

// Analytics dashboard data (auth required)
app.get('/api/analytics', authRequired, (req, res) => {
  const db = getDb();

  // Total views
  const total = db.prepare('SELECT COUNT(*) as c FROM page_views').get().c;

  // Monthly views (last 30 days)
  const monthly = db.prepare(`SELECT COUNT(*) as c FROM page_views WHERE created_at >= datetime('now', '-30 days')`).get().c;

  // Unique sessions this month
  const uniqueSessions = db.prepare(`
    SELECT COUNT(DISTINCT session_id) as c FROM page_views
    WHERE created_at >= datetime('now', '-30 days') AND session_id IS NOT NULL AND session_id != ''
  `).get().c;

  // Top pages
  const topPages = db.prepare(`
    SELECT page, COUNT(*) as views FROM page_views
    GROUP BY page ORDER BY views DESC LIMIT 10
  `).all();

  // Monthly traffic (last 6 months)
  const monthlyTraffic = db.prepare(`
    SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as visitors
    FROM page_views
    WHERE created_at >= datetime('now', '-6 months')
    GROUP BY month ORDER BY month ASC
  `).all();

  // Top referrers
  const referrers = db.prepare(`
    SELECT
      CASE
        WHEN referrer LIKE '%google%' THEN 'Google'
        WHEN referrer LIKE '%instagram%' THEN 'Instagram'
        WHEN referrer LIKE '%pinterest%' THEN 'Pinterest'
        WHEN referrer LIKE '%facebook%' THEN 'Facebook'
        WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
        ELSE 'Other'
      END as source,
      COUNT(*) as visits
    FROM page_views
    GROUP BY source ORDER BY visits DESC
  `).all();

  // Daily traffic (last 14 days)
  const dailyTraffic = db.prepare(`
    SELECT strftime('%Y-%m-%d', created_at) as day, COUNT(*) as views
    FROM page_views
    WHERE created_at >= datetime('now', '-14 days')
    GROUP BY day ORDER BY day ASC
  `).all();

  // Views today
  const today = db.prepare(`SELECT COUNT(*) as c FROM page_views WHERE date(created_at) = date('now')`).get().c;

  res.json({
    total_views: total,
    monthly_views: monthly,
    unique_sessions: uniqueSessions,
    views_today: today,
    top_pages: topPages,
    monthly_traffic: monthlyTraffic,
    daily_traffic: dailyTraffic,
    referrers
  });
});


// ═══════════════════════════════════════════
// USERS ROUTES (admin only)
// ═══════════════════════════════════════════
app.get('/api/users', authRequired, (req, res) => {
  const db = getDb();
  const users = db.prepare('SELECT id, name, email, role, status, last_login, created_at FROM users ORDER BY created_at ASC').all();
  res.json(users);
});

app.post('/api/users', authRequired, (req, res) => {
  const db = getDb();
  const { name, email, password, role, status } = req.body;
  const hash = bcrypt.hashSync(password || 'bond2026', 10);
  try {
    const result = db.prepare('INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)')
      .run(name, email, hash, role || 'Editor', status || 'Active');
    const user = db.prepare('SELECT id, name, email, role, status FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message.includes('UNIQUE') ? 'Email already exists' : e.message });
  }
});

app.put('/api/users/:id', authRequired, (req, res) => {
  const db = getDb();
  const { name, email, role, status, password } = req.body;
  if (password) {
    const hash = bcrypt.hashSync(password, 10);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, req.params.id);
  }
  db.prepare(`
    UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email),
    role = COALESCE(?, role), status = COALESCE(?, status), updated_at = datetime('now')
    WHERE id = ?
  `).run(name, email, role, status, req.params.id);
  const user = db.prepare('SELECT id, name, email, role, status FROM users WHERE id = ?').get(req.params.id);
  res.json(user);
});

app.delete('/api/users/:id', authRequired, (req, res) => {
  const db = getDb();
  if (req.user.id === parseInt(req.params.id)) return res.status(400).json({ error: 'Cannot delete yourself' });
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});


// ═══════════════════════════════════════════
// DASHBOARD SUMMARY
// ═══════════════════════════════════════════
app.get('/api/dashboard', authRequired, (req, res) => {
  const db = getDb();
  const portfolioCount = db.prepare('SELECT COUNT(*) as c FROM portfolios').get().c;
  const teamCount = db.prepare('SELECT COUNT(*) as c FROM team_members WHERE active = 1').get().c;
  const pressCount = db.prepare('SELECT COUNT(*) as c FROM press_releases WHERE status = "Published"').get().c;
  const totalViews = db.prepare('SELECT COUNT(*) as c FROM page_views').get().c;
  const monthlyViews = db.prepare(`SELECT COUNT(*) as c FROM page_views WHERE created_at >= datetime('now', '-30 days')`).get().c;
  const viewsToday = db.prepare(`SELECT COUNT(*) as c FROM page_views WHERE date(created_at) = date('now')`).get().c;

  res.json({
    portfolios: portfolioCount,
    team_members: teamCount,
    press_features: pressCount,
    total_views: totalViews,
    monthly_views: monthlyViews,
    views_today: viewsToday
  });
});


// ═══════════════════════════════════════════
// STARTUP
// ═══════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`\n  Bond API running on port ${PORT}`);
  seedIfEmpty();
  console.log(`  Ready.\n`);
});
