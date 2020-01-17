const bodyParser = require('koa-bodyparser')
const error = require('../middlewares/exception')
const log = require('../middlewares/log')

module.exports = function createApp(app) {
  // 全局异常处理
  app.use(error)
  app.use(bodyParser())
  app.use(log)
  // 注入扩展
  app.injectExtends()
  app.run()
}
