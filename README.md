# VPS Deploy Orchestrator

Complete production deployment blueprints, scripts, and automation templates for deploying **Next.js**, **React**, and **Node.js** workloads onto **Ubuntu Linux VPS** instances (DigitalOcean, Hetzner, AWS EC2, Linode).

## Included Features
1. **Automated Nginx Reverse Proxy**:
   - SSL termination via Let's Encrypt / Certbot with auto-renewal cron
   - HTTP/2 support, Gzip/Brotli compression, and proxy buffering
   - WebSockets proxying configuration with upgrade headers
   - Security headers (HSTS, X-Content-Type-Options, CSP, X-Frame-Options)
2. **PM2 Cluster & Zero-Downtime Reloads**:
   - Multi-core cluster configuration with auto-restart on memory spikes
   - Graceful zero-downtime rolling reload script (`pm2 reload ecosystem.config.js`)
3. **Docker Compose Production Topology**:
   - Next.js frontend container, Node.js API container, PostgreSQL database container, and Redis cache
4. **GitHub Actions CI/CD Pipeline**:
   - Automated test execution, SSH deployment, asset building, and health-check verification

License: MIT
