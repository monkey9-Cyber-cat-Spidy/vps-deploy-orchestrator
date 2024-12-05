module.exports = {
  apps: [
    {
      name: 'nextjs-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'node-api-server',
      script: './src/server.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '400M',
      env: {
        PORT: 5000,
        NODE_ENV: 'production'
      }
    }
  ]
};
