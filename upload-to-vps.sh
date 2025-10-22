gi#!/bin/bash

# Upload script to transfer files to VPS
# Run this from your local machine

VPS_IP="72.60.235.135"
VPS_USER="root"
LOCAL_DIR="."
REMOTE_DIR="/var/www/aadxcelit"

echo "🚀 Uploading files to VPS..."

# Create remote directory
ssh $VPS_USER@$VPS_IP "mkdir -p $REMOTE_DIR"

# Upload application files (excluding node_modules and .git)
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' --exclude 'ssl' $LOCAL_DIR/ $VPS_USER@$VPS_IP:$REMOTE_DIR/

# Upload SSL certificates separately
echo "🔒 Uploading SSL certificates..."
scp ssl/cert.pem $VPS_USER@$VPS_IP:$REMOTE_DIR/ssl/
scp ssl/private.key $VPS_USER@$VPS_IP:$REMOTE_DIR/ssl/
scp ssl/intermediate.pem $VPS_USER@$VPS_IP:$REMOTE_DIR/ssl/

echo "✅ Upload completed!"
echo "🔧 Now run the deployment script on the VPS:"
echo "ssh $VPS_USER@$VPS_IP 'cd $REMOTE_DIR && chmod +x deploy/deploy.sh && ./deploy/deploy.sh'"
