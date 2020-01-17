module.exports = {
  env: process.env.NODE_ENV,
  rootDir: 'app',
  injects: [
    'api/v1',
    'models', 
    'services'
  ]
}
