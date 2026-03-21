module.exports = {
  apps: [{
    name: 'bond-design',
    script: 'npm start',
    cwd: '/root',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/root/.pm2/logs/bond-design-error.log',
    out_file: '/root/.pm2/logs/bond-design-out.log',
  }]
};
