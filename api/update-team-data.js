const Database = require('better-sqlite3');
const db = new Database('./bond.db');

const stmt = db.prepare('UPDATE team_members SET title = ?, bio = CASE WHEN ? = \'\' THEN bio ELSE ? END, custom_fields = ? WHERE name = ?');

const updates = [
  {
    name: 'Chelsey Milton',
    title: 'Co-Founder',
    bio: '',
    cf: { zodiacSign: 'A Scorpio through and through', tvShow: 'Formula One, Drive to Survive', hiddenTalent: 'Driving - Cars are one of my current obsessions', fashionTrend: 'Thin eyebrows and Juicy tracksuits', alternativeCareer: 'Owner of an animal sanctuary or a naturopath' }
  },
  {
    name: 'Grant Thorsen',
    title: 'Co-Founder & Business Development',
    bio: '',
    cf: { biggestPetPeeve: "Coming to a full stop at a red light and having it immediately turn green.", alternativeCareer: "A weatherman (I still think about becoming one tbh... sorry, Jenn!)", 'Something Unique': "I've been an avid visor-wearing man since about 2007. I don't actually own a single full hat, only visors.", 'Crunchy or Smooth Peanut Butter': "Extra crunchy. I'm not sure I can even eat smooth peanut butter. I might be allergic." }
  },
  {
    name: 'Laura Kramer',
    title: 'Designer',
    bio: '',
    cf: { zodiacSign: 'Taurus', biggestPetPeeve: "I can't stand a dirty sink", ifAnimal: 'Squirrel', notWorking: 'Gardening and cooking', fashionTrend: "I've had every hair color/cut you can imagine... some good, some really bad", instagram: '@laura.b.kramer' }
  },
  {
    name: 'Melissa Kunes',
    title: 'Designer',
    bio: '',
    cf: { alternativeCareer: "Running my own home decor store or a bakery. I don't bake, it just sounds fun.", hiddenTalent: 'Consistently picking the wrong size of Tupperware', fashionTrend: 'Gauchos. Bumpits. Brightly colored plaid shorts.', favoritePasta: 'Farfalle (more surface area for sauce)', karaoSong: 'Fergalicious, hands down, every time.' }
  },
  {
    name: 'Alex Kotkiewicz',
    title: 'Designer',
    bio: 'Alex has been reimagining spaces since childhood\u2014starting with a constantly evolving bedroom layout and an insatiable curiosity for how design shapes the way we live.\n\nThat early curiosity led her to High Point University, where she earned a degree in Interior Design before moving to Utah to pursue her career in high-end residential interiors.\n\nWith seven years in the industry, Alex thrives on the art of balance and contrast\u2014creating spaces that feel both curated and deeply personal.\n\nFor Alex, great design isn\'t just about aesthetics\u2014it\'s about creating environments that feel like home in the most intentional, beautiful way.',
    cf: { seasonalColor: 'True Winter', designRuleToBreak: 'Using oversized lighting in unexpected spaces\u2014it adds character and makes a bold statement where you least expect it.', notWorking: 'Traveling, spending time with friends, snowboarding, hiking' }
  },
  {
    name: 'Claire English',
    title: 'Accounts Manager',
    bio: '',
    cf: { tvShow: 'Yellowstone', celebrityCrush: 'Brad Pitt', favoriteWord: 'Yikes', alternativeCareer: 'Oil Painter', fashionTrend: "The grunge era, men's cut off shorts, and large baggy plaid shirts" }
  },
  {
    name: 'Andrea Aldana',
    title: 'Design Assistant & AutoCAD Specialist',
    bio: '',
    cf: { zodiacSign: 'Aries', 'Favorite Color': 'Bold and deep greens have my heart', biggestPetPeeve: 'Loud chewing.', alternativeCareer: 'Lawyer, for sure. Just ask my husband.', 'Most Used Emoji': 'Smiling face with hearts' }
  },
  {
    name: 'Perla',
    title: 'Personal Space Infiltration Officer',
    bio: 'The official Bond Design Company office greeter and morale booster. Perla ensures every visitor feels welcomed with a purr and a nudge.',
    cf: { zodiacSign: 'Leo - loves the spotlight', hiddenTalent: 'Napping in the most inconvenient places', alternativeCareer: 'Professional lap warmer' }
  }
];

updates.forEach(u => {
  const cfStr = JSON.stringify(u.cf);
  stmt.run(u.title, u.bio, u.bio, cfStr, u.name);
  console.log('  Updated: ' + u.name + ' (' + Object.keys(u.cf).length + ' fields)');
});

console.log('\nDone!');
db.close();
