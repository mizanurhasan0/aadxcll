#!/bin/bash

# Quick Fix Script for 404 Error
# Run this on your VPS to fix common issues

echo "🔧 Quick Fix for 404 Error - Aadxcelit Application"
echo "=================================================="

# Navigate to application directory
cd /var/www/aadxcelit

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please make sure you're in the correct directory."
    echo "Expected location: /var/www/aadxcelit"
    exit 1
fi

echo "✅ Found package.json in /var/www/aadxcelit"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/aadxcelit
chmod -R 755 /var/www/aadxcelit

# Create SSL directory if it doesn't exist
echo "🔒 Ensuring SSL directory exists..."
mkdir -p /var/www/aadxcelit/ssl

# Check if SSL certificates exist, if not create placeholder files
if [ ! -f "/var/www/aadxcelit/ssl/cert.pem" ]; then
    echo "⚠️ SSL certificate not found. Creating placeholder..."
    echo "Please add your SSL certificate to /var/www/aadxcelit/ssl/cert.pem"
fi

if [ ! -f "/var/www/aadxcelit/ssl/private.key" ]; then
    echo "⚠️ SSL private key not found. Creating placeholder..."
    echo "Please add your SSL private key to /var/www/aadxcelit/ssl/private.key"
fi

if [ ! -f "/var/www/aadxcelit/ssl/intermediate.pem" ]; then
    echo "⚠️ SSL intermediate certificate not found. Creating placeholder..."
    echo "Please add your SSL intermediate certificate to /var/www/aadxcelit/ssl/intermediate.pem"
fi

# Reload systemd daemon
echo "⚙️ Reloading systemd daemon..."
systemctl daemon-reload

# Enable and start the service
echo "🚀 Starting aadxcelit service..."
systemctl enable aadxcelit
systemctl start aadxcelit

# Wait a moment for the service to start
sleep 3

# Check if service is running
if systemctl is-active --quiet aadxcelit; then
    echo "✅ aadxcelit service is now running"
else
    echo "❌ aadxcelit service failed to start"
    echo "Checking service status:"
    systemctl status aadxcelit
    echo "Checking logs:"
    journalctl -u aadxcelit --no-pager -n 20
fi

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
    
    # Restart Nginx
    echo "🔄 Restarting Nginx..."
    systemctl restart nginx
    
    if systemctl is-active --quiet nginx; then
        echo "✅ Nginx is now running"
    else
        echo "❌ Nginx failed to start"
        systemctl status nginx
    fi
else
    echo "❌ Nginx configuration has errors"
    nginx -t
fi

# Check if ports are listening
echo "🌐 Checking ports..."
echo "Port 3000 (Node.js):"
if netstat -tlnp | grep :3000; then
    echo "✅ Port 3000 is listening"
else
    echo "❌ Port 3000 is NOT listening"
fi

echo "Port 80 (HTTP):"
if netstat -tlnp | grep :80; then
    echo "✅ Port 80 is listening"
else
    echo "❌ Port 80 is NOT listening"
fi

echo "Port 443 (HTTPS):"
if netstat -tlnp | grep :443; then
    echo "✅ Port 443 is listening"
else
    echo "❌ Port 443 is NOT listening"
fi

# Test local connection
echo "🧪 Testing local connection..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|404"; then
    echo "✅ Application responds on localhost:3000"
else
    echo "❌ Application does not respond on localhost:3000"
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo "1. If SSL certificates are missing, add them to /var/www/aadxcelit/ssl/"
echo "2. Check the application logs: journalctl -u aadxcelit -f"
echo "3. Test your domain: curl -I https://www.addxcell.work.gd"
echo "4. If still getting 404, run the troubleshoot script: ./troubleshoot.sh"

echo ""
echo "📋 Service Status:"
echo "=================="
systemctl status aadxcelit --no-pager -l
