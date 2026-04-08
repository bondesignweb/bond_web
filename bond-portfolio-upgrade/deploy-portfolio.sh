#!/bin/bash
# Bond Portfolio Modernization Deploy
set -e

echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║  Portfolio Manager — Deploying...        ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""

cd /root

# 1. Copy PortfolioManager component
echo "  → Installing PortfolioManager component..."
cp bond_admin/PortfolioManager.jsx src/components/PortfolioManager.jsx
echo "    ✓ Component installed"

# 2. Sync portfolio database with real projects
echo "  → Syncing portfolio database..."
cp bond_admin/sync-portfolios.js api/sync-portfolios.js
cd /root/api && node sync-portfolios.js
cd /root
echo "    ✓ Database synced"

# 3. Patch Admin.jsx to use PortfolioManager
echo "  → Patching Admin.jsx..."

# Add import for PortfolioManager at top of file
if ! grep -q "PortfolioManager" src/pages/Admin.jsx; then
  sed -i '1s/^/import PortfolioManager from "@\/components\/PortfolioManager";\n/' src/pages/Admin.jsx
  
  # Replace the PortfoliosSection call with PortfolioManager
  sed -i "s/case 'portfolios': return <PortfoliosSection \/>;/case 'portfolios': return <PortfolioManager \/>;/" src/pages/Admin.jsx
  echo "    ✓ Admin.jsx patched"
else
  echo "    ✓ Already patched"
fi

# 4. Also update the API categories to match real data
echo "  → Updating API schema..."
cd /root/api

# Add location column if missing
python3 -c "
import sqlite3
conn = sqlite3.connect('bond.db')
c = conn.cursor()
# Check if location column exists
cols = [col[1] for col in c.execute('PRAGMA table_info(portfolios)').fetchall()]
if 'location' not in cols:
    c.execute('ALTER TABLE portfolios ADD COLUMN location TEXT DEFAULT \"Park City\"')
    conn.commit()
    print('    ✓ Location column added')
else:
    print('    ✓ Schema already up to date')
conn.close()
"

cd /root

# 5. Restart services
echo "  → Restarting services..."
systemctl restart bond-api
sleep 2
systemctl restart bond-design
sleep 3

API_OK=$(systemctl is-active bond-api)
VITE_OK=$(systemctl is-active bond-design)

echo ""
echo "    API:  $API_OK"
echo "    Vite: $VITE_OK"

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║  ✓ Portfolio Manager Deployed!               ║"
echo "  ║                                              ║"
echo "  ║  Features:                                   ║"
echo "  ║  • Visual card grid with cover images        ║"
echo "  ║  • Category filters (NC/Remodel/Furnish)     ║"
echo "  ║  • Location filters (PC/SLC/DV)              ║"
echo "  ║  • Grid + list view toggle                   ║"
echo "  ║  • Featured/published toggles                ║"
echo "  ║  • 9 real projects synced from live site      ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""
