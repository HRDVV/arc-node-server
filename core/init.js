/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-15 15:28:09
 * @modify date 2020-01-15 15:28:09
 * @desc 初始化应用
 */

const Koa = require('koa')
const requireDirectory = require('require-directory')
const axios = require('axios')
const { set } = require('lodash')
const Router = require('./router')
const config = require('./config')
const { Service } = require('./interface')
const { Model } = require('sequelize')
const { getIPAdress } = require('./utils')
const logger = require('./log/index')

class ArcInit extends Koa {
  constructor(options) {
    super()
    this.root = process.cwd()
    Object.assign(this, options)
    // 找到所有的配置
    config.findConfig(this.configPath)
    this.extendsContext(config)
  }
  /**
   * 扩展上下文
   * @param {*} cfg 
   */
  extendsContext(cfg) {
    this.context.config = cfg
    this.context.log = logger(cfg.getItem('log') || {}).outLog
    this.context.http = axios
    this.config = this.context.config
    this.log = this.context.log
    this.http = this.context.http
  }
  /**
   * 启动应用
   * @param {*} listeningListener 
   */
  run(listeningListener) {
    if (!this.port) {
      this.port = 3000
    }
    this.listen(this.port || 3000, this.hostname || '', () => {
      console.log(`>>>> 应用启动完毕 -> http://${ getIPAdress() }:${ this.port }`)
      if (listeningListener && typeof listeningListener === 'function') {
        listeningListener()
      }
    })
  }
  /**
   * 自动注入扩展
   */
  injectExtends() {
    if (!this.context.config.store) return console.warn('>>>> 配置文件加载失败， 无法扩展')
    let appRootDir = this.context.config.getItem('rootDir')
    let injects = this.context.config.getItem('injects')
    if (!appRootDir || !injects) return console.warn('>>>> 配置项中没有找到`rootDir`或`injects`')
    let injectDirs = injects.reduce((prev, current) => {
      prev[current] = `${ this.root }/${ appRootDir }/${ current }`
      return prev
    }, {})
    for(let [dirname, dir] of Object.entries(injectDirs)) {
      let modules = requireDirectory(module, dir)
      this.context[dirname] = {}
      for(let [name, item] of Object.entries(modules)) {
        if (Service === Reflect.getPrototypeOf(item)) {
          set(this.context[dirname], name, null)
          Object.defineProperty(this.context[dirname], name, {
            get: () => Reflect.construct(item, [this.context])
          })
        } else if (this.injectRouter != false && item instanceof Router && !item.opts.disabled) {
          this.use(item.routes()).use(item.allowedMethods())
        } else if (Model === Reflect.getPrototypeOf(item)) {
          set(this.context[dirname], name, null)
          Object.defineProperty(this.context[dirname], name, {
            get: () => item
          })
        }
      }
    }
  }
}

module.exports = ArcInit
