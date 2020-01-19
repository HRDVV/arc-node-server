/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-17 08:47:34
 * @modify date 2020-01-17 08:47:34
 * @desc helper
 */

module.exports = {
  /**
   * 对象转json
   * @param {*} data 
   */
  toJSON(data) {
    return JSON.stringify(data)
  },
  /**
   * 获取本机ip
   */
  getIPAdress () {
    let interfaces = require('os').networkInterfaces()
    for (let devName in interfaces) {
      let iface = interfaces[devName]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address
        }
      }
    }
  },
  /**
   * 寻找规则
   */
  findRules(target, filterFunc = null) {
    function _find(instance) {
      if (instance == null) return []
      let keys = Reflect.ownKeys(instance)
      if (filterFunc && typeof filterFunc === 'function') {
        keys = keys.filter(filterFunc)
      }
      return [...keys, ..._find(Reflect.getPrototypeOf(instance), filterFunc)]
    }
    return _find(target)
  }
}
