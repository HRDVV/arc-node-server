/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:41:12
 * @modify date 2020-01-17 12:41:12
 * @desc 异常处理中间件
 */

const { HttpException } = require('../../core/exception')
const ResultWraper = require('../libs/result')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.log.error(error)
    if (error instanceof HttpException) {
      ctx.status = error.status
      ctx.body = ResultWraper.error(error.code, error.message)
    } else {
      ctx.status = 500
      ctx.body = ResultWraper.error('-1', error.message)
    }
  }
}
