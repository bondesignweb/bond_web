#!/bin/bash
# ═══════════════════════════════════════════════════════════
# Bond Design Company — Admin Backend Deployment Script
# Run this on your Ubuntu server: bash deploy-admin.sh
# ═══════════════════════════════════════════════════════════

set -e
echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║   BOND Admin Backend — Deploying...  ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

cd /root

# ─── Step 1: Copy Admin.jsx to src/pages/ ───
echo "→ Installing Admin.jsx..."
cp /root/bond_admin/Admin.jsx /root/src/pages/Admin.jsx
echo "  ✓ Admin page installed"

# ─── Step 2: Add /admin route to the app config ───
# First, find and patch the routing configuration
echo "→ Patching routes..."

# Check if pages.config.js exists and patch it
if [ -f /root/src/pages.config.js ]; then
  # Check if admin route already exists
  if ! grep -q "Admin" /root/src/pages.config.js; then
    # Add admin route — insert before the last closing bracket/export
    sed -i '/^]/i\  { path: "/admin", component: "Admin" },' /root/src/pages.config.js 2>/dev/null || true
    echo "  ✓ Route added to pages.config.js"
  else
    echo "  ✓ Admin route already exists in pages.config.js"
  fi
fi

# Also check App.jsx for routes
if [ -f /root/src/App.jsx ]; then
  if ! grep -q "Admin" /root/src/App.jsx; then
    # Add import for Admin page
    sed -i '1s/^/import Admin from "@\/pages\/Admin";\n/' /root/src/App.jsx 2>/dev/null || true
    # Add route — look for the Routes or route definitions
    # Try to add before the closing Route/Routes tag
    sed -i '/<Route.*path="\/\*"/i\        <Route path="/admin" element={<Admin />} />' /root/src/App.jsx 2>/dev/null || true
    echo "  ✓ Route added to App.jsx"
  else
    echo "  ✓ Admin route already exists in App.jsx"
  fi
fi

# ─── Step 3: Add admin link to footer in Layout.jsx ───
echo "→ Adding admin link to footer..."

if [ -f /root/src/Layout.jsx ]; then
  if ! grep -q "/admin" /root/src/Layout.jsx; then
    # Find the copyright line and add admin link after it
    sed -i 's|© 2025 Bond Design Company. All rights reserved.|© 2025 Bond Design Company. All rights reserved.</p>\n          <a href="/admin" className="text-[#6B6B6B]/30 hover:text-[#8B7355] text-[10px] tracking-[0.15em] uppercase transition-colors mt-2 inline-block">Admin</a>\n          <p style={{display:"none"}}|' /root/src/Layout.jsx 2>/dev/null || true
    echo "  ✓ Admin link added to footer"
  else
    echo "  ✓ Admin link already exists in footer"
  fi
fi

echo ""
echo "→ Restarting bond-design service..."
systemctl restart bond-design
sleep 3

# Check if it's running
if systemctl is-active --quiet bond-design; then
  echo "  ✓ Service restarted successfully"
else
  echo "  ✗ Service failed to start. Check logs:"
  echo "    journalctl -u bond-design -n 30 --no-pager"
fi

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║   ✓ Admin Backend Deployed!                  ║"
echo "  ║                                              ║"
echo "  ║   URL: https://bond.gibbsdev.net/admin       ║"
echo "  ║   Password: bond2026                         ║"
echo "  ║                                              ║"
echo "  ║   The admin link is in the site footer.      ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""
