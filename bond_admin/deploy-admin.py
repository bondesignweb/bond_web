#!/usr/bin/env python3
"""
Bond Design Company — Admin Backend Deployer
Run: python3 deploy-admin.py
"""
import os
import re
import sys
import subprocess

ROOT = "/root"
SRC = os.path.join(ROOT, "src")
PAGES = os.path.join(SRC, "pages")

def green(s): return f"\033[92m{s}\033[0m"
def red(s): return f"\033[91m{s}\033[0m"
def dim(s): return f"\033[2m{s}\033[0m"
def gold(s): return f"\033[33m{s}\033[0m"

def banner():
    print()
    print(gold("  ╔══════════════════════════════════════╗"))
    print(gold("  ║   BOND Admin Backend — Deploying...  ║"))
    print(gold("  ╚══════════════════════════════════════╝"))
    print()

def step(msg):
    print(f"  → {msg}")

def ok(msg):
    print(f"    {green('✓')} {msg}")

def fail(msg):
    print(f"    {red('✗')} {msg}")

# ─── Step 1: Copy Admin.jsx ───
def install_admin_page():
    step("Installing Admin.jsx to src/pages/...")
    src = os.path.join(ROOT, "bond_admin", "Admin.jsx")
    dst = os.path.join(PAGES, "Admin.jsx")
    
    if not os.path.exists(src):
        fail(f"Admin.jsx not found at {src}")
        return False
    
    if not os.path.exists(PAGES):
        os.makedirs(PAGES, exist_ok=True)
    
    with open(src, 'r') as f:
        content = f.read()
    with open(dst, 'w') as f:
        f.write(content)
    
    ok(f"Admin.jsx installed ({len(content)} bytes)")
    return True

# ─── Step 2: Add route to App.jsx ───
def patch_routes():
    step("Adding /admin route...")
    
    app_path = os.path.join(SRC, "App.jsx")
    if not os.path.exists(app_path):
        fail("App.jsx not found — you may need to add the route manually")
        print(dim(f"    Look for your routing file and add:"))
        print(dim(f'    import Admin from "@/pages/Admin";'))
        print(dim(f'    <Route path="/admin" element={{<Admin />}} />'))
        return False
    
    with open(app_path, 'r') as f:
        content = f.read()
    
    if '/admin' in content or 'Admin' in content:
        ok("Admin route already exists in App.jsx")
        return True
    
    modified = False
    
    # Add import statement
    # Find the last import line and add after it
    import_line = 'import Admin from "@/pages/Admin";'
    
    # Find all import statements
    lines = content.split('\n')
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.strip().startswith('import '):
            last_import_idx = i
    
    if last_import_idx >= 0:
        lines.insert(last_import_idx + 1, import_line)
        content = '\n'.join(lines)
        modified = True
    
    # Add route — find where other Routes are defined
    # Look for patterns like <Route path="/" or element={<Layout
    route_line = '            <Route path="/admin" element={<Admin />} />'
    
    # Strategy: find a line with <Route path="*" (catch-all) and insert before it
    if '<Route path="*"' in content:
        content = content.replace(
            '<Route path="*"',
            route_line + '\n            <Route path="*"'
        )
        modified = True
    # Or find closing </Routes> and insert before it
    elif '</Routes>' in content:
        content = content.replace(
            '</Routes>',
            route_line + '\n          </Routes>'
        )
        modified = True
    # Or find closing </Route> (nested routes) 
    elif content.count('</Route>') > 0:
        # Insert before the LAST </Route>
        last_idx = content.rfind('</Route>')
        content = content[:last_idx] + route_line + '\n          ' + content[last_idx:]
        modified = True
    else:
        fail("Could not find route insertion point")
        print(dim(f"    Manually add this route to your routing config:"))
        print(dim(f'    <Route path="/admin" element={{<Admin />}} />'))
        return False
    
    if modified:
        with open(app_path, 'w') as f:
            f.write(content)
        ok("Route added to App.jsx")
        return True
    
    return False

# ─── Step 3: Add admin link to footer ───
def patch_footer():
    step("Adding admin link to footer...")
    
    layout_path = os.path.join(SRC, "Layout.jsx")
    if not os.path.exists(layout_path):
        fail("Layout.jsx not found")
        return False
    
    with open(layout_path, 'r') as f:
        content = f.read()
    
    if '/admin' in content:
        ok("Admin link already in footer")
        return True
    
    # Find the copyright text and add admin link nearby
    # Look for "All rights reserved" or similar copyright text
    copyright_patterns = [
        'All rights reserved.',
        'Bond Design Company.',
        '© 2025',
        '© 2026',
    ]
    
    for pattern in copyright_patterns:
        if pattern in content:
            # Find the closing </p> or </div> after the copyright
            idx = content.find(pattern)
            # Find the next closing tag after the copyright
            after = content[idx:]
            
            # Find the parent closing div of the footer section
            # We'll add a subtle admin link after the copyright paragraph
            close_p = after.find('</p>')
            if close_p >= 0:
                insert_point = idx + close_p + 4
                admin_link = '\n              <a href="/admin" className="block text-center text-[10px] text-white/10 hover:text-[#8B7355]/50 tracking-[0.15em] uppercase transition-colors mt-3" style={{fontSize: "9px"}}>Admin</a>'
                content = content[:insert_point] + admin_link + content[insert_point:]
                
                with open(layout_path, 'w') as f:
                    f.write(content)
                ok("Admin link added to footer (subtle, bottom-right)")
                return True
    
    # Fallback: look for </footer> and add before it
    if '</footer>' in content:
        admin_link = '      <div className="text-center pb-4"><a href="/admin" className="text-[9px] text-white/10 hover:text-[#8B7355]/50 tracking-[0.15em] uppercase transition-colors">Admin</a></div>\n    '
        content = content.replace('</footer>', admin_link + '</footer>')
        
        with open(layout_path, 'w') as f:
            f.write(content)
        ok("Admin link added before </footer>")
        return True
    
    fail("Could not find footer insertion point")
    print(dim("    Manually add this to your footer:"))
    print(dim('    <a href="/admin">Admin</a>'))
    return False

# ─── Step 4: Restart service ───
def restart_service():
    step("Restarting bond-design service...")
    try:
        subprocess.run(['systemctl', 'restart', 'bond-design'], check=True, capture_output=True)
        import time
        time.sleep(3)
        result = subprocess.run(['systemctl', 'is-active', 'bond-design'], capture_output=True, text=True)
        if result.stdout.strip() == 'active':
            ok("Service restarted and running")
            return True
        else:
            fail("Service not active after restart")
            print(dim("    Run: journalctl -u bond-design -n 30 --no-pager"))
            return False
    except Exception as e:
        fail(f"Could not restart service: {e}")
        return False

# ─── Main ───
def main():
    banner()
    
    success = True
    success = install_admin_page() and success
    success = patch_routes() and success
    success = patch_footer() and success
    success = restart_service() and success
    
    print()
    if success:
        print(gold("  ╔══════════════════════════════════════════════╗"))
        print(gold("  ║   ✓ Admin Backend Deployed!                  ║"))
        print(gold("  ║                                              ║"))
        print(gold("  ║   URL: https://bond.gibbsdev.net/admin       ║"))
        print(gold("  ║   Password: bond2026                         ║"))
        print(gold("  ║                                              ║"))
        print(gold("  ║   Look for the 'Admin' link in the footer.   ║"))
        print(gold("  ╚══════════════════════════════════════════════╝"))
    else:
        print(gold("  ╔══════════════════════════════════════════════╗"))
        print(gold("  ║   ⚠ Deployed with some manual steps needed  ║"))
        print(gold("  ║   Check the messages above for details.     ║"))
        print(gold("  ╚══════════════════════════════════════════════╝"))
    print()

if __name__ == '__main__':
    main()
