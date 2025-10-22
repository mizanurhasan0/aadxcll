# Aadxcelit Ubuntu VPS Deployment Guide

## Server Details
- **IP Address**: 72.60.235.135
- **Username**: root
- **Password**: @Y8#DHWVpiRu7Uu
- **Domain**: www.addxcell.work.gd

## Step-by-Step Deployment Instructions

### 1. Connect to VPS
```bash
ssh root@72.60.235.135
# Enter password: @Y8#DHWVpiRu7Uu
```

### 2. Update System and Install Dependencies
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Git
apt install -y git
```

### 3. Create Application Directory
```bash
mkdir -p /var/www/aadxcelit
cd /var/www/aadxcelit
```

### 4. Upload Your Application Files
You need to upload your application files to the VPS. You can use one of these methods:

#### Method A: Using SCP (from your local machine)
```bash
# From your local machine, run:
scp -r . root@72.60.235.135:/var/www/aadxcelit/
# This will upload all files except those in .gitignore
```

#### Method B: Using Git (if you have a repository)
```bash
# On the VPS:
git clone https://github.com/yourusername/aadxcelit.git .
```

### 5. Set Up SSL Certificates
```bash
# Create SSL directory
mkdir -p /var/www/aadxcelit/ssl

# Create SSL certificate files (copy the content from your provided certificates)
nano /var/www/aadxcelit/ssl/cert.pem
# Paste the SSL certificate content

nano /var/www/aadxcelit/ssl/private.key
# Paste the private key content

nano /var/www/aadxcelit/ssl/intermediate.pem
# Paste the intermediate certificate content
```

### 6. Install Dependencies and Build
```bash
cd /var/www/aadxcelit
npm install
npm run build
```

### 7. Set Up Systemd Service
```bash
# Create the service file
nano /etc/systemd/system/aadxcelit.service
```

Paste this content:
```ini
[Unit]
Description=Aadxcelit Next.js Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/aadxcelit
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HTTPS_PORT=3443
Environment=HOSTNAME=0.0.0.0

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/www/aadxcelit

[Install]
WantedBy=multi-user.target
```

### 8. Set Up Nginx Configuration
```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/aadxcelit
```

Paste this content:
```nginx
server {
    listen 80;
    server_name addxcell.work.gd www.addxcell.work.gd;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://www.addxcell.work.gd$request_uri;
}

server {
    listen 443 ssl http2;
    server_name addxcell.work.gd www.addxcell.work.gd;

    # SSL Configuration
    ssl_certificate /var/www/aadxcelit/ssl/cert.pem;
    ssl_certificate_key /var/www/aadxcelit/ssl/private.key;
    ssl_trusted_certificate /var/www/aadxcelit/ssl/intermediate.pem;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Proxy to Next.js application
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
        proxy_read_timeout 86400;
    }

    # Static files caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### 9. Enable Nginx Configuration
```bash
# Enable the site
ln -sf /etc/nginx/sites-available/aadxcelit /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# If test passes, restart Nginx
systemctl restart nginx
```

### 10. Set Permissions and Start Services
```bash
# Set proper permissions
chown -R www-data:www-data /var/www/aadxcelit
chmod -R 755 /var/www/aadxcelit

# Enable and start the service
systemctl daemon-reload
systemctl enable aadxcelit
systemctl start aadxcelit
```

### 11. Configure Firewall
```bash
# Configure UFW firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable
```

### 12. Verify Deployment
```bash
# Check service status
systemctl status aadxcelit

# Check Nginx status
systemctl status nginx

# View application logs
journalctl -u aadxcelit -f
```

## SSL Certificate Content

### cert.pem
```
-----BEGIN CERTIFICATE-----
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
-----END CERTIFICATE-----
```

### private.key
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA9nUXRig/2kx9xKIr6FW88MsJr8SiRVXFxEIGdgDHFQN3RDNF
/zYxoJov1807iCJtxcpFunQBhAMWye0A/byOGxwzCy3uoXxKK8xl5PfNqF080nT7
SsGXwOLJacptVHX2rZK8Gs5ORCdA6wiQrQHIPvAp5P+qKFMBCYZbyNC8yeJDoboY
lYmYYKL22hjd2iaN0f6EXw009OnK1umEVLv8epxtZu92Ow5v5csWiO6SYVVkxoay
ey5j5EEKoQkE1i92WeJ1/mcZRec/eANs//GBrKjTxvwT8xzKWEkGiybLCY0nU8yI
fp8h4fm+1RAAOawV6wi+wATW/u8frRUJv68dswIDAQABAoIBAEYZ3gndjvP3x9oz
SovmPzy6c8HkC0fvcrY1FYNhCz9l4fmrH+DMuGb3FF6siJ9bM6ALvbOgJYI4IrZC
zIJfrIf3iGlIolSadrpohB8RgRS/mHpAPe3wjMqXdzS5GEnq18RdNVXmkop+I8/2
erhLBnsocrIpKmwX1/aumdLP1LMTMsTc+sEQuLc5p/64BQGAVaOcHoLlscfcjlIm
NXWxfBNK4nYjqYLeq6TrCf6+/CvpKFQhMxueAYIc0HJ8znkWgRQAycsmFNS6k+II
oNt0gtrJmAPgpbo+TDwR1gsw0+HYLC+3ahoQyjTAykMfPhWixJw8XaO63Cra02jb
V2qiQGECgYEA/eMnvGrNCH9Gfo54EPTZvW2U3tnNVsko645LQroInuxG80DGINGG
hmqsp2Ywfnk6/WDnO7J5biAXPka4gWsJTKtq8F3AbeC5zIRHEQtHtzLeGnAG4s5E
QNF/OS0ky+FCzJwUW8gzsdFMZ7Gi021aS9Hv2pgsvMASHtjAChdUvSMCgYEA+IIb
p+CVrDZrWofOghV/sYjZoApuUV7uq3jzoIP8m4zyiHVtd/wr0vbU5OoQ49CEziF/
xz/JHlwhTbAIkNndvtujGaF6DPxYvcaWfBAOTLsSvlF/IiKUW/Ru1QerTFegv9Kg
0SkiYyYEvPGN7P7YiTHtWFZBYeU6HElQiBjVDjECgYEAu6OK1qJIbqNCQn6hFkcg
NfQrNpjaPe3mJFHCJcrAXFRcC6QvykmQlv94IzBPXunSQzm/LEu3m0B0bT5vVpb5
BIUcQBHKCmswZorMyzf/BNK/e+KX9EBmCVHMKUHIFDaj2/zuvvaz3hPF2E1c/c2w
EqFSF8ioJ8f8nHetVsfvhOkCgYEA3sbMghesNaDnZlX+w9EAEyhqZ7VSJjIjZabd
SJVp3Axj0/7pLrnqk4nhWoGWuJPSqnOPeBBvfH79AAcB9tDIn/OH6E9A+ekyqJYh
i4BdQV4nNGQcw34aX8DlpqXkY2De43ev4TGt+RI5ByTIpZkgEE404snu9nh2T/E
KO2R+dECgYEAlyiDmf+J874EfaPWzX+9lS1kgC4lXulrqKjCVCHf7Q0B4JC14omV
etcwyW6sm+/TK+oEvYfzkFzIKoDK8jTAzaDh9LmOBNbNPMOYS0vLd/J4b5KL20q0
htDCx2esZ+6ekcLXFhpUCYl3rqd8gmk+mcwI7n3JOp7UzeluvIus/XY=
-----END RSA PRIVATE KEY-----
```

### intermediate.pem
```
-----BEGIN CERTIFICATE-----
MIIG1TCCBL2gAwIBAgIQbFWr29AHksedBwzYEZ7WvzANBgkqhkiG9w0BAQwFADCB
iDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCk5ldyBKZXJzZXkxFDASBgNVBAcTC0pl
cnNleSBDaXR5MR4wHAYDVQQKExVUaGUgVVNFUlRSVVNUIE5ldHdvcmsxLjAsBgNV
BAMTJVVTRVJUcnVzdCBSU0EgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMjAw
MTMwMDAwMDAwWhcNMzAwMTI5MjM1OTU5WjBLMQswCQYDVQQGEwJBVDEQMA4GA1UE
ChMHWmVyb1NTTDEqMCgGA1UEAxMhWmVyb1NTTCBSU0EgRG9tYWluIFNlY3VyZSBT
aXRlIENBMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAhmlzfqO1Mdgj
4W3dpBPTVBX1AuvcAyG1fl0dUnw/MeueCWzRWTheZ35LVo91kLI3DDVaZKW+TBAs
JBjEbYmMwcWSTWYCg5334SF0+ctDAsFxsX+rTDh9kSrG/4mp6OShubLaEIUJiZo4
t873TuSd0Wj5DWt3DtpAG8T35l/v+xrN8ub8PSSoX5Vkgw+jWf4KQtNvUFLDq8mF
WhUnPL6jHAADXpvs4lTNYwOtx9yQtbpxwSt7QJY1+ICrmRJB6BuKRt/jfDJF9Jsc
RQVlHIxQdKAJl7oaVnXgDkqtk2qddd3kCDXd74gv813G91z7CjsGyJ93oJIlNS3U
gFbD6V54JMgZ3rSmotYbz98oZxX7MKbtCm1aJ/q+hTv2YK1yMxrnfcieKmOYBbFD
hnW5O6RMA703dBK92j6XRN2EttLkQuujZgy+jXRKtaWMIlkNkWJmOiHmErQngHvt
iNkIcjJumq1ddFX4iaTI40a6zgvIBtxFeDs2RfcaH73er7ctNUUqgQT5rFgJhMmF
x76rQgB5OZUkodb5k2ex7P+Gu4J86bS15094UuYcV09hVeknmTh5Ex9CBKipLS2W
2wKBakf+aVYnNCU6S0nASqt2xrZpGC1v7v6DhuepyyJtn3qSV2PoBiU5Sql+aARp
wUibQMGm44gjyNDqDlVp+ShLQlUH9x8CAwEAAaOCAXUwggFxMB8GA1UdIwQYMBaA
FFN5v1qqK0rPVIDh2JvAnfKyA2bLMB0GA1UdDgQWBBTI2XhootkZaNU9ct5fCj7c
tYaGpjAOBgNVHQ8BAf8EBAMCAYYwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHSUE
FjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwIgYDVR0gBBswGTANBgsrBgEEAbIxAQIC
TjAIBgZngQwBAgEwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDovL2NybC51c2VydHJ1
c3QuY29tL1VTRVJUcnVzdFJTQUNlcnRpZmljYXRpb25BdXRob3JpdHkuY3JsMHYG
CCsGAQUFBwEBBGowaDA/BggrBgEFBQcwAoYzaHR0cDovL2NydC51c2VydHJ1c3Qu
Y29tL1VTRVJUcnVzdFJTQUFkZFRydXN0Q0EuY3J0MCUGCCsGAQUFBzABhhlodHRw
Oi8vb2NzcC51c2VydHJ1c3QuY29tMA0GCSqGSIb3DQEBDAUAA4ICAQAVDwoIzQDV
ercT0eYqZjBNJ8VNWwVFlQOtZERqn5iWnEVaLZZdzxlbvz2Fx0ExUNuUEgYkIVM4
YocKkCQ7hO5noicoq/DrEYH5IuNcuW1I8JJZ9DLuB1fYvIHlZ2JG46iNbVKA3ygA
Ez86RvDQlt2C494qqPVItRjrz9YlJEGT0DrttyApq0YLFDzf+Z1pkMhh7c+7fXeJ
qmIhfJpduKc8HEQkYQQShen426S3H0JrIAbKcBCiyYFuOhfyvuwVCFDfFvrjADjd
4jX1uQXd161IyFRbm89s2Oj5oU1wDYz5sx+hoCuh6lSs+/uPuWomIq3y1GDFNafW
+LsHBU16lQo5Q2yh25laQsKRgyPmMpHJ98edm6y2sHUabASmRHxvGiuwwE25aDU0
2SAeepyImJ2CzB80YG7WxlynHqNhpE7xfC7PzQlLgmfEHdU+tHFeQazRQnrFkW2W
kqRGIq7cKRnyypvjPMkjeiV9lRdAM9fSJvsB3svUuu1coIG1xxI1yegoGM4r5QP4
RGIVvYaiI76C0djoSbQ/dkIUUXQuB8AL5jyH34g3BZaaXyvpmnV4ilppMXVAnAYG
ON51WhJ6W0xNdNJwzYASZYH+tmCWI+N60Gv2NNMGHwMZ7e9bXgzUCZH5FaBFDGR5
S9VWqHB73Q+OyIVvIbKYcSc2w/aSuFKGSA==
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFgTCCBGmgAwIBAgIQOXJEOvkit1HX02wQ3TE1lTANBgkqhkiG9w0BAQwFADB7
MQswCQYDVQQGEwJHQjEbMBkGA1UECAwSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYD
VQQHDAdTYWxmb3JkMRowGAYDVQQKDBFDb21vZG8gQ0EgTGltaXRlZDEhMB8GA1UE
AwwYQUFBIENlcnRpZmljYXRlIFNlcnZpY2VzMB4XDTE5MDMxMjAwMDAwMFoXDTI4
MTIzMTIzNTk1OVowgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpOZXcgSmVyc2V5
MRQwEgYDVQQHEwtKZXJzZXkgQ2l0eTEeMBwGA1UEChMVVGhlIFVTRVJUUlVTVCBO
ZXR3b3JrMS4wLAYDVQQDEyVVU0VSVHJ1c3QgUlNBIENlcnRpZmljYXRpb24gQXV0
aG9yaXR5MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAgBJlFzYOw9sI
s9CsVw127c0n00ytUINh4qogTQktZAnczomfzD2p7PbPwdzx07HWezcoEStH2jnG
vDoZtF+mvX2do2NCtnbyqTsrkfjib9DsFiCQCT7i6HTJGLSR1GJk23+jBvGIGGqQ
Ijy8/hPwhxR79uQfjtTkUcYRZ0YIUcuGFFQ/vDP+fmyc/xadGL1RjjWmp2bIcmfb
IWax1Jt4A8BQOujM8Ny8nkz+rwWWNR9XWrf/zvk9tyy29lTdyOcSOk2uTIq3XJq0
tyA9yn8iNK5+O2hmAUTnAU5GU5szYPeUvlM3kHND8zLDU+/bqv50TmnHa4xgk97E
xwzf4TKuzJM7UXiVZ4vuPVb+DNBpDxsP8yUmazNt925H+nND5X4OpWaxKXwyhGNV
icQNwZNUMBkTrNN9N6frXTpsNVzbQdcS2qlJC9/YgIoJk2KOtWbPJYjNhLixP6Q5
D9kCnusSTJV882sFqV4Wg8y4Z+LoE53MW4LTTLPtW//e5XOsIzstAL81VXQJSdhJ
WBp/kjbmUZIO8yZ9HE0XvMnsQybQv0FfQKlERPSZ51eHnlAfV1SoPv10Yy+xUGUJ
5lhCLkMaTLTwJUdZ+gQek9QmRkpQgbLevni3/GcV4clXhB4PY9bpYrrWX1Uu6lzG
KAgEJTm4Diup8kyXHAc/DVL17e8vgg8CAwEAAaOB8jCB7zAfBgNVHSMEGDAWgBSg
EQojPpbxB+zirynvgqV/0DCktDAdBgNVHQ4EFgQUU3m/WqorSs9UgOHYm8Cd8rID
ZsswDgYDVR0PAQH/BAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wEQYDVR0gBAowCDAG
BgRVHSAAMEMGA1UdHwQ8MDowOKA2oDSGMmh0dHA6Ly9jcmwuY29tb2RvY2EuY29t
L0FBQUNlcnRpZmljYXRlU2VydmljZXMuY3JsMDQGCCsGAQUFBwEBBCgwJjAkBggr
BgEFBQcwAYYYaHR0cDovL29jc3AuY29tb2RvY2EuY29tMA0GCSqGSIb3DQEBDAUA
A4IBAQAYh1HcdCE9nIrgJ7cz0C7M7PDmy14R3iJvm3WOnnL+5Nb+qh+cli3vA0p+
rvSNb3I8QzvAP+u431yqqcau8vzY7qN7Q/aGNnwU4M309z/+3ri0ivCRlv79Q2R+
/czSAaF9ffgZGclCKxO/WIu6pKJmBHaIkU4MiRTOok3JMrO66BQavHHxW/BBC5gA
CiIDEOUMsfnNkjcZ7Tvx5Dq2+UUTJnWvu6rvP3t3O9LEApE9GQDTF1w52z97GA1F
zZOFli9d31kWTz9RvdVFGD/tSo7oBmF0Ixa1DVBzJ0RHfxBdiSprhTEUxOipakyA
vGp4z7h/jnZymQyd/teRCBaho1+V
-----END CERTIFICATE-----
```

## Troubleshooting

### Check Service Status
```bash
systemctl status aadxcelit
journalctl -u aadxcelit -f
```

### Check Nginx Status
```bash
systemctl status nginx
nginx -t
```

### Check Ports
```bash
netstat -tlnp | grep :3000
netstat -tlnp | grep :443
```

### Restart Services
```bash
systemctl restart aadxcelit
systemctl restart nginx
```

## Final Steps

1. **Upload your application files** to `/var/www/aadxcelit/`
2. **Copy the SSL certificates** to `/var/www/aadxcelit/ssl/`
3. **Follow the deployment steps** above
4. **Test your domain**: https://www.addxcell.work.gd

Your application should now be running securely with SSL on your Ubuntu VPS!
