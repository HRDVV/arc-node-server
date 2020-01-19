const log4js = require('log4js')
const defaultConfig = require('./default')

module.exports = (config = {}) =>  {
  const opts = Object.assign({}, defaultConfig, config)
  log4js.configure(opts)
  return {
    Logger: category => log4js.getLogger(category),
    outLog: log4js.getLogger(),
    appLog: log4js.getLogger('appLog')
  }
}
