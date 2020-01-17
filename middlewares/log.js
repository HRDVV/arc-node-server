/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:40:39
 * @modify date 2020-01-17 12:40:39
 * @desc 日志中间件
 */

const log4js = require('log4js')
const { toJSON } = require('../core/utils')

module.exports = async (ctx, next) => {
  try {
    let appenders = ctx.config.getItem('appenders')
    let categories = ctx.config.getItem('categories')
    log4js.configure({ appenders, categories })
    let log = log4js.getLogger('|')
    ctx.log = log
    log.info(`>>>> ${ ctx.method } | ${ ctx.url } -- query: ${ toJSON(ctx.query) } params: ${ toJSON(ctx.params) } body: ${ toJSON(ctx.body) }`)
    await next()
  } catch (error) {
    console.error('记录日志失败， 请求信息：' + toJSON(ctx.request))
    await next()
  }
} 
