#!/bin/bash

# Test Script for Aadxcelit Application
# Run this to test if your application is working

echo "🧪 Testing Aadxcelit Application"
echo "==============================="

# Test localhost connection
echo "1. Testing localhost:3000..."
LOCAL_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$LOCAL_RESPONSE" = "200" ]; then
    echo "✅ Localhost:3000 responds with 200 OK"
elif [ "$LOCAL_RESPONSE" = "404" ]; then
    echo "⚠️ Localhost:3000 responds with 404 - application running but route not found"
else
    echo "❌ Localhost:3000 responds with $LOCAL_RESPONSE"
fi

# Test HTTP connection
echo ""
echo "2. Testing HTTP (port 80)..."
HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://www.addxcell.work.gd)
if [ "$HTTP_RESPONSE" = "301" ] || [ "$HTTP_RESPONSE" = "302" ]; then
    echo "✅ HTTP redirects to HTTPS (expected)"
elif [ "$HTTP_RESPONSE" = "200" ]; then
    echo "⚠️ HTTP serves content directly (should redirect to HTTPS)"
else
    echo "❌ HTTP responds with $HTTP_RESPONSE"
fi

# Test HTTPS connection
echo ""
echo "3. Testing HTTPS (port 443)..."
HTTPS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://www.addxcell.work.gd)
if [ "$HTTPS_RESPONSE" = "200" ]; then
    echo "✅ HTTPS responds with 200 OK"
elif [ "$HTTPS_RESPONSE" = "404" ]; then
    echo "❌ HTTPS responds with 404 - check application routing"
elif [ "$HTTPS_RESPONSE" = "000" ]; then
    echo "❌ HTTPS connection failed - check SSL certificates"
else
    echo "⚠️ HTTPS responds with $HTTPS_RESPONSE"
fi

# Test domain without www
echo ""
echo "4. Testing domain without www..."
DOMAIN_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://addxcell.work.gd)
if [ "$DOMAIN_RESPONSE" = "301" ] || [ "$DOMAIN_RESPONSE" = "302" ]; then
    echo "✅ Domain redirects to www (expected)"
elif [ "$DOMAIN_RESPONSE" = "200" ]; then
    echo "⚠️ Domain serves content directly"
else
    echo "❌ Domain responds with $DOMAIN_RESPONSE"
fi

# Check SSL certificate
echo ""
echo "5. Checking SSL certificate..."
SSL_INFO=$(echo | openssl s_client -servername www.addxcell.work.gd -connect www.addxcell.work.gd:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ SSL certificate is valid"
    echo "Certificate details:"
    echo "$SSL_INFO"
else
    echo "❌ SSL certificate check failed"
fi

# Test application content
echo ""
echo "6. Testing application content..."
CONTENT=$(curl -s https://www.addxcell.work.gd | head -20)
if [ -n "$CONTENT" ]; then
    echo "✅ Application returns content"
    echo "First few lines:"
    echo "$CONTENT"
else
    echo "❌ Application returns no content"
fi

echo ""
echo "📊 Summary:"
echo "==========="
echo "Localhost: $LOCAL_RESPONSE"
echo "HTTP: $HTTP_RESPONSE"
echo "HTTPS: $HTTPS_RESPONSE"
echo "Domain: $DOMAIN_RESPONSE"

if [ "$HTTPS_RESPONSE" = "200" ]; then
    echo ""
    echo "🎉 SUCCESS! Your application is working correctly!"
    echo "Visit: https://www.addxcell.work.gd"
elif [ "$HTTPS_RESPONSE" = "404" ]; then
    echo ""
    echo "⚠️ Application is running but returning 404"
    echo "This usually means:"
    echo "1. The application is not built properly"
    echo "2. The routing is not configured correctly"
    echo "3. The application is not serving the correct files"
    echo ""
    echo "Try running: ./quick-fix.sh"
else
    echo ""
    echo "❌ Application is not working properly"
    echo "Try running: ./troubleshoot.sh"
fi
