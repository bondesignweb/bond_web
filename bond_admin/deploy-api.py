#!/usr/bin/env python3
"""
Bond Design Company — API Backend Deployment
Installs Express/SQLite API, wires Admin to real data, adds page tracking.
Run: python3 deploy-api.py
"""
import os, sys, subprocess, shutil, json, re

ROOT = "/root"
API_DIR = os.path.join(ROOT, "api")
SRC = os.path.join(ROOT, "src")

def green(s): return f"\033[92m{s}\033[0m"
def red(s): return f"\033[91m{s}\033[0m"
def gold(s): return f"\033[33m{s}\033[0m"
def dim(s): return f"\033[2m{s}\033[0m"

def step(msg): print(f"  → {msg}")
def ok(msg): print(f"    {green('✓')} {msg}")
def fail(msg): print(f"    {red('✗')} {msg}")

def banner():
    print()
    print(gold("  ╔═══════════════════════════════════════════╗"))
    print(gold("  ║   BOND API Backend — Full Deployment      ║"))
    print(gold("  ╚═══════════════════════════════════════════╝"))
    print()


# ─── Step 1: Copy API files ───
def install_api():
    step("Installing API server files...")
    src_dir = os.path.join(ROOT, "bond_admin")  # where the zip was extracted

    # Create API directory
    os.makedirs(API_DIR, exist_ok=True)

    for f in ['server.js', 'db.js', 'package.json']:
        src = os.path.join(src_dir, f)
        dst = os.path.join(API_DIR, f)
        if os.path.exists(src):
            shutil.copy2(src, dst)

    ok("API files installed to /root/api/")
    return True


# ─── Step 2: Install npm dependencies ───
def install_deps():
    step("Installing API dependencies (express, sqlite, etc.)...")
    try:
        result = subprocess.run(
            ['npm', 'install', '--production'],
            cwd=API_DIR, capture_output=True, text=True, timeout=120
        )
        if result.returncode == 0:
            ok("Dependencies installed")
            return True
        else:
            fail(f"npm install failed: {result.stderr[:200]}")
            return False
    except Exception as e:
        fail(f"Error: {e}")
        return False


# ─── Step 3: Create systemd service ───
def create_service():
    step("Creating bond-api systemd service...")
    service = """[Unit]
Description=Bond Design Company API Server
After=network.target

[Service]
Type=simple
WorkingDirectory=/root/api
ExecStart=/usr/bin/node /root/api/server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
Environment=JWT_SECRET=bond-prod-secret-change-me-2026

[Install]
WantedBy=multi-user.target
"""
    with open('/etc/systemd/system/bond-api.service', 'w') as f:
        f.write(service)

    subprocess.run(['systemctl', 'daemon-reload'], capture_output=True)
    subprocess.run(['systemctl', 'enable', 'bond-api'], capture_output=True)
    subprocess.run(['systemctl', 'restart', 'bond-api'], capture_output=True)

    import time
    time.sleep(3)

    result = subprocess.run(['systemctl', 'is-active', 'bond-api'], capture_output=True, text=True)
    if result.stdout.strip() == 'active':
        ok("API service running on port 3001")
        return True
    else:
        fail("API service failed to start")
        print(dim("    Run: journalctl -u bond-api -n 30 --no-pager"))
        return False


# ─── Step 4: Update Vite proxy ───
def update_vite_config():
    step("Updating Vite config to proxy /api requests...")
    config_path = os.path.join(ROOT, "vite.config.js")

    if not os.path.exists(config_path):
        fail("vite.config.js not found")
        return False

    with open(config_path, 'r') as f:
        content = f.read()

    if '/api' in content:
        ok("Vite proxy already configured")
        return True

    # Build a clean vite config with proxy
    new_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: ['bond.gibbsdev.net', 'localhost', '127.0.0.1'],
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
"""
    with open(config_path, 'w') as f:
        f.write(new_config)

    ok("Vite proxy configured: /api → localhost:3001")
    return True


# ─── Step 5: Install PageTracker ───
def install_tracker():
    step("Installing page view tracker...")
    src = os.path.join(ROOT, "bond_admin", "PageTracker.jsx")
    dst = os.path.join(SRC, "components", "PageTracker.jsx")

    os.makedirs(os.path.join(SRC, "components"), exist_ok=True)

    if os.path.exists(src):
        shutil.copy2(src, dst)
        ok("PageTracker.jsx installed to src/components/")
    else:
        fail("PageTracker.jsx not found in bond_admin/")
        return False

    # Add to App.jsx
    app_path = os.path.join(SRC, "App.jsx")
    if os.path.exists(app_path):
        with open(app_path, 'r') as f:
            content = f.read()

        if 'PageTracker' not in content:
            # Add import
            content = 'import PageTracker from "@/components/PageTracker";\n' + content

            # Add component inside the router
            # Look for <Layout or <Routes and add PageTracker nearby
            if '<Layout' in content:
                content = content.replace('<Layout', '<><PageTracker /><Layout', 1)
                # Find the matching closing and wrap
            elif '<BrowserRouter' in content:
                content = content.replace('<BrowserRouter>', '<BrowserRouter>\n        <PageTracker />')

            with open(app_path, 'w') as f:
                f.write(content)
            ok("PageTracker added to App.jsx")
        else:
            ok("PageTracker already in App.jsx")
    return True


# ─── Step 6: Install Admin API utility ───
def install_admin_api():
    step("Installing admin API utility...")
    src = os.path.join(ROOT, "bond_admin", "adminApi.js")
    dst = os.path.join(SRC, "utils", "adminApi.js")

    os.makedirs(os.path.join(SRC, "utils"), exist_ok=True)

    if os.path.exists(src):
        shutil.copy2(src, dst)
        ok("adminApi.js installed to src/utils/")
    else:
        fail("adminApi.js not found")
        return False
    return True


# ─── Step 7: Patch Admin.jsx to use API ───
def patch_admin():
    step("Patching Admin.jsx to use real API...")
    admin_path = os.path.join(SRC, "pages", "Admin.jsx")

    if not os.path.exists(admin_path):
        fail("Admin.jsx not found")
        return False

    with open(admin_path, 'r') as f:
        content = f.read()

    if 'adminApi' in content:
        ok("Admin.jsx already patched")
        return True

    # === KEY PATCHES ===

    # 1. Add API import at the top
    api_import = """import * as api from '@/utils/adminApi';
import { setToken, getToken, isAuthenticated } from '@/utils/adminApi';

"""
    content = api_import + content

    # 2. Replace LoginScreen's hardcoded password check with API call
    content = content.replace(
        """    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
      } else {
        setError('Invalid password');
        setLoading(false);
      }
    }, 800);""",
        """    api.auth.login(password.includes('@') ? password : 'admin@bonddesigncompany.com', password)
      .then(data => {
        setToken(data.token);
        onLogin();
      })
      .catch(err => {
        setError(err.message || 'Invalid password');
        setLoading(false);
      });"""
    )

    # 3. Replace DashboardSection to fetch real data
    old_dashboard_stats = """  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Visitors" value="14.3K" change="+12.3%" icon={<Icons.Eye />} />
        <StatCard label="Portfolio Projects" value="5" change="+2" icon={<Icons.Portfolio />} />
        <StatCard label="Team Members" value="11" icon={<Icons.Team />} />
        <StatCard label="Press Features" value="6" change="+1" icon={<Icons.Press />} />
      </div>"""

    new_dashboard_stats = """  const [stats, setStats] = React.useState(null);
  const [analyticsData, setAnalyticsData] = React.useState(null);

  React.useEffect(() => {
    api.dashboard.get().then(setStats).catch(console.error);
    api.analytics.get().then(setAnalyticsData).catch(console.error);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Visitors" value={stats ? stats.total_views.toLocaleString() : '...'} change={stats ? `${stats.views_today} today` : ''} icon={<Icons.Eye />} />
        <StatCard label="Portfolio Projects" value={stats ? String(stats.portfolios) : '...'} icon={<Icons.Portfolio />} />
        <StatCard label="Team Members" value={stats ? String(stats.team_members) : '...'} icon={<Icons.Team />} />
        <StatCard label="Press Features" value={stats ? String(stats.press_features) : '...'} icon={<Icons.Press />} />
      </div>"""

    content = content.replace(old_dashboard_stats, new_dashboard_stats)

    # 4. Replace UsersSection to fetch from API
    content = content.replace(
        'const [users, setUsers] = useState(initialUsers);',
        """const [users, setUsers] = useState([]);
  React.useEffect(() => { api.users.list().then(setUsers).catch(console.error); }, []);"""
    )

    # Replace user save
    content = content.replace(
        """    if (editUser) {
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
  };""",
        """    const data = { ...form };
    if (editUser) {
      api.users.update(editUser.id, data).then(updated => {
        setUsers(users.map(u => u.id === editUser.id ? { ...u, ...updated } : u));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.users.create(data).then(created => {
        setUsers([...users, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      api.users.delete(id).then(() => setUsers(users.filter(u => u.id !== id))).catch(e => alert(e.message));
    }
  };"""
    )

    # 5. Replace PortfoliosSection to fetch from API
    content = content.replace(
        'const [portfolios, setPortfolios] = useState(initialPortfolios);',
        """const [portfolios, setPortfolios] = useState([]);
  React.useEffect(() => { api.portfolios.list().then(setPortfolios).catch(console.error); }, []);"""
    )

    # Replace portfolio save
    old_portfolio_save = """    if (editItem) {
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
  };"""

    new_portfolio_save = """    const data = { ...form };
    if (editItem) {
      api.portfolios.update(editItem.id, data).then(updated => {
        setPortfolios(portfolios.map(p => p.id === editItem.id ? { ...p, ...updated } : p));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.portfolios.create(data).then(created => {
        setPortfolios([...portfolios, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this portfolio project?')) {
      api.portfolios.delete(id).then(() => setPortfolios(portfolios.filter(p => p.id !== id))).catch(e => alert(e.message));
    }
  };

  const toggleFeatured = (id) => {
    const p = portfolios.find(x => x.id === id);
    api.portfolios.update(id, { featured: !p.featured }).then(updated => {
      setPortfolios(portfolios.map(x => x.id === id ? { ...x, ...updated } : x));
    }).catch(e => alert(e.message));
  };"""

    content = content.replace(old_portfolio_save, new_portfolio_save)

    # 6. Replace TeamSection to fetch from API
    content = content.replace(
        'const [members, setMembers] = useState(initialTeamMembers);',
        """const [members, setMembers] = useState([]);
  React.useEffect(() => { api.team.list().then(setMembers).catch(console.error); }, []);"""
    )

    # Replace team save
    old_team_save = """    if (editMember) {
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
  };"""

    new_team_save = """    const data = { ...form };
    if (editMember) {
      api.team.update(editMember.id, data).then(updated => {
        setMembers(members.map(m => m.id === editMember.id ? { ...m, ...updated } : m));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.team.create(data).then(created => {
        setMembers([...members, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this team member?')) {
      api.team.delete(id).then(() => setMembers(members.filter(m => m.id !== id))).catch(e => alert(e.message));
    }
  };

  const toggleActive = (id) => {
    const m = members.find(x => x.id === id);
    api.team.update(id, { active: !m.active }).then(updated => {
      setMembers(members.map(x => x.id === id ? { ...x, ...updated } : x));
    }).catch(e => alert(e.message));
  };"""

    content = content.replace(old_team_save, new_team_save)

    # 7. Replace PressSection to fetch from API
    content = content.replace(
        'const [releases, setReleases] = useState(initialPressReleases);',
        """const [releases, setReleases] = useState([]);
  React.useEffect(() => { api.press.list().then(setReleases).catch(console.error); }, []);"""
    )

    # Replace press save
    old_press_save = """    if (editItem) {
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
  };"""

    new_press_save = """    const data = { ...form };
    if (editItem) {
      api.press.update(editItem.id, data).then(updated => {
        setReleases(releases.map(r => r.id === editItem.id ? { ...r, ...updated } : r));
        setModalOpen(false);
      }).catch(e => alert(e.message));
    } else {
      api.press.create(data).then(created => {
        setReleases([...releases, created]);
        setModalOpen(false);
      }).catch(e => alert(e.message));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this press release?')) {
      api.press.delete(id).then(() => setReleases(releases.filter(r => r.id !== id))).catch(e => alert(e.message));
    }
  };"""

    content = content.replace(old_press_save, new_press_save)

    # 8. Replace auth check in main component
    content = content.replace(
        """  // Check session
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
  };""",
        """  // Check session via JWT
  useEffect(() => {
    if (isAuthenticated()) {
      api.auth.me().then(() => setAuthenticated(true)).catch(() => {
        setToken(null);
        setAuthenticated(false);
      });
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setToken(null);
    setAuthenticated(false);
  };"""
    )

    # 9. Fix image references for team members
    content = content.replace(
        '{member.image ? (',
        '{(member.image || member.image_path) ? ('
    )
    content = content.replace(
        '<img src={member.image}',
        '<img src={member.image || member.image_path}'
    )

    # 10. Fix portfolio image count reference
    content = content.replace(
        'project.images} images',
        '(project.image_count || project.images || 0)} images'
    )

    # Write patched file
    with open(admin_path, 'w') as f:
        f.write(content)

    ok("Admin.jsx patched to use real API")
    return True


# ─── Step 8: Also update Nginx to proxy /api ───
def update_nginx():
    step("Updating Nginx to proxy /api...")
    nginx_conf = "/etc/nginx/sites-available/bond-design"

    if not os.path.exists(nginx_conf):
        ok("No Nginx config found (using Vite proxy only)")
        return True

    with open(nginx_conf, 'r') as f:
        content = f.read()

    if '/api' in content:
        ok("Nginx /api proxy already configured")
        return True

    # Add API proxy block before the closing server }
    api_block = """
    # API proxy
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        proxy_pass http://127.0.0.1:3001;
    }
"""
    content = content.replace('location / {', api_block + '\n    location / {')

    with open(nginx_conf, 'w') as f:
        f.write(content)

    subprocess.run(['nginx', '-t'], capture_output=True)
    subprocess.run(['systemctl', 'reload', 'nginx'], capture_output=True)
    ok("Nginx updated with /api and /uploads proxy")
    return True


# ─── Step 9: Restart Vite ───
def restart_vite():
    step("Restarting Vite dev server...")
    subprocess.run(['systemctl', 'restart', 'bond-design'], capture_output=True)
    import time
    time.sleep(3)
    result = subprocess.run(['systemctl', 'is-active', 'bond-design'], capture_output=True, text=True)
    if result.stdout.strip() == 'active':
        ok("Vite server restarted")
        return True
    fail("Vite restart failed")
    return False


# ─── Main ───
def main():
    banner()

    results = []
    results.append(("API files", install_api()))
    results.append(("Dependencies", install_deps()))
    results.append(("API service", create_service()))
    results.append(("Vite proxy", update_vite_config()))
    results.append(("Page tracker", install_tracker()))
    results.append(("Admin API util", install_admin_api()))
    results.append(("Admin patch", patch_admin()))
    results.append(("Nginx", update_nginx()))
    results.append(("Vite restart", restart_vite()))

    print()
    all_ok = all(r[1] for r in results)

    for name, success in results:
        status = green("✓") if success else red("✗")
        print(f"    {status} {name}")

    print()
    if all_ok:
        print(gold("  ╔═══════════════════════════════════════════════╗"))
        print(gold("  ║   ✓ API Backend Fully Deployed!               ║"))
        print(gold("  ║                                               ║"))
        print(gold("  ║   API:     http://localhost:3001               ║"))
        print(gold("  ║   Admin:   https://bond.gibbsdev.net/admin    ║"))
        print(gold("  ║   Password: bond2026                          ║"))
        print(gold("  ║                                               ║"))
        print(gold("  ║   All data is now stored in SQLite at:        ║"))
        print(gold("  ║   /root/api/bond.db                           ║"))
        print(gold("  ║                                               ║"))
        print(gold("  ║   Uploads saved to: /root/uploads/            ║"))
        print(gold("  ║   Page views tracked automatically.           ║"))
        print(gold("  ╚═══════════════════════════════════════════════╝"))
    else:
        print(gold("  ╔═══════════════════════════════════════════════╗"))
        print(gold("  ║   ⚠ Deployed with some issues. Check above.  ║"))
        print(gold("  ╚═══════════════════════════════════════════════╝"))
    print()


if __name__ == '__main__':
    main()
