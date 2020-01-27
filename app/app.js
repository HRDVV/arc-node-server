const bodyParser = require('koa-bodyparser')
const error = require('./middlewares/exception')
const log = require('./middlewares/log')

module.exports = function createApp(app) {
  app.use(log)
  // 全局异常处理
  app.use(error)
  app.use(bodyParser())
  // 注入扩展
  app.injectExtends()
  app.run()
}
