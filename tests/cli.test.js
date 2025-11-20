const assert = require('assert');
const { generateNginxConfig } = require('../src/nginx-generator');
const { generatePm2Config } = require('../src/pm2-generator');

console.log('[TEST] Verifying VPS deploy configuration generators...');

// 1. Nginx generator test
const nginx = generateNginxConfig({ domain: 'app.example.com', upstreamPort: 3000 });
assert.ok(nginx.includes('upstream app_app_example_com'), 'Should declare correct upstream name');
assert.ok(nginx.includes('proxy_pass http://app_app_example_com'), 'Should proxy to upstream');
assert.ok(nginx.includes('Strict-Transport-Security'), 'Should include HSTS header');
console.log('✓ Nginx reverse proxy generator verified');

// 2. PM2 generator test
const pm2 = generatePm2Config({ appName: 'valeff-web', port: 3000 });
assert.ok(pm2.includes("name: 'valeff-web'"), 'Should set app name');
assert.ok(pm2.includes("exec_mode: 'cluster'"), 'Should enable cluster mode');
assert.ok(pm2.includes('PORT: 3000'), 'Should set port');
console.log('✓ PM2 cluster configuration generator verified');

console.log('\n[SUCCESS] All CLI tests passed cleanly!');
