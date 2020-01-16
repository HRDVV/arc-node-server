/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-15 17:13:33
 * @modify date 2020-01-15 17:13:33
 * @desc 异常处理
 */

const HttpCode = require('./http-code')

class HttpException extends Error {
  constructor(message, code, status, success) {
    super()
    this.message = message || '服务器异常'
    this.code = code || '100000'
    this.success = success || false
    this.data = null
    this.status = status || HttpCode.SERVER_ERROR
  }
}

class NotFoundException extends HttpException {
  constructor(message, code, status) {
    super(
      message || '未找到资源',
      code || '100000',
      status || HttpCode.NOT_FOUNT
    )
  }
}

module.exports = {
  HttpException,
  NotFoundException
}
