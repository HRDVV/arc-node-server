const basicAuth = require('basic-auth')
const { UnAnthorizedException, ForbiddenException } = require('../../core/exception')
const { vertify } = require('../../core/jwt')
const { Auth } = require('../libs/enum')

module.exports = function auth(level = Auth.ADMIN) {
  return async (ctx, next) => {
    let req = ctx.req
    let tokenObj = basicAuth(req)
    if (!tokenObj || !tokenObj.name) {
      throw new UnAnthorizedException('鉴权失败，token为空')
    }
    try {
      let decoded = await vertify(tokenObj.name)
      if (level > decoded.level) {
        throw new ForbiddenException('无权限访问')
      }
      ctx.userInfo = decoded
      await next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnAnthorizedException('token已失效')
      }
      throw new UnAnthorizedException(error.message)
    }
  } 
}
