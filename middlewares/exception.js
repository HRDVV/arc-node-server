const { HttpException } = require('../core/exception')
const ResultWraper = require('../app/libs/result')

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error instanceof HttpException) {
      ctx.status = error.status
      ctx.body = ResultWraper.error(error.code, error.message)
    } else {
      ctx.status = 500
      ctx.body = ResultWraper.error('-1', error.message)
    }
  }
}
