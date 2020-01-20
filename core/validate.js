/**
 * @author HRDVV
 * @email hrd.candy.dev@gamil.com
 * @create date 2020-01-17 12:43:40
 * @modify date 2020-01-17 12:43:40
 * @desc 校验器(基于对lin-validator、validator的学习)
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
    /**
     * 规则名称，即validator的函数名
     */
    this.name = name
    /**
     * 校验失败时的文案
     */
    this.message = message
    /**
     * 校验的配置项或非必填字段的默认值
     */
    this.options = options
  }

  /**
   * 校验规则
   * @param {any} value 
   */
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
  constructor(success, message, legalValue) {
    super(success, message)
    this.legalValue = legalValue
  }
}

class Field {
  constructor(rules) {
    /**
     * 字段的规则列表
     */
    this.rules = rules
  }
  /**
   * 校验字段
   * @param {string} key 字段名称
   * @param {any} value 字段值
   */
  validate(field, value) {
    let isOptional = this._isOptional()
    let defaultValue = this._getDefaultValue()
    if (value === null) {
      if (isOptional) {
        return new FieldResult(true, '', defaultValue)
      }
      return new FieldResult(false, '必填项不能为空', null)
    }
    let fieldResult = new FieldResult(false)
    for (let rule of this.rules) {
      let ruleResult = rule.validate(value)
      if (!ruleResult.success) {
        fieldResult.message = ruleResult.message
        fieldResult.legalValue = null
        return fieldResult
      }
    }
    return new FieldResult(true, '', this._convert(value))
  }

  _convert(value) {
    for (let rule of this.rules) {
      switch (rule.name) {
        case 'isBoolean':
          return validator.toBoolean(value)
        case 'isFloat':
          return parseFloat(value)
        case 'isInt':
          return parseInt(value)
        default:
          return value
      }
    }
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
    /**
     * 原始数据
     */
    this.originData = {}
    /**
     * 处理默认值以后的数据
     */
    this.parsed = {}
  }
  /**
   * 获取前端传过来的数据
   * @param {string | Array} keyPath 
   * @param {boolean} parsed 是否获取处理过的数据
   */
  get(keyPath, parsed = true) {
    if (parsed) {
      let value = get(this.parsed, keyPath, null)
      // 前端没传，就去默认值里找
      if (value === null) {
        let keyArr = []
        if (typeof keyPath === 'string') {
          keyArr = keyPath.split('.').slice(1)
        } else {
          keyArr = keyPath.slice(1)
        }
        return get(this.parsed, ['default'].concat(keyArr), null)
      }
      return value
    }
    return get(this.originData, keyPath, null)
  }
  /**
   * 校验
   * @param {Application} ctx 
   * @param {object} alias 
   */
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
    if (errs.length) {
      throw new BadRequestException(errs)
    }
    return this
  }

  async _validator(ctx, key, alias) {
    let fieldResult
    let isValidateFunc = typeof this[key] === 'function'
    if (isValidateFunc) {
      try {
        await this[key](this.originData, ctx)
        fieldResult =  new RuleResult(true)
      } catch (error) {
        fieldResult = new RuleResult(false, error.message)
      }
    } else {
      const field = new Field(this[key])
      key = this._transformField(key, alias)
      const [paramValue, path] = this._findParamValue(key)
      fieldResult = field.validate(key, paramValue)
      if (fieldResult.success) {
        // 如果前端没有传该字段，且校验成功，说明该字段是非必填的，这时给赋上默认值
        if (paramValue === null) {
          set(this.parsed, ['default', key], fieldResult.legalValue)
        } else {
          set(this.parsed, [path, key], fieldResult.legalValue)
        }
        
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
      message: `${ isValidateFunc ? '' : (key + ':') }${ fieldResult.message }`
    }
  }

  _findParamValue(key) {
    let value = get(this.parsed, ['query', key], null)
    if (value) 
      return [value, 'query']
    value = get(this.parsed, ['path', key], null)
    if (value) 
      return [value, 'path']
    value = get(this.parsed, ['body', key], null)
    if (value) 
      return [value, 'body']
    value = get(this.parsed, ['header', key], null)
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
