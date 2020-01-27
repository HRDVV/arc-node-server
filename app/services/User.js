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
    let u = await this.ctx.models.User.findOne({ where: { username: params.username } })
    if (u) {
      throw new BadRequestException('用户名已存在')
    }
    await this.ctx.models.User.create(params)
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
    let user = await this.ctx.models.User.findOne({ where: { email } })
    if (!user) {
      throw new UnAnthorizedException('用户不存在')
    }
    if (!compare(pwd, user.getDataValue('password'))) {
      throw new UnAnthorizedException('密码错误')
    }
    return this.genToken(user)
  }
}

module.exports = User
