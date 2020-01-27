/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-14 17:07:07
 * @modify date 2020-01-14 17:07:07
 * @desc 枚举
 */

/**
 * 判断是否在枚举中
 * @param {integer} type 
 */
const _hasInEnums = type => {
  let isExist = false
  for (let t of this) {
    if (t == type) {
      isExist = true
      break
    }
  }
  return isExist
}

/**
 * 业务码
 */
const BusinessCode = {
  SUCCESS: '000000'
}
/**
 * 登录方式枚举
 */
const LoginType = {
  WX: 1,                // 微信登录
  MP: 2,                // 手机号 + 密码
  EP: 3,                // 邮箱 + 密码
  UP: 4,                // 用户名 + 密码
  isExist: _hasInEnums
}
/**
 * 权限枚举
 */
const Auth = {
  ADMIN: 8,
  SUPPER_ADMIN: 16,
  isExist: _hasInEnums
}

module.exports = {
  BusinessCode,
  LoginType,
  Auth
}
