const Router = require('@core/router')
const { BadRequestException } = require('../../../core/exception')
const { RegisterValidator, LoginValidator, VertifyValidator } = require('@app/validators/user')
const ResultWraper = require('@app/libs/result')
const { LoginType } = require('../../libs/enum')
const { vertify } = require('@core/jwt')

const user = new Router({
  prefix: '/v1/user'
})

/**
 * 用户注册
 */
user.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx)
  const params = {
    username: v.get('body.username'),
    password: v.get('body.password'),
    confirmPassword: v.get('body.confirmPassword'),
    email: v.get('body.email'),
    mobile: v.get('body.mobile')
  }
  await ctx.services.User.register(params)
  ctx.body = ResultWraper.success(true)
})
/**
 * 登录
 */
user.post('/login', async ctx => {
  const v = await new LoginValidator().validate(ctx)
  let type = v.get('body.type')
  if (!v.get('body.password') && type != LoginType.WX) 
    throw new BadRequestException('密码不能为空')
  let token
  switch(type) {
    case LoginType.WX:
      token = await ctx.services.User.loginByWX(v.get('body.code'))
      break
    case LoginType.EP:
      token = await ctx.services.User.loginByEmail(v.get('body'))
      break
    case LoginType.MP:
      break
    case LoginType.UP:
      break
    default:
      throw new BadRequestException('未知的type')
  }
  ctx.body = ResultWraper.success(token)
})
/**
 * 验证token是否过期
 */
user.get('/vertify', async ctx => {
  const v = await new VertifyValidator().validate(ctx)
  let isValid
  try {
    await vertify(v.get('query.token'))
    isValid = true
  } catch (error) {
    isValid = false
  }
  ctx.body = ResultWraper.success(isValid)
})

module.exports = user
