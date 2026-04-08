// Run: node sync-portfolios.js
// Syncs the portfolio database with the actual projects on the public site

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'bond.db'));
db.pragma('journal_mode = WAL');

// Real projects from Portfolio.jsx
const projects = [
  {
    title: 'Canyon Cool',
    slug: 'CanyonCool',
    category: 'Remodel',
    location: 'Park City',
    description: 'A vibrant remodel that blends mid-century modern influences with mountain living, featuring bold colors and organic textures.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/1.jpg?w=744&h=496&ssl=1',
    status: 'Published',
    featured: 1,
    year: '2026'
  },
  {
    title: 'Laurel Creek',
    slug: 'LaurelCreek',
    category: 'New Construction',
    location: 'Park City',
    description: 'A thoughtfully designed new construction home nestled in Park City, featuring curated botanicals and hand-selected wallcoverings.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/10/29.png?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 1,
    year: '2025'
  },
  {
    title: 'Fifth Avenue Ranch',
    slug: 'FifthAvenueRanch',
    category: 'Interior Furnishings',
    location: 'Salt Lake City',
    description: 'Full interior furnishings for a stunning ranch property, balancing rustic charm with refined elegance.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/1-2.png?w=798&h=1196&ssl=1',
    status: 'Published',
    featured: 0,
    year: '2025'
  },
  {
    title: 'The Bridge House',
    slug: 'TheBridgeHouse',
    category: 'New Construction',
    location: 'Park City',
    description: 'A striking new construction that bridges indoor and outdoor living with expansive glass and natural materials.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/6.png?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 1,
    year: '2025'
  },
  {
    title: 'Into The Woods',
    slug: 'IntoTheWoods',
    category: 'Remodel',
    location: 'Salt Lake City',
    description: 'A complete remodel transforming a traditional home into a nature-inspired retreat with warm woods and organic textures.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-7.jpg?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 0,
    year: '2022'
  },
  {
    title: 'Sapphire Ridge',
    slug: 'SapphireRidge',
    category: 'New Construction',
    location: 'Deer Valley',
    description: 'A luxurious Deer Valley new construction featuring rich wallcoverings, custom millwork, and panoramic mountain views.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/1.png?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 1,
    year: '2025'
  },
  {
    title: 'Modern Meadow Remodel',
    slug: 'ModernMeadowRemodel',
    category: 'Remodel',
    location: 'Park City',
    description: 'A sophisticated remodel bringing contemporary design to a classic meadow-view home.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/20.jpg?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 0,
    year: '2022'
  },
  {
    title: 'Summit 4',
    slug: 'Summit4',
    category: 'New Construction',
    location: 'Park City',
    description: 'A summit-top residence with sweeping views and carefully curated interiors.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-93.jpg?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 0,
    year: '2022'
  },
  {
    title: 'The Court House',
    slug: 'TheCourtHouse',
    category: 'Remodel',
    location: 'Park City',
    description: 'A historic courthouse thoughtfully reimagined into a modern living space while preserving its character.',
    cover_image: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-62.jpg?w=1018&h=679&ssl=1',
    status: 'Published',
    featured: 0,
    year: '2022'
  },
];

// Clear existing portfolios and re-seed
console.log('  → Syncing portfolio database...');
db.prepare('DELETE FROM portfolios').run();

const insert = db.prepare(`
  INSERT INTO portfolios (title, slug, category, description, location, year, status, featured, cover_image, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertAll = db.transaction((items) => {
  items.forEach((p, i) => {
    insert.run(p.title, p.slug, p.category, p.description, p.location, p.year, p.status, p.featured, p.cover_image, i + 1);
  });
});

insertAll(projects);

console.log(`  ✓ ${projects.length} projects synced to database`);

// Verify
const count = db.prepare('SELECT COUNT(*) as c FROM portfolios').get().c;
const featured = db.prepare('SELECT COUNT(*) as c FROM portfolios WHERE featured = 1').get().c;
console.log(`  ✓ Total: ${count} projects, ${featured} featured`);

db.close();
