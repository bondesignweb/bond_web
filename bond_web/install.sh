#!/usr/bin/env bash
# ============================================================================
# Bond Design Company — Ubuntu Server Install & Deploy Script
# ============================================================================
# Installs Node.js, builds the Next.js app in standalone mode, sets up
# systemd + Nginx reverse proxy, and optionally enables SSL.
#
# Usage:
#   chmod +x install.sh
#   sudo ./install.sh
#
# Options:
#   --domain example.com    Set your domain (default: server IP)
#   --port 3000             Set the app port (default: 3000)
#   --ssl                   Enable SSL via Let's Encrypt (requires --domain)
#   --skip-nginx            Skip Nginx (run standalone only)
#   --no-swap               Skip swap file creation
#
# Example:
#   sudo ./install.sh --domain bonddesigncompany.com --ssl
# ============================================================================

set -euo pipefail

# ── Colors ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
log()    { echo -e "${GREEN}[✓]${NC} $1"; }
warn()   { echo -e "${YELLOW}[!]${NC} $1"; }
error()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }
header() { echo -e "\n${CYAN}${BOLD}═══ $1 ═══${NC}\n"; }

# ── Default Config ──────────────────────────────────────────────────────────
DOMAIN=""
PORT=3000
ENABLE_SSL=false
SKIP_NGINX=false
CREATE_SWAP=true
APP_NAME="bond-design"
APP_DIR="/var/www/${APP_NAME}"
APP_USER="bondapp"
NODE_VERSION="20"

# ── Parse Arguments ─────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case $1 in
    --domain)     DOMAIN="$2"; shift 2 ;;
    --port)       PORT="$2"; shift 2 ;;
    --ssl)        ENABLE_SSL=true; shift ;;
    --skip-nginx) SKIP_NGINX=true; shift ;;
    --no-swap)    CREATE_SWAP=false; shift ;;
    -h|--help)    head -25 "$0" | tail -18; exit 0 ;;
    *)            error "Unknown option: $1. Use --help for usage." ;;
  esac
done

# ── Preflight ───────────────────────────────────────────────────────────────
[[ $EUID -ne 0 ]] && error "This script must be run as root (use sudo)."
[[ "$ENABLE_SSL" == true && -z "$DOMAIN" ]] && error "SSL requires --domain."

SERVER_IP=$(hostname -I | awk '{print $1}')
[[ -z "$DOMAIN" ]] && DOMAIN="$SERVER_IP"

header "Bond Design Company — Server Setup"
echo -e "  Domain/IP : ${BOLD}${DOMAIN}${NC}"
echo -e "  App Port  : ${BOLD}${PORT}${NC}"
echo -e "  SSL       : ${BOLD}${ENABLE_SSL}${NC}"
echo -e "  Nginx     : ${BOLD}$([[ "$SKIP_NGINX" == true ]] && echo "skip" || echo "yes")${NC}"
echo ""
read -rp "Proceed? [Y/n] " confirm
[[ "${confirm,,}" == "n" ]] && exit 0

# ── 1. System Update ───────────────────────────────────────────────────────
header "1/8 — System Packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq
apt-get install -y -qq curl git build-essential ufw unzip
log "System packages updated"

# ── 2. Swap ────────────────────────────────────────────────────────────────
if [[ "$CREATE_SWAP" == true ]]; then
  header "2/8 — Swap"
  TOTAL_MEM=$(free -m | awk '/Mem:/ {print $2}')
  if [[ $TOTAL_MEM -lt 2048 ]] && ! swapon --show | grep -q '/swapfile'; then
    fallocate -l 2G /swapfile && chmod 600 /swapfile
    mkswap /swapfile && swapon /swapfile
    grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    log "2GB swap created (${TOTAL_MEM}MB RAM)"
  else
    log "Swap OK (${TOTAL_MEM}MB RAM)"
  fi
fi

# ── 3. Node.js ─────────────────────────────────────────────────────────────
header "3/8 — Node.js ${NODE_VERSION}"
if ! command -v node &>/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d 'v')" -lt "$NODE_VERSION" ]]; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - >/dev/null 2>&1
  apt-get install -y -qq nodejs
fi
log "Node $(node -v) / npm $(npm -v)"

# ── 4. App User ────────────────────────────────────────────────────────────
header "4/8 — Application User"
if ! id "$APP_USER" &>/dev/null; then
  useradd --system --shell /bin/bash --home "/home/${APP_USER}" --create-home "$APP_USER"
  log "User '${APP_USER}' created"
else
  log "User '${APP_USER}' exists"
fi

# ── 5. Build & Deploy ──────────────────────────────────────────────────────
header "5/8 — Build & Deploy"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ -f "${SCRIPT_DIR}/package.json" ]] && grep -q '"next"' "${SCRIPT_DIR}/package.json" 2>/dev/null; then
  PROJECT_SOURCE="${SCRIPT_DIR}"
elif [[ -f "${SCRIPT_DIR}/bond-design-company.zip" ]]; then
  TMP_DIR=$(mktemp -d)
  unzip -q "${SCRIPT_DIR}/bond-design-company.zip" -d "$TMP_DIR"
  PROJECT_SOURCE="$TMP_DIR"
else
  error "Cannot find project files. Place this script in the project root or next to bond-design-company.zip"
fi

# Copy source to app directory
mkdir -p "$APP_DIR"
cp -r "${PROJECT_SOURCE}/." "$APP_DIR/"
rm -f "${APP_DIR}/install.sh" "${APP_DIR}/bond-design-company.zip"
cd "$APP_DIR"

# ── Stop existing service if running ──
systemctl stop "${APP_NAME}" 2>/dev/null || true

# ── Clean previous build ──
rm -rf "${APP_DIR}/.next" "${APP_DIR}/node_modules"

# ── Install dependencies ──
log "Installing dependencies..."
npm install 2>&1 | tail -3
log "Dependencies installed"

# ── Production build (webpack, NOT turbopack) ──
log "Building production bundle..."
NODE_ENV=production npx next build
log "Build complete"

# ── Prepare standalone deployment ──
# The standalone output lives in .next/standalone/
# It needs the static assets and public folder copied in
if [[ -d "${APP_DIR}/.next/standalone" ]]; then
  log "Preparing standalone deployment..."
  cp -r "${APP_DIR}/public" "${APP_DIR}/.next/standalone/public"
  cp -r "${APP_DIR}/.next/static" "${APP_DIR}/.next/standalone/.next/static"
  log "Static assets copied into standalone"
else
  error "Standalone build output not found. Check next.config.ts has output: 'standalone'"
fi

chown -R "${APP_USER}:${APP_USER}" "$APP_DIR"
log "Deployed to ${APP_DIR}"

# ── 6. Systemd Service ─────────────────────────────────────────────────────
header "6/8 — Systemd Service"

cat > /etc/systemd/system/${APP_NAME}.service << EOF
[Unit]
Description=Bond Design Company — Next.js
After=network.target

[Service]
Type=simple
User=${APP_USER}
Group=${APP_USER}
WorkingDirectory=${APP_DIR}/.next/standalone
ExecStart=$(which node) ${APP_DIR}/.next/standalone/server.js
Restart=always
RestartSec=5

# Environment
Environment=NODE_ENV=production
Environment=PORT=${PORT}
Environment=HOSTNAME=0.0.0.0

# Security
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=${APP_DIR}
PrivateTmp=true

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=${APP_NAME}

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "${APP_NAME}"
systemctl start "${APP_NAME}"

sleep 4

if systemctl is-active --quiet "${APP_NAME}"; then
  log "Service running on port ${PORT}"
  # Quick health check
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:${PORT}/" 2>/dev/null || echo "000")
  if [[ "$HTTP_CODE" == "200" ]]; then
    log "Health check passed (HTTP ${HTTP_CODE})"
  else
    warn "Health check returned HTTP ${HTTP_CODE} — check logs: journalctl -u ${APP_NAME} -f"
  fi
else
  warn "Service failed to start. Debug with: journalctl -u ${APP_NAME} --no-pager -n 50"
fi

# ── 7. Nginx ───────────────────────────────────────────────────────────────
if [[ "$SKIP_NGINX" == false ]]; then
  header "7/8 — Nginx"
  apt-get install -y -qq nginx

  cat > /etc/nginx/sites-available/${APP_NAME} << 'NGINX_CONF'
upstream nextjs {
    server 127.0.0.1:__PORT__;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name __DOMAIN__;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types text/plain text/css text/javascript application/javascript
               application/json application/xml image/svg+xml font/woff2;

    # Next.js static assets — immutable cache
    location /_next/static {
        alias __APP_DIR__/.next/static;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Public directory
    location /public {
        alias __APP_DIR__/public;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # Favicon
    location = /favicon.ico {
        alias __APP_DIR__/public/favicon.ico;
        access_log off;
        log_not_found off;
    }

    # Proxy to Next.js
    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    location ~ /\. { deny all; access_log off; log_not_found off; }
}
NGINX_CONF

  sed -i "s|__PORT__|${PORT}|g"     /etc/nginx/sites-available/${APP_NAME}
  sed -i "s|__DOMAIN__|${DOMAIN}|g" /etc/nginx/sites-available/${APP_NAME}
  sed -i "s|__APP_DIR__|${APP_DIR}|g" /etc/nginx/sites-available/${APP_NAME}

  ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/
  rm -f /etc/nginx/sites-enabled/default

  nginx -t 2>/dev/null && systemctl reload nginx
  log "Nginx configured"
fi

# ── 8. Firewall & SSL ──────────────────────────────────────────────────────
header "8/8 — Firewall & SSL"
ufw --force enable >/dev/null 2>&1
ufw allow ssh >/dev/null 2>&1
ufw allow 'Nginx Full' >/dev/null 2>&1
log "Firewall enabled"

if [[ "$ENABLE_SSL" == true && "$SKIP_NGINX" == false ]]; then
  apt-get install -y -qq certbot python3-certbot-nginx
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect \
    --email "admin@${DOMAIN}" \
    || warn "SSL failed. Retry: sudo certbot --nginx -d ${DOMAIN}"
  systemctl enable certbot.timer
  log "SSL configured"
fi

# ── Summary ─────────────────────────────────────────────────────────────────
header "Installation Complete!"
echo ""
echo -e "  ${GREEN}${BOLD}Bond Design Company is live!${NC}"
echo ""
if [[ "$ENABLE_SSL" == true && "$DOMAIN" != "$SERVER_IP" ]]; then
  echo -e "  ${BOLD}URL:${NC}  https://${DOMAIN}"
else
  echo -e "  ${BOLD}URL:${NC}  http://${DOMAIN}"
fi
echo ""
echo -e "  ${CYAN}Commands:${NC}"
echo -e "    sudo systemctl status ${APP_NAME}"
echo -e "    sudo systemctl restart ${APP_NAME}"
echo -e "    sudo journalctl -u ${APP_NAME} -f"
echo ""
echo -e "  ${CYAN}To redeploy:${NC}"
echo -e "    cd ${APP_DIR}"
echo -e "    sudo systemctl stop ${APP_NAME}"
echo -e "    sudo -u ${APP_USER} npm install"
echo -e "    sudo -u ${APP_USER} npx next build"
echo -e "    sudo cp -r public .next/standalone/public"
echo -e "    sudo cp -r .next/static .next/standalone/.next/static"
echo -e "    sudo systemctl start ${APP_NAME}"
echo ""
