
const { Rule, Validator } = require('../../core/validate')
const { BadRequestException } = require('../../core/exception')
class Demo extends Validator {
  constructor() {
    super()
    this.age = [
      // new Rule('isOptional', '', 26),
      new Rule('isInt', '必须是的正整数', { min: 1, max: 100 })
    ]
    this.flag = [
      new Rule('isBoolean', '必须是布尔类型')
    ]
    this.number = [
      new Rule('isFloat', '必须是浮点数')
    ]
  }
  validateAge(vals) {
    if (vals.query.age > 100) {
      throw new BadRequestException('必须是的正整数')
    }
  } 
}

module.exports = Demo
