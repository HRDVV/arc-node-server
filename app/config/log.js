/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-17 09:57:52
 * @modify date 2020-01-17 09:57:52
 * @desc 日志配置
 */

const path = require('path')

module.exports = {
  appenders: {
    app: {
      type: 'dateFile',
      filename: path.join('logs/', 'app'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8'
    },
    out: {
      type: 'console',
      encoding: 'utf-8'
    }
  },
  categories: {
    default: {
      appenders: process.env.NODE_ENV === 'development' ? ['out'] : ['out', 'app'],
      level: 'info'
    }
  }
}
