const Database = require('better-sqlite3');
const db = new Database('./bond.db');
console.log('Columns:', db.pragma('table_info(team_members)').map(c => c.name).join(', '));

db.prepare('DELETE FROM team_members').run();
const insert = db.prepare('INSERT INTO team_members (name, title, image_path, active, bio, sort_order, custom_fields) VALUES (?, ?, ?, 1, ?, ?, ?)');

const team = [
  ['Jennifer Chipman', 'Co-Founder & Principal Designer', '/uploads/team/jennifer-chipman.jpg', '', 1],
  ['Chelsey Milton', 'Co-Founder', '/uploads/team/chelsey-milton.jpg', '', 2],
  ['Grant Thorsen', 'Co-Founder & Business Development', '/uploads/team/grant-thorsen.jpg', '', 3],
  ['Laura Kramer', 'Designer', '/uploads/team/laura-kramer.jpg', '', 4],
  ['Melissa Kunes', 'Designer', '/uploads/team/melissa-kunes.jpg', '', 5],
  ['Alex Kotkiewicz', 'Designer', '/uploads/team/alex-kotkiewicz.jpg', '', 6],
  ['Claire English', 'Project Manager', '/uploads/team/claire-english.jpg', '', 7],
  ['Nicole Messerole', 'Project Manager', '/uploads/team/nicole-messerole.jpg', '', 8],
  ['Andrea Aldana', 'Project Manager', '/uploads/team/andrea-aldana.jpg', '', 9],
  ['Hannah Holmes', 'Marketing Director', '/uploads/team/hannah-holmes.jpg', '', 10],
  ['Michael Lopez', 'Operations Specialist', '/uploads/team/michael-lopez.jpg', '', 11],
  ['Perla', 'Personal Space Infiltration Officer', '/uploads/team/perla.jpg', 'Office greeter and morale booster.', 12],
];

team.forEach(t => insert.run(t[0], t[1], t[2], t[3], t[4], '{}'));
console.log(team.length + ' team members synced');
const all = db.prepare('SELECT name, title FROM team_members ORDER BY sort_order').all();
all.forEach(m => console.log('  ' + m.name + ' — ' + m.title));
db.close();
