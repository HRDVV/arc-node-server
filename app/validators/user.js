const { Rule, Validator } = require('../../core/validate')
const { BadRequestException } = require('../../core/exception')

/**
 * 注册校验
 */
class RegisterValidator extends Validator {
  constructor() {
    super()
    this.username = [
      new Rule('isLength', '长度为6-20', { min: 1, max: 50 })
    ]
    this.email = [
      new Rule('isEmail', '邮箱格式错误')
    ]
    this.mobile = [
      new Rule('isMobilePhone', '手机号格式错误')
    ]
    this.password = [
      new Rule('isLength', '长度6-20', { min: 6, max: 20 }),
      new Rule('matches', '密码格式错误', /^[0-9a-zA-Z~!@#$%^&*()_+{}|:"<>?]{6,20}$/)
    ]
  }
  validatePassword(vals) {
    if (vals.body.confirmPassword != vals.body.password) {
      throw new BadRequestException('两次密码不一致')
    }
  }
}

/**
 * 登录校验
 */
class LoginValidator extends Validator {
  constructor() {
    super()
    this.type = [
      new Rule('isInt', '必须是整型')
    ]
  }
}

module.exports = {
  RegisterValidator,
  LoginValidator
}
