/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:43:40
 * @modify date 2020-01-17 12:43:40
 * @desc 校验器
 */

const validator = require('validator')
const { cloneDeep, get, set } = require('lodash')
const { findRules } = require('./utils')
const { BadRequestException } = require('./exception')

class RuleResult {
  constructor(success, message = '') {
    this.success = success
    this.message = message
  }
}

class Rule {
  constructor(name, message, ...options) {
    this.name = name
    this.message = message
    this.options = options
  }

  validate(value) {
    if(this.name === 'isOptional') {
      return new RuleResult(true)
    }
    if (validator[this.name]('' + value, ...this.options)) {
      return new RuleResult(true)
    }
    return new RuleResult(false, this.message)
  }
}

class FieldResult extends RuleResult {
  constructor(success, message, defaultValue) {
    super(success, message)
    this.defaultValue = defaultValue
  }
}

class Field {
  constructor(rules) {
    this.rules = rules
  }

  validate(key, value) {
    let isOptional = this._isOptional()
    let defaultValue = this._getDefaultValue()
    if (value === null) {
      if (isOptional) {
        return new FieldResult(true, '', defaultValue)
      }
      return new FieldResult(false, `字段【${ key }】为必填项`, null)
    }
    let fieldResult = new FieldResult(false)
    for (let rule of this.rules) {
      let ruleResult = rule.validate(value)
      if (!ruleResult.success) {
        fieldResult.message = ruleResult.message
        fieldResult.defaultValue = null
        return fieldResult
      }
    }
    return new FieldResult(true, '', defaultValue)
  }

  _isOptional() {
    return this.rules.some(item => {
      return item.name === 'isOptional'
    })
  }

  _getDefaultValue() {
    let optional = this.rules.filter(item => {
      return item.name === 'isOptional'
    })
    if (optional.length) {
      return optional[0].options[0]
    }
    return null
  }
}

class Validator {
  constructor() {
    this.originData = {}
    this.parsed = {}
  }

  get(keyPath, parsed = true) {
    if (parsed) {
      return get(this.parsed, keyPath)
    }
    return get(this.originData, keyPath)
  }

  async validate(ctx, alias) {
    // 收集参数
    let params = this._dataCompose(ctx)
    this.originData = cloneDeep(params)
    this.parsed = cloneDeep(params)
    // 收集规则
    let keys = findRules(this, this._filterParams.bind(this))
    // 校验参数
    let errs = []
    for (let key of keys) {
      let result = await this._validator(ctx, key, alias)
      if (!result.success) {
        errs.push(result.message)
      }
    }
    if (!errs.length) {
      throw new BadRequestException(errs)
    }
    return this
  }

  async _validator(ctx, key, alias) {
    let fieldResult
    let isValidateFunc = typeof this[key] === 'function'
    if (isValidateFunc) {
      try {
        await this[key](ctx)
        fieldResult =  new RuleResult(true)
      } catch (error) {
        fieldResult = new RuleResult(false, error.message)
      }
    } else {
      const field = new Field(this[key])
      key = this._transformField(key, alias)
      const [paramValue, path] = this._findParamValue(key)
      fieldResult = field.validate(key, paramValue)
      if (paramValue === null && fieldResult.success) {
        set(this.parsed, [path, key], fieldResult.defaultValue)
      }
    }
    if (fieldResult.success) {
      return {
        success: true, 
        message: null
      }
    }
    return {
      success: false, 
      message: `${ isValidateFunc ? '' : key }: ${ fieldResult.message }`
    }
  }

  _findParamValue(key) {
    let value = get(this.parsed, ['query', key])
    if (value) 
      return [value, 'query']
    value = get(this.parsed, ['path', key])
    if (value) 
      return [value, 'path']
    value = get(this.parsed, ['body', key])
    if (value) 
      return [value, 'body']
    value = get(this.parsed, ['header', key])
    if (value) 
      return [value, 'header']
    return [null, null]
  }

  _transformField(key, alias) {
    if (alias && alias[key]) {
      return alias[key]
    }
    return key
  }

  _filterParams(key) {
    // eg： validateName
    if (/^validate[A-Z]{1}\w+$/.test(key)) {
      return true
    }
    // 规则必须是Rule类型的
    if (Array.isArray(this[key])) {
      return this[key].every(item => {
        return item instanceof Rule
      })
    }
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

module.exports = {
  Rule,
  Validator
}
