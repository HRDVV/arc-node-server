const Router = require('@core/router')
const { BadRequestException } = require('../../../core/exception')
const { RegisterValidator, LoginValidator } = require('@app/validators/user')
const ResultWraper = require('@app/libs/result')
const { LoginType, Auth } = require('../../libs/enum')
const auth = require('../../middlewares/auth')

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
  if (!v.get('body.password')) 
    throw new BadRequestException('密码不能为空')
  let token
  switch(v.get('body.type')) {
    case LoginType.WX:
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
user.get('/getUser', auth(Auth.ADMIN), (ctx) => {
  ctx.body = ctx.userInfo
})

module.exports = user
