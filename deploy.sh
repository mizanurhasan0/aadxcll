#!/bin/bash

echo "🚀 Starting deployment for cPanel..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf node_modules

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Create production build
echo "🏗️ Creating production build..."
NODE_ENV=production npm run build

echo "✅ Build completed successfully!"
echo "📁 Ready for upload to cPanel"
echo ""
echo "📋 Next steps:"
echo "1. Upload all files to your cPanel public_html directory"
echo "2. In cPanel, go to 'Setup Node.js App'"
echo "3. Set Node.js version to 18 or higher"
echo "4. Set startup file to: server.js"
echo "5. Set app root to your domain directory"
echo "6. Start the application"
echo ""
echo "🌐 Your app should be accessible at your domain!"
