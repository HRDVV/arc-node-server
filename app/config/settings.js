module.exports = {
  env: process.env.NODE_ENV,
  rootDir: 'app',
  injects: [
    'models', 
    'services',
    'api/v1'
  ],
  wxApi: 'https://api.weixin.qq.com'
}
