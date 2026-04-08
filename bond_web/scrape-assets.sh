#!/usr/bin/env bash
# ============================================================================
# Bond Design Company — Asset Scraper
# ============================================================================
# Downloads all images, fonts, and static assets from bonddesigncompany.com
# and updates the Next.js project to use local files instead of Unsplash.
#
# Usage:
#   chmod +x scrape-assets.sh
#   ./scrape-assets.sh [--project-dir /var/www/bond-design]
#
# Run this ON your server (or any machine with curl + wget).
# ============================================================================

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
log()   { echo -e "${GREEN}[✓]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
info()  { echo -e "${CYAN}[i]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# ── Config ──────────────────────────────────────────────────────────────────
SITE_URL="https://bonddesigncompany.com"
PROJECT_DIR=""
ASSET_DIR=""
TEMP_DIR=$(mktemp -d)

# Parse args
while [[ $# -gt 0 ]]; do
  case $1 in
    --project-dir) PROJECT_DIR="$2"; shift 2 ;;
    -h|--help) echo "Usage: ./scrape-assets.sh [--project-dir /path/to/bond-design]"; exit 0 ;;
    *) error "Unknown option: $1" ;;
  esac
done

# Auto-detect project dir
if [[ -z "$PROJECT_DIR" ]]; then
  if [[ -f "./package.json" ]] && grep -q "bond-design" ./package.json 2>/dev/null; then
    PROJECT_DIR="$(pwd)"
  elif [[ -f "/var/www/bond-design/package.json" ]]; then
    PROJECT_DIR="/var/www/bond-design"
  else
    error "Cannot find project. Use: ./scrape-assets.sh --project-dir /path/to/bond-design"
  fi
fi

ASSET_DIR="${PROJECT_DIR}/public/images"
mkdir -p "$ASSET_DIR"
mkdir -p "${TEMP_DIR}/pages"

echo -e "\n${CYAN}${BOLD}═══ Bond Design Company — Asset Scraper ═══${NC}\n"
echo -e "  Site:       ${BOLD}${SITE_URL}${NC}"
echo -e "  Project:    ${BOLD}${PROJECT_DIR}${NC}"
echo -e "  Assets to:  ${BOLD}${ASSET_DIR}${NC}"
echo ""

# ── Check dependencies ──────────────────────────────────────────────────────
for cmd in curl wget grep sed; do
  command -v "$cmd" &>/dev/null || error "Missing required tool: $cmd"
done
log "Dependencies OK"

# ── 1. Scrape all pages for image URLs ──────────────────────────────────────
echo ""
info "Scraping pages for asset URLs..."

PAGES=(
  "/"
  "/about/"
  "/services/"
  "/portfolio/"
  "/contact/"
  "/blog/"
)

ALL_URLS_FILE="${TEMP_DIR}/all_urls.txt"
> "$ALL_URLS_FILE"

for page in "${PAGES[@]}"; do
  PAGE_FILE="${TEMP_DIR}/pages/$(echo "$page" | tr '/' '_').html"
  info "  Fetching ${SITE_URL}${page}"
  curl -sL "${SITE_URL}${page}" -o "$PAGE_FILE" 2>/dev/null || {
    warn "  Could not fetch ${page}, skipping"
    continue
  }

  # Extract image URLs from HTML (src, srcset, data-src, background-image, og:image)
  grep -oP '(?:src|srcset|data-src|data-lazy-src|content)=["\x27]\K[^"\x27]+(?:\.jpg|\.jpeg|\.png|\.gif|\.webp|\.svg|\.avif)[^"\x27]*' "$PAGE_FILE" 2>/dev/null >> "$ALL_URLS_FILE" || true
  grep -oP "url\(\K[^)]+(?:\.jpg|\.jpeg|\.png|\.gif|\.webp|\.svg)" "$PAGE_FILE" 2>/dev/null >> "$ALL_URLS_FILE" || true

  # Also grab portfolio project image URLs (they may be in data attributes or JSON)
  grep -oP 'https?://bonddesigncompany\.com/wp-content/uploads/[^"\x27\s<>]+' "$PAGE_FILE" 2>/dev/null >> "$ALL_URLS_FILE" || true
done

# Also scrape individual portfolio project pages
info "  Checking for portfolio project links..."
PORTFOLIO_HTML="${TEMP_DIR}/pages/_portfolio_.html"
if [[ -f "$PORTFOLIO_HTML" ]]; then
  PORTFOLIO_LINKS=$(grep -oP 'href=["'"'"']\Khttps?://bonddesigncompany\.com/portfolio/[^"'"'"'\s]+' "$PORTFOLIO_HTML" 2>/dev/null || true)
  for link in $PORTFOLIO_LINKS; do
    slug=$(echo "$link" | sed 's|.*/portfolio/||; s|/$||')
    if [[ -n "$slug" ]]; then
      info "    Fetching portfolio: ${slug}"
      curl -sL "$link" -o "${TEMP_DIR}/pages/portfolio_${slug}.html" 2>/dev/null || continue
      grep -oP 'https?://bonddesigncompany\.com/wp-content/uploads/[^"\x27\s<>]+' "${TEMP_DIR}/pages/portfolio_${slug}.html" 2>/dev/null >> "$ALL_URLS_FILE" || true
    fi
  done
fi

# Clean and deduplicate URLs
sed -i 's/&amp;/\&/g' "$ALL_URLS_FILE"
# Make relative URLs absolute
sed -i "s|^/wp-content|${SITE_URL}/wp-content|g" "$ALL_URLS_FILE"
# Remove query strings for dedup but keep originals
sort -u "$ALL_URLS_FILE" > "${TEMP_DIR}/unique_urls.txt"

TOTAL_URLS=$(wc -l < "${TEMP_DIR}/unique_urls.txt")
log "Found ${TOTAL_URLS} unique asset URLs"

# ── 2. Download all assets ──────────────────────────────────────────────────
echo ""
info "Downloading assets..."

DOWNLOADED=0
FAILED=0
MANIFEST_FILE="${ASSET_DIR}/asset-manifest.json"
echo "{" > "$MANIFEST_FILE"
FIRST=true

while IFS= read -r url; do
  # Skip non-bond URLs and empty lines
  [[ -z "$url" ]] && continue
  [[ "$url" != *"bonddesigncompany.com"* && "$url" != *"cloudfront.net"* ]] && continue

  # Generate a clean filename
  FILENAME=$(echo "$url" | sed 's|.*/uploads/||; s|.*/||' | sed 's/[?#].*//' | tr '/' '-')

  # Skip if already downloaded
  if [[ -f "${ASSET_DIR}/${FILENAME}" ]]; then
    info "  Skip (exists): ${FILENAME}"
    continue
  fi

  # Download
  if wget -q --timeout=15 --tries=2 -O "${ASSET_DIR}/${FILENAME}" "$url" 2>/dev/null; then
    # Verify it's actually an image/file and not an error page
    FILE_SIZE=$(stat -f%z "${ASSET_DIR}/${FILENAME}" 2>/dev/null || stat -c%s "${ASSET_DIR}/${FILENAME}" 2>/dev/null || echo "0")
    if [[ "$FILE_SIZE" -lt 500 ]]; then
      rm -f "${ASSET_DIR}/${FILENAME}"
      warn "  Too small (${FILE_SIZE}b), removed: ${FILENAME}"
      FAILED=$((FAILED + 1))
      continue
    fi

    DOWNLOADED=$((DOWNLOADED + 1))
    log "  Downloaded: ${FILENAME} ($(numfmt --to=iec "$FILE_SIZE" 2>/dev/null || echo "${FILE_SIZE}b"))"

    # Add to manifest
    if [[ "$FIRST" == true ]]; then
      FIRST=false
    else
      echo "," >> "$MANIFEST_FILE"
    fi
    echo "  \"${url}\": \"/images/${FILENAME}\"" >> "$MANIFEST_FILE"
  else
    FAILED=$((FAILED + 1))
    warn "  Failed: ${FILENAME}"
    rm -f "${ASSET_DIR}/${FILENAME}"
  fi
done < "${TEMP_DIR}/unique_urls.txt"

echo "" >> "$MANIFEST_FILE"
echo "}" >> "$MANIFEST_FILE"

echo ""
log "Downloaded: ${DOWNLOADED} assets"
[[ $FAILED -gt 0 ]] && warn "Failed: ${FAILED} assets"

# ── 3. Also grab the logo ──────────────────────────────────────────────────
echo ""
info "Downloading logo..."
LOGO_URL="https://d2xsxph8kpxj0f.cloudfront.net/310519663252921251/gYJoBBAhrCPyZ2ZYwvAzvU/NS_ICON_WHITE_3877ffdb.png"
if wget -q --timeout=15 --tries=3 -O "${ASSET_DIR}/bond-logo-white.png" "$LOGO_URL" 2>/dev/null; then
  log "Logo downloaded: bond-logo-white.png"
else
  warn "Could not download logo from CloudFront. Try manually:"
  echo "  wget -O ${ASSET_DIR}/bond-logo-white.png '${LOGO_URL}'"
fi

# ── 4. Download favicon ────────────────────────────────────────────────────
info "Downloading favicon..."
if wget -q --timeout=10 -O "${PROJECT_DIR}/public/favicon.ico" "${SITE_URL}/favicon.ico" 2>/dev/null; then
  log "Favicon downloaded"
else
  warn "Could not download favicon"
fi

# ── 5. Generate image mapping for Next.js ──────────────────────────────────
echo ""
info "Generating image mapping..."

MAPPING_FILE="${PROJECT_DIR}/src/lib/images.ts"
mkdir -p "$(dirname "$MAPPING_FILE")"

cat > "$MAPPING_FILE" << 'TSHEADER'
// ============================================================================
// Auto-generated by scrape-assets.sh
// Maps original remote URLs to local /images/ paths
// ============================================================================

const imageMap: Record<string, string> = {
TSHEADER

# Build the TS mapping from manifest
if [[ -f "$MANIFEST_FILE" ]]; then
  grep '"' "$MANIFEST_FILE" | grep -v '{' | grep -v '}' | while IFS= read -r line; do
    echo "  ${line}" >> "$MAPPING_FILE"
  done
fi

cat >> "$MAPPING_FILE" << 'TSFOOTER'
};

export function getLocalImage(remoteUrl: string): string {
  return imageMap[remoteUrl] || remoteUrl;
}

export default imageMap;
TSFOOTER

log "Image mapping written to src/lib/images.ts"

# ── 6. List all downloaded assets ──────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}═══ Downloaded Assets ═══${NC}"
echo ""
TOTAL_SIZE=0
for f in "${ASSET_DIR}"/*; do
  [[ -f "$f" ]] || continue
  FNAME=$(basename "$f")
  FSIZE=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f" 2>/dev/null || echo "0")
  TOTAL_SIZE=$((TOTAL_SIZE + FSIZE))
  FSIZE_H=$(numfmt --to=iec "$FSIZE" 2>/dev/null || echo "${FSIZE}b")
  echo -e "  ${FNAME}  ${CYAN}${FSIZE_H}${NC}"
done
TOTAL_H=$(numfmt --to=iec "$TOTAL_SIZE" 2>/dev/null || echo "${TOTAL_SIZE}b")
echo ""
echo -e "  ${BOLD}Total: ${TOTAL_H}${NC}"

# ── Cleanup ────────────────────────────────────────────────────────────────
rm -rf "$TEMP_DIR"

# ── Summary ────────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}${BOLD}═══ Done! ═══${NC}"
echo ""
echo -e "  Assets saved to:  ${BOLD}${ASSET_DIR}/${NC}"
echo -e "  Manifest:         ${BOLD}${ASSET_DIR}/asset-manifest.json${NC}"
echo -e "  TS mapping:       ${BOLD}${MAPPING_FILE}${NC}"
echo ""
echo -e "  ${CYAN}Next steps:${NC}"
echo -e "  1. Review downloaded images in ${ASSET_DIR}/"
echo -e "  2. Update your page components to use /images/filename instead of Unsplash URLs"
echo -e "  3. Or import { getLocalImage } from '@/lib/images' for dynamic mapping"
echo -e "  4. Rebuild: npm run build"
echo -e "  5. Restart: sudo systemctl restart bond-design"
echo ""
