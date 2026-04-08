#!/bin/bash

echo "🔐 Setting up SSL for bond.gibbsdev.net"

# 1. Install certbot
echo "Installing certbot..."
apt-get update && apt-get install -y certbot python3-certbot-nginx

# 2. Make sure Nginx is running
echo "Starting Nginx..."
systemctl start nginx
systemctl enable nginx

# 3. Create certbot directory
mkdir -p /var/www/certbot

# 4. Get SSL certificate
echo "Getting SSL certificate from Let's Encrypt..."
certbot certonly --webroot -w /var/www/certbot -d bond.gibbsdev.net -n --agree-tos -m info@bonddesigncompany.com --force-renewal

# 5. Update Nginx config with SSL enabled
cat > /etc/nginx/sites-available/bond-design << 'NGINX'
# HTTP server - redirect to HTTPS and serve Let's Encrypt validation
server {
    listen 80;
    listen [::]:80;
    server_name bond.gibbsdev.net;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name bond.gibbsdev.net;

    ssl_certificate /etc/letsencrypt/live/bond.gibbsdev.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bond.gibbsdev.net/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# 6. Test and reload Nginx
echo "Testing Nginx config..."
nginx -t

if [ $? -eq 0 ]; then
    nginx -s reload
    echo "✅ SSL setup complete!"
    echo "✅ Your site is now available at: https://bond.gibbsdev.net"
    echo "✅ SSL will auto-renew via certbot"
else
    echo "❌ Nginx config error"
    exit 1
fi
