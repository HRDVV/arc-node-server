/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:43:40
 * @modify date 2020-01-17 12:43:40
 * @desc 校验器
 */

// const validator = require('validator')
const { cloneDeep } = require('lodash')

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

  }

  _dataCompose(ctx) {
    let data = {
      path: ctx.params,
      query: ctx.request.query,
      body: ctx.request.body,
      header: ctx.request.header
    }
    return data
  }

}

class Rule {
  constructor(name, message, ...options) {
    this.name = name
    this.message = message
    this.options = options
  }
}

module.exports = {
  Validator,
  Rule
}
