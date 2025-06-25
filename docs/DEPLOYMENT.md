# Deployment Guide

This guide covers deploying KaamKonnect to various platforms including cloud providers and self-hosted solutions.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Database Setup](#database-setup)
- [Domain and SSL](#domain-and-ssl)
- [Monitoring and Logging](#monitoring-and-logging)

## Prerequisites

Before deploying, ensure you have:
- Built and tested the application locally
- Set up production database (MongoDB Atlas recommended)
- Obtained necessary API keys (Google Maps, etc.)
- Prepared domain name and SSL certificates

## Environment Configuration

### Production Environment Variables

Create production environment files:

**Frontend (.env.production):**
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_SOCKET_URL=https://your-api-domain.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kaamkonnect
JWT_SECRET=your_super_secure_jwt_secret_for_production
CORS_ORIGIN=https://your-frontend-domain.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=/tmp/uploads

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## Frontend Deployment

### Option 1: Netlify Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Configure redirects** (create `public/_redirects`):
   ```
   /*    /index.html   200
   ```

4. **Environment variables in Netlify:**
   - Go to Site settings > Environment variables
   - Add your production environment variables

### Option 2: Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure environment variables:**
   ```bash
   vercel env add VITE_API_URL
   vercel env add VITE_GOOGLE_MAPS_API_KEY
   ```

### Option 3: AWS S3 + CloudFront

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create S3 bucket:**
   ```bash
   aws s3 mb s3://your-bucket-name
   ```

3. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Configure CloudFront distribution:**
   - Create distribution pointing to S3 bucket
   - Set up custom error pages for SPA routing
   - Configure SSL certificate

## Backend Deployment

### Option 1: Railway Deployment

1. **Create railway.json:**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "cd server && npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Deploy:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login and deploy
   railway login
   railway link
   railway up
   ```

### Option 2: Heroku Deployment

1. **Create Procfile:**
   ```
   web: cd server && npm start
   ```

2. **Deploy:**
   ```bash
   # Install Heroku CLI
   # Create Heroku app
   heroku create your-app-name

   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret

   # Deploy
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Create app spec (app.yaml):**
   ```yaml
   name: kaamkonnect-api
   services:
   - name: api
     source_dir: /server
     github:
       repo: your-username/kaamkonnect
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NODE_ENV
       value: production
     - key: MONGODB_URI
       value: ${DATABASE_URL}
     - key: JWT_SECRET
       value: ${JWT_SECRET}
   ```

### Option 4: AWS EC2 Deployment

1. **Launch EC2 instance:**
   ```bash
   # Connect to instance
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

2. **Install dependencies:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Install Nginx
   sudo apt install nginx -y
   ```

3. **Deploy application:**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/kaamkonnect.git
   cd kaamkonnect/server

   # Install dependencies
   npm install --production

   # Start with PM2
   pm2 start index.js --name "kaamkonnect-api"
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
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
   ```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create cluster:**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Choose appropriate tier (M0 for development, M2+ for production)

2. **Configure security:**
   ```bash
   # Whitelist IP addresses
   # Create database user
   # Get connection string
   ```

3. **Connection string:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/kaamkonnect?retryWrites=true&w=majority
   ```

### Self-hosted MongoDB

1. **Install MongoDB:**
   ```bash
   # Ubuntu/Debian
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

2. **Configure MongoDB:**
   ```bash
   # Edit configuration
   sudo nano /etc/mongod.conf

   # Enable authentication
   security:
     authorization: enabled

   # Start service
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## Domain and SSL

### SSL Certificate with Let's Encrypt

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Custom Domain Configuration

1. **DNS Records:**
   ```
   Type    Name    Value
   A       @       your-server-ip
   A       www     your-server-ip
   CNAME   api     your-backend-domain.com
   ```

2. **Update CORS settings:**
   ```javascript
   app.use(cors({
     origin: [
       'https://your-domain.com',
       'https://www.your-domain.com'
     ],
     credentials: true
   }));
   ```

## Monitoring and Logging

### Application Monitoring

1. **PM2 Monitoring:**
   ```bash
   # Monitor processes
   pm2 monit

   # View logs
   pm2 logs

   # Restart application
   pm2 restart kaamkonnect-api
   ```

2. **Health Check Endpoint:**
   ```javascript
   app.get('/health', (req, res) => {
     res.status(200).json({
       status: 'OK',
       timestamp: new Date().toISOString(),
       uptime: process.uptime()
     });
   });
   ```

### Error Tracking

1. **Sentry Integration:**
   ```bash
   npm install @sentry/node
   ```

   ```javascript
   const Sentry = require('@sentry/node');

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV
   });
   ```

### Log Management

1. **Winston Logger:**
   ```javascript
   const winston = require('winston');

   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

## Performance Optimization

### Frontend Optimization

1. **Build optimization:**
   ```javascript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom']
           }
         }
       }
     }
   });
   ```

2. **CDN Configuration:**
   ```html
   <!-- Preload critical resources -->
   <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
   ```

### Backend Optimization

1. **Compression:**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Caching:**
   ```javascript
   const redis = require('redis');
   const client = redis.createClient(process.env.REDIS_URL);
   ```

## Backup Strategy

### Database Backup

1. **Automated backups:**
   ```bash
   #!/bin/bash
   # backup.sh
   DATE=$(date +%Y%m%d_%H%M%S)
   mongodump --uri="$MONGODB_URI" --out="/backups/backup_$DATE"
   ```

2. **Backup to S3:**
   ```bash
   aws s3 sync /backups/ s3://your-backup-bucket/
   ```

## Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled with valid SSL certificate
- [ ] Database access restricted
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Regular security updates applied
- [ ] Monitoring and alerting set up

## Rollback Strategy

1. **Database migration rollback:**
   ```bash
   # Keep migration scripts versioned
   # Test rollback procedures
   ```

2. **Application rollback:**
   ```bash
   # Use PM2 for zero-downtime deployments
   pm2 reload kaamkonnect-api
   ```

---

**Deployment complete! 🚀 Your KaamKonnect application is now live in production.**