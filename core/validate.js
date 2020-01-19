/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:43:40
 * @modify date 2020-01-17 12:43:40
 * @desc 校验器
 */

// const validator = require('validator')
const { cloneDeep } = require('lodash')
const { findRules } = require('./utils')

class Rule {
  constructor(name, message, ...options) {
    this.name = name
    this.message = message
    this.options = options
  }
}

class Validator {
  constructor() {
    this.originData = {}
    this.parsed = {}
  }

  validate(ctx, alias = {}) {
    // 收集参数
    let params = this._dataCompose(ctx)
    this.originData = cloneDeep(params)
    this.parsed = cloneDeep(params)
    // 收集规则
    let rules = findRules(this, this._filterParams.bind(this))
    console.log(rules)
  }

  _filterParams(key) {
    // eg： validateName
    if (/^validate[A-Z]{1}\w+$/.test(key)) {
      return true
    }
    if (Array.isArray(this[key])) {
      return this[key].every(item => {
        return item instanceof Rule
      })
    }
    if (this[key] instanceof Rule) {
      return true
    }
  }

  _dataCompose(ctx) {
    // let data = {
    //   path: ctx.params,
    //   query: ctx.request.query,
    //   body: ctx.request.body,
    //   header: ctx.request.header
    // }
    return {}
  }
}

class Demo extends Validator {
  constructor() {
    super()
    this.name = new Rule('isInt', 'wewe')
    this.age = [
      new Rule('isInt', '33')
    ]
  }
  validateName() {

  }
}

var val = new Demo()
val.validate()

module.exports = {
  Rule,
  Validator
}
