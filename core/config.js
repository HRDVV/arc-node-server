/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-16 09:54:50
 * @modify date 2020-01-16 09:54:50
 * @desc 配置类
 */

const { get, merge } = require('lodash')
const requireDirectory = require('require-directory')
const fs = require('fs')

class Config {
  constructor() {
    this.store = null
  }
  /**
   * 加载配置
   */
  _loadConfig(path) {
    const store = {}
    requireDirectory(module, path, {
      visit: function loadConfig(item) {
        merge(store, item)
      }
    })
    return store
  }
  /**
   * 查找配置文件
   * @param {*} path 
   */
  findConfig(path) {
    if (path) {
      this.store = this._loadConfig(path)
    } else {
      let firstPath = `${ process.cwd() }/app/config`
      let secondPath = `${ process.cwd() }/config`
      try {
        let firstExist = fs.existsSync(firstPath)
        let secondExist = fs.existsSync(secondPath)
        if (firstExist) {
          this.store = this._loadConfig(firstPath)
          return
        }
        if (secondExist) {
          this.store = this._loadConfig(secondPath)
        }
      } catch(error) {
        console.warn('加载配置失败')
      }
    }
  }
  /**
   * 获取配置
   * @param {*} key 
   */
  getItem(key) {
    return get(this.store, key, null)
  }
}

module.exports = new Config()
