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
      code || '100001',
      status || HttpCode.NOT_FOUNT
    )
  }
}

class BadRequestException extends HttpException {
  constructor(message, code, status) {
    super(
      message || '参数错误',
      code || '100002',
      status || HttpCode.BAD_REQUEST
    )
  }
}

class ForbiddenException extends HttpException {
  constructor(message, code, status) {
    super(
      message || '禁止访问',
      code || '100003',
      status || HttpCode.FORBIDDEN
    )
  }
}

class UnAnthorizedException extends HttpException {
  constructor(message, code, status) {
    super(
      message || '鉴权失败',
      code || '100004',
      status || HttpCode.UNANTHORIZED
    )
  }
}

class ServerErrorException extends HttpException {
  constructor(message, code, status) {
    super(
      message || '系统内部错误',
      code || '100005',
      status || HttpCode.SERVER_ERROR
    )
  }
}

module.exports = {
  HttpException,
  NotFoundException,
  BadRequestException,
  UnAnthorizedException,
  ForbiddenException,
  ServerErrorException
}
