module.exports = {
  env: process.env.NODE_ENV,
  rootDir: 'app',
  injects: [
    'api/v1',
    'models', 
    'services'
  ],
  wxApi: 'https://api.weixin.qq.com'
}
