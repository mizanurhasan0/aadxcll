#!/bin/bash

# Troubleshooting Script for 404 Error
# Run this on your VPS to diagnose issues

echo "🔍 Troubleshooting 404 Error - Aadxcelit Application"
echo "=================================================="

# Check if application directory exists
echo "📁 Checking application directory..."
if [ -d "/var/www/aadxcelit" ]; then
    echo "✅ Application directory exists: /var/www/aadxcelit"
    ls -la /var/www/aadxcelit/
else
    echo "❌ Application directory NOT found: /var/www/aadxcelit"
    echo "Please upload your application files first!"
    exit 1
fi

# Check if SSL certificates exist
echo ""
echo "🔒 Checking SSL certificates..."
if [ -f "/var/www/aadxcelit/ssl/cert.pem" ]; then
    echo "✅ SSL certificate exists"
else
    echo "❌ SSL certificate NOT found"
fi

if [ -f "/var/www/aadxcelit/ssl/private.key" ]; then
    echo "✅ SSL private key exists"
else
    echo "❌ SSL private key NOT found"
fi

if [ -f "/var/www/aadxcelit/ssl/intermediate.pem" ]; then
    echo "✅ SSL intermediate certificate exists"
else
    echo "❌ SSL intermediate certificate NOT found"
fi

# Check if package.json exists
echo ""
echo "📦 Checking package.json..."
if [ -f "/var/www/aadxcelit/package.json" ]; then
    echo "✅ package.json exists"
    echo "Dependencies:"
    cat /var/www/aadxcelit/package.json | grep -A 20 '"dependencies"'
else
    echo "❌ package.json NOT found"
fi

# Check if server.js exists
echo ""
echo "🖥️ Checking server.js..."
if [ -f "/var/www/aadxcelit/server.js" ]; then
    echo "✅ server.js exists"
else
    echo "❌ server.js NOT found"
fi

# Check if .next directory exists (built application)
echo ""
echo "🔨 Checking built application..."
if [ -d "/var/www/aadxcelit/.next" ]; then
    echo "✅ .next directory exists (application is built)"
else
    echo "❌ .next directory NOT found - application needs to be built"
    echo "Run: cd /var/www/aadxcelit && npm run build"
fi

# Check Node.js installation
echo ""
echo "📦 Checking Node.js installation..."
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
else
    echo "❌ Node.js is NOT installed"
fi

if command -v npm &> /dev/null; then
    echo "✅ npm is installed: $(npm --version)"
else
    echo "❌ npm is NOT installed"
fi

# Check if application is running
echo ""
echo "🚀 Checking if application is running..."
if pgrep -f "node server.js" > /dev/null; then
    echo "✅ Node.js application is running"
    echo "Process details:"
    ps aux | grep "node server.js" | grep -v grep
else
    echo "❌ Node.js application is NOT running"
fi

# Check systemd service status
echo ""
echo "⚙️ Checking systemd service status..."
if systemctl is-active --quiet aadxcelit; then
    echo "✅ aadxcelit service is active"
else
    echo "❌ aadxcelit service is NOT active"
fi

if systemctl is-enabled --quiet aadxcelit; then
    echo "✅ aadxcelit service is enabled"
else
    echo "❌ aadxcelit service is NOT enabled"
fi

# Check ports
echo ""
echo "🌐 Checking ports..."
echo "Port 3000 (Node.js app):"
netstat -tlnp | grep :3000 || echo "❌ Port 3000 not listening"

echo "Port 80 (HTTP):"
netstat -tlnp | grep :80 || echo "❌ Port 80 not listening"

echo "Port 443 (HTTPS):"
netstat -tlnp | grep :443 || echo "❌ Port 443 not listening"

# Check Nginx status
echo ""
echo "🌐 Checking Nginx status..."
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx is NOT running"
fi

# Test Nginx configuration
echo ""
echo "🧪 Testing Nginx configuration..."
if nginx -t 2>/dev/null; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration has errors"
    nginx -t
fi

# Check Nginx sites
echo ""
echo "📋 Checking Nginx sites..."
if [ -f "/etc/nginx/sites-enabled/aadxcelit" ]; then
    echo "✅ aadxcelit site is enabled"
else
    echo "❌ aadxcelit site is NOT enabled"
fi

# Check application logs
echo ""
echo "📋 Recent application logs:"
if [ -f "/var/log/syslog" ]; then
    echo "System logs (last 10 lines related to aadxcelit):"
    grep -i aadxcelit /var/log/syslog | tail -10 || echo "No aadxcelit logs found"
fi

# Check service logs
echo ""
echo "📋 Service logs:"
if systemctl is-active --quiet aadxcelit; then
    echo "Last 10 lines of aadxcelit service logs:"
    journalctl -u aadxcelit --no-pager -n 10
else
    echo "Service is not running, cannot show logs"
fi

echo ""
echo "🔧 Quick Fix Commands:"
echo "====================="
echo "1. Build the application:"
echo "   cd /var/www/aadxcelit && npm run build"
echo ""
echo "2. Start the service:"
echo "   systemctl start aadxcelit"
echo ""
echo "3. Restart Nginx:"
echo "   systemctl restart nginx"
echo ""
echo "4. Check service status:"
echo "   systemctl status aadxcelit"
echo ""
echo "5. View real-time logs:"
echo "   journalctl -u aadxcelit -f"
