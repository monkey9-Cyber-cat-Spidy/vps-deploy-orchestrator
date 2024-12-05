#!/usr/bin/env bash
set -e

echo "Updating system packages..."
apt-get update && apt-get upgrade -y
apt-get install -y git curl build-essential ufw nginx certbot python3-certbot-nginx

ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

echo "VPS Provisioning Complete!"
