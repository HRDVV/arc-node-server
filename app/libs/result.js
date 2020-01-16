/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-15 17:54:42
 * @modify date 2020-01-15 17:54:42
 * @desc [description]
 */
const { BusinessCode } = require('./enum')
class ResultWraper {
  static success(data) {
    return {
      success: true, 
      code: BusinessCode.SUCCESS,
      message: null,
      data
    }
  }

  static error(code, message) {
    return {
      success: false, 
      code,
      message,
      data: null
    }
  }
}

module.exports = ResultWraper
