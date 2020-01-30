const { Service } = require('@core/interface')
const { BadRequestException, UnAnthorizedException } = require('@core/exception')
const { compare } = require('../../core/utils')
const { sign } = require('../../core/jwt')
const validator = require('validator')

class User extends Service {
  /**
   * 生成token
   */
  genToken(user) {
    return sign({
      uid: user.getDataValue('id'),
      level: user.getDataValue('level')
    })
  }
  /**
   * 注册
   * @param {*} params 
   */
  async register(params) {
    let u = await this.ctx.models.User.findUserByName(params.username)
    if (u) {
      throw new BadRequestException('用户已存在')
    }
    await User.registerUserByInfo(params)
  }
  /**
   * 邮箱密码登录
   * @param {*} data 
   */
  async loginByEmail(data) {
    let email = data.email
    let pwd = data.password
    let isEmail = validator.isEmail(String(email))
    if (!isEmail) {
      throw new BadRequestException('不符合邮箱的格式')
    }
    let user = await this.ctx.models.User.findUserByEmail(email)
    if (!user) {
      throw new UnAnthorizedException('用户不存在')
    }
    if (!compare(pwd, user.getDataValue('password'))) {
      throw new UnAnthorizedException('密码错误')
    }
    return this.genToken(user)
  }
  /**
   * 微信登录
   * @param {*} code 
   */
  async loginByWX(code) {
    if (!code) 
      throw new BadRequestException('code不能为空')
    let result = await this.ctx.services.WX.code2Session(code)
    let openid = result.openid
    let user = await this.ctx.models.User.findUserByOpenId(openid)
    if (!user) {
      await this.ctx.models.User.registerUserByOpenId(openid)
    }
    return this.genToken(user)
  }
}

module.exports = User
