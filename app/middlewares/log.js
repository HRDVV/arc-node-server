/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:40:39
 * @modify date 2020-01-17 12:40:39
 * @desc 日志中间件
 */

const { toJSON } = require('../../core/utils')
const logger = require('../../core/log/index')

const { outLog: log, appLog } = logger()

module.exports = async (ctx, next) => {
  
  try {
    ctx.log = appLog
    log.info(`>>>> ${ ctx.header['user-agent'] } | ${ ctx.method } | ${ ctx.url } -- query: ${ toJSON(ctx.request.query) } body: ${ toJSON(ctx.request.body) }`)
  } catch (error) {
    console.error(error)
    console.error('>>>> 记录日志失败， 请求信息：' + toJSON(ctx.request))
  }
  let startTime = Date.now()
  await next()
  let endTime = Date.now()
  let duration = endTime - startTime
  log.info(`>>>> ${ ctx.url } 总耗时: ${ duration / 1000 }s` )
} 
