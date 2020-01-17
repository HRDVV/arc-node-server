/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-15 15:21:52
 * @modify date 2020-01-15 15:21:52
 * @desc 框架核心
 */

const Arc = require('./init')
const Router = require('./router')
const Exception = require('./exception')
const Interface = require('./interface')
const utils = require('./utils')

module.exports = {
  Arc,
  Router,
  Exception,
  utils,
  ...Interface
}
