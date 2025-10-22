#!/bin/bash

# Aadxcelit Deployment Script for Ubuntu VPS
# Run this script on your Ubuntu VPS server

set -e

echo "🚀 Starting Aadxcelit deployment..."

# Update system packages
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
apt install -y nginx

# Install Git
echo "📦 Installing Git..."
apt install -y git

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/aadxcelit
cd /var/www/aadxcelit

# Clone or update repository (replace with your actual repo URL)
echo "📥 Setting up application files..."
# If you have a git repository, uncomment the next line:
# git clone https://github.com/yourusername/aadxcelit.git .

# Copy application files (you'll need to upload your files to the server)
echo "📋 Please upload your application files to /var/www/aadxcelit/"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/aadxcelit
chmod -R 755 /var/www/aadxcelit

# Copy SSL certificates
echo "🔒 Setting up SSL certificates..."
mkdir -p /var/www/aadxcelit/ssl
# Copy your SSL certificates to /var/www/aadxcelit/ssl/
# cert.pem, private.key, intermediate.pem

# Copy systemd service file
echo "⚙️ Setting up systemd service..."
cp deploy/aadxcelit.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable aadxcelit

# Copy Nginx configuration
echo "🌐 Setting up Nginx..."
cp deploy/nginx.conf /etc/nginx/sites-available/aadxcelit
ln -sf /etc/nginx/sites-available/aadxcelit /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
nginx -t

# Start services
echo "🚀 Starting services..."
systemctl start aadxcelit
systemctl restart nginx

# Enable firewall
echo "🔥 Configuring firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

echo "✅ Deployment completed successfully!"
echo "🌐 Your application should be available at: https://www.addxcell.work.gd"
echo "📊 Check service status with: systemctl status aadxcelit"
echo "📋 View logs with: journalctl -u aadxcelit -f"
