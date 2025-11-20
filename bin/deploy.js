#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { generateNginxConfig } = require('../src/nginx-generator');
const { generatePm2Config } = require('../src/pm2-generator');

const program = new Command();

program
  .name('vps-deploy')
  .description('Production VPS deployment and orchestration CLI for Next.js, Node.js & Docker')
  .version('2.1.0');

// Command: nginx
program
  .command('nginx')
  .description('Generate hardened Nginx reverse proxy configuration')
  .requiredOption('-d, --domain <domain>', 'Domain name (e.g. app.valefflabs.com)')
  .option('-p, --port <port>', 'Upstream app port', '3000')
  .option('--no-ssl', 'Disable SSL HTTPS block')
  .action((options) => {
    const config = generateNginxConfig({
      domain: options.domain,
      upstreamPort: parseInt(options.port, 10),
      enableSsl: options.ssl
    });
    const outFile = `${options.domain}.conf`;
    fs.writeFileSync(outFile, config);
    console.log(chalk.green.bold(`✓ Nginx configuration created: ${outFile}`));
  });

// Command: pm2
program
  .command('pm2')
  .description('Generate PM2 cluster configuration')
  .requiredOption('-n, --name <name>', 'Application process name')
  .option('-s, --script <script>', 'Entrypoint script', 'server.js')
  .option('-p, --port <port>', 'Application port', '3000')
  .action((options) => {
    const config = generatePm2Config({
      appName: options.name,
      script: options.script,
      port: parseInt(options.port, 10)
    });
    fs.writeFileSync('ecosystem.config.js', config);
    console.log(chalk.green.bold('✓ PM2 ecosystem.config.js generated successfully!'));
  });

// Command: bootstrap
program
  .command('bootstrap')
  .description('Print Ubuntu VPS hardening and setup commands')
  .action(() => {
    console.log(chalk.blue.bold('\n=== Ubuntu VPS Provisioning Commands ===\n'));
    console.log(chalk.gray(`# 1. Update system & install essentials:
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install -y git curl build-essential ufw nginx certbot python3-certbot-nginx

# 2. Configure UFW Firewall:
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# 3. Install Node.js 20 LTS:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
pm2 startup systemd

# 4. Install Docker & Compose:
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker \$USER
`));
  });

program.parse(process.argv);
