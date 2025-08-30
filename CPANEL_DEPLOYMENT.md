# cPanel Deployment Guide

## 🚀 Quick Start

1. **Build your application:**
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   ./deploy.sh
   ```

2. **Upload to cPanel:**
   - Upload all files to your `public_html` directory
   - Exclude: `node_modules`, `.git`, `.next`

## 📋 Detailed Steps

### 1. Prepare Your Application

Your `server.js` has been updated with:
- ✅ Proper host binding (`0.0.0.0`)
- ✅ Error handling
- ✅ Graceful shutdown
- ✅ cPanel-compatible port configuration

### 2. Build for Production

```bash
npm run build
```

### 3. cPanel Setup

#### A. Upload Files
- Use File Manager or FTP
- Upload to `public_html` directory
- Ensure `server.js` is in the root

#### B. Setup Node.js App
1. Go to cPanel → "Setup Node.js App"
2. Create new application:
   - **Node.js version**: 18 or higher
   - **Application mode**: Production
   - **Application root**: Your domain directory
   - **Application URL**: Your domain
   - **Application startup file**: `server.js`
   - **Passenger port**: Leave default

#### C. Environment Variables
Set these in cPanel:
```
NODE_ENV=production
PORT=3000 (or your assigned port)
HOSTNAME=0.0.0.0
```

### 4. Start Application

1. Click "Start App" in cPanel
2. Wait for status to show "Running"
3. Test your domain

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
- Check if another app uses the same port
- Change port in cPanel environment variables

#### App Won't Start
- Check cPanel error logs
- Verify `server.js` is in root directory
- Ensure Node.js version is 18+

#### Routing Issues
- Verify `.htaccess` file is uploaded
- Check if mod_rewrite is enabled

### Logs
- **cPanel logs**: Error Logs in cPanel
- **Application logs**: Check cPanel Node.js app status

## 📁 File Structure for cPanel

```
public_html/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .htaccess         # Apache configuration
├── .next/            # Built Next.js files
├── public/           # Static assets
└── src/              # Source code
```

## 🌐 Domain Configuration

### Subdomain Setup
- Create subdomain in cPanel
- Point to same directory
- Update environment variables

### SSL Certificate
- Install SSL in cPanel
- Update `.htaccess` for HTTPS redirects

## 📊 Performance Tips

1. **Enable Gzip compression** (already in `.htaccess`)
2. **Set proper cache headers** (already configured)
3. **Use CDN for static assets**
4. **Monitor memory usage** in cPanel

## 🔒 Security

- ✅ Security headers configured in `.htaccess`
- ✅ XSS protection enabled
- ✅ Content type sniffing disabled
- ✅ Frame options set to DENY

## 📞 Support

If you encounter issues:
1. Check cPanel error logs
2. Verify Node.js version compatibility
3. Ensure all files are uploaded correctly
4. Check environment variable configuration

---

**Happy Deploying! 🎉**
