const bodyParser = require('koa-bodyparser')
const { Arc } = require('./core')
const error = require('./middlewares/exception')
const log = require('./middlewares/log')

const app = new Arc()

app.use(bodyParser())

app.use(log)

// 全局异常处理
app.use(error)

// 注入扩展
app.injectExtends()

app.run()
