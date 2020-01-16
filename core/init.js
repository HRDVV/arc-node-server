/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-15 15:28:09
 * @modify date 2020-01-15 15:28:09
 * @desc 初始化应用
 */

const Koa = require('koa')
const requireDirectory = require('require-directory')
const { set, get } = require('lodash')
const Router = require('./router')
const Config = require('./config')

class ArcInit extends Koa {
  constructor(options) {
    super()
    this.root = process.cwd()
    Object.assign(this, options)
    this.context.config = new Config(this.configPath)
  }
  /**
   * 启动应用
   * @param {*} listeningListener 
   */
  run(listeningListener = null) {
    if (!this.port) {
      this.port = 3000
    }
    if (!this.hostname) {
      this.hostname = '127.0.0.1'
    }
    this.listen(this.port, this.hostname, listeningListener)
  }
  /**
   * 自动注入扩展
   */
  injectExtends() {
    if (!this.context.config.store) return console.warn('配置文件加载失败， 无法扩展')
    let appRootDir = this.context.config.getItem('rootDir')
    let injects = this.context.config.getItem('injects')
    if (!appRootDir || !injects) return console.warn('配置项中没有找到`rootDir`或`injects`')
    let injectDirs = injects.reduce((prev, current) => {
      prev[current] = `${ this.root }/${ appRootDir }/${ current }`
      return prev
    }, {})
    for(let [dirname, dir] of Object.entries(injectDirs)) {
      let modules = requireDirectory(module, dir)
      for(let [name, item] of Object.entries(modules)) {
        let ctorName = Reflect.getPrototypeOf(item).name
        if (ctorName === 'Service') {
          this.context[dirname] = {}
          set(this.context[dirname], name, Reflect.construct(item, [this.context]))
        } else if (this.injectRouter != false && item instanceof Router && !item.opts.disabled) {
          this.use(item.routes()).use(item.allowedMethods())
        } else {
          this.context[dirname] = {}
          set(this.context[dirname], name, item)
        }
      }
    }
  }
}

module.exports = ArcInit
