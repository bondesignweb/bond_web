const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'bond.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    -- Users / Admin Auth
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'Editor' CHECK(role IN ('Admin','Editor','Viewer')),
      status TEXT DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
      last_login TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Portfolios
    CREATE TABLE IF NOT EXISTS portfolios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      category TEXT DEFAULT 'Residential',
      description TEXT,
      location TEXT,
      year TEXT,
      status TEXT DEFAULT 'Draft' CHECK(status IN ('Published','Draft')),
      featured INTEGER DEFAULT 0,
      cover_image TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Portfolio Images
    CREATE TABLE IF NOT EXISTS portfolio_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      portfolio_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      alt_text TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
    );

    -- Team Members
    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      bio TEXT,
      image_path TEXT,
      email TEXT,
      phone TEXT,
      specialties TEXT,
      education TEXT,
      fun_fact TEXT,
      quote TEXT,
      active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Press Releases
    CREATE TABLE IF NOT EXISTS press_releases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      publication TEXT,
      date TEXT,
      status TEXT DEFAULT 'Draft' CHECK(status IN ('Published','Draft')),
      pdf_path TEXT,
      cover_image TEXT,
      external_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Page Views (simple analytics)
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      ip TEXT,
      session_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Index for fast analytics queries
    CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
    CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
  `);
}

function seedIfEmpty() {
  const d = getDb();
  const userCount = d.prepare('SELECT COUNT(*) as c FROM users').get().c;

  if (userCount === 0) {
    console.log('  → Seeding database with initial data...');

    // Seed admin user
    const hash = bcrypt.hashSync('bond2026', 10);
    d.prepare(`INSERT INTO users (name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)`)
      .run('Admin', 'admin@bonddesigncompany.com', hash, 'Admin', 'Active');

    // Seed team members
    const teamInsert = d.prepare(`
      INSERT INTO team_members (name, title, bio, image_path, active, sort_order)
      VALUES (?, ?, ?, ?, 1, ?)
    `);

    const team = [
      ['Ashley Bond', 'Co-Founder / Principal Designer', 'Ashley brings a bold yet refined vision to every project. With an eye for detail and a passion for creating spaces that feel deeply personal, she leads the design direction of Bond Design Company.', 'https://bonddesigncompany.com/wp-content/uploads/2022/06/CF64AE25-45F2-4B3B-AAB1-40A23A2F84D6-scaled.jpeg', 1],
      ['Brandon Bond', 'Co-Founder / CEO', 'Brandon manages the business operations and strategic growth of Bond Design Company. His leadership ensures every project is delivered with excellence.', 'https://bonddesigncompany.com/wp-content/uploads/2022/06/2Q0A4122-scaled.jpg', 2],
      ['Laura Kramer', 'Designer', 'Laura brings expertise in space planning and material selection to create cohesive, beautiful interiors.', 'https://bonddesigncompany.com/wp-content/uploads/2022/06/DSC00170-scaled.jpg', 3],
      ['Melissa Kunes', 'Designer', 'Melissa specializes in creating cohesive design narratives that reflect each client\'s unique personality.', 'https://bonddesigncompany.com/wp-content/uploads/2022/06/3A5B420C-9EC4-4CA0-BC67-443FE2919650-scaled.jpeg', 4],
      ['Alex Kotkiewicz', 'Designer', 'Alex brings fresh perspectives and innovative ideas to every project.', 'https://bonddesigncompany.com/wp-content/uploads/2025/02/3121FA3F-285B-4C6A-8419-1B435E0683FE-2-scaled.jpeg', 5],
      ['Claire English', 'Project Manager', 'Claire ensures every project runs smoothly from concept to completion, coordinating all moving pieces.', 'https://bonddesigncompany.com/wp-content/uploads/2022/06/1CCCABFE-C9B9-42B9-BFBB-B56083BE348A-2-scaled.jpeg', 6],
      ['Nicole Messerole', 'Project Manager', 'Nicole manages client relations with care and attention to detail.', 'https://bonddesigncompany.com/wp-content/uploads/2025/02/6663786F-1864-4146-B305-36FCF4DA72C8-2-scaled.jpeg', 7],
      ['Andrea Aldana', 'Project Manager', 'Andrea coordinates all project logistics ensuring seamless execution.', 'https://bonddesigncompany.com/wp-content/uploads/2022/06/F7366F0C-E8FC-4485-8503-639829E79EAF-scaled.jpeg', 8],
      ['Hannah Holmes', 'Executive Assistant', 'Hannah supports the leadership team and keeps day-to-day operations running smoothly.', '', 9],
      ['Michael Lopez', 'Warehouse Manager', 'Michael oversees inventory and the warehousing of materials and furnishings for all active projects.', '', 10],
      ['Heather Gibbs', 'Accounting', 'Heather manages the financial operations of Bond Design Company with precision and care.', '', 11],
    ];

    const insertMany = d.transaction((members) => {
      for (const m of members) teamInsert.run(...m);
    });
    insertMany(team);

    // Seed portfolios
    const portfolioInsert = d.prepare(`
      INSERT INTO portfolios (title, slug, category, description, status, featured, cover_image, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const portfolios = [
      ['Deer Valley Retreat', 'deer-valley-retreat', 'Residential', 'A stunning mountain retreat featuring natural materials and panoramic views.', 'Published', 1, '', 1],
      ['Park City Modern', 'park-city-modern', 'Residential', 'Contemporary elegance meets mountain living in this Park City residence.', 'Published', 1, '', 2],
      ['Summit House', 'summit-house', 'Residential', 'A luxurious summit home with breathtaking views and refined interiors.', 'Draft', 0, '', 3],
      ['Mountain Luxe Condo', 'mountain-luxe-condo', 'Residential', 'Sophisticated condo living with high-end finishes throughout.', 'Published', 0, '', 4],
      ['The Bungalow', 'the-bungalow', 'Commercial', 'A boutique commercial space designed for community and connection.', 'Published', 1, '', 5],
    ];

    const insertPortfolios = d.transaction((items) => {
      for (const p of items) portfolioInsert.run(...p);
    });
    insertPortfolios(portfolios);

    // Seed press releases
    const pressInsert = d.prepare(`
      INSERT INTO press_releases (title, publication, content, date, status, external_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const press = [
      ['Bond Design Featured in Architectural Digest', 'Architectural Digest', 'Bond Design Company was highlighted for their innovative approach to mountain modern interiors.', '2025-12-10', 'Published', ''],
      ['Mountain Living: Top Designers of Park City', 'Mountain Living', 'Ashley and Brandon Bond were named among the top interior designers in Park City.', '2025-08-15', 'Published', ''],
      ['Luxe Interiors + Design Feature', 'Luxe Interiors + Design', 'A deep dive into Bond Design Company\'s philosophy and signature aesthetic.', '2026-01-20', 'Draft', ''],
    ];

    const insertPress = d.transaction((items) => {
      for (const p of items) pressInsert.run(...p);
    });
    insertPress(press);

    console.log('  ✓ Database seeded successfully');
  }
}

module.exports = { getDb, seedIfEmpty };
