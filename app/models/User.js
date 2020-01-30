const { db, DB, Model } = require('../../core/db')
const { hash } = require('../../core/utils')

class User extends Model {
  /**
   * 根据用户名查询用户
   * @param {*} username 
   */
  static async findUserByName(username) {
    let user = await User.findOne({ where: { username } })
    return user
  }
  /**
   * 根据邮箱查询用户
   * @param {*} email 
   */
  static async findUserByEmail(email) {
    let user = await User.findOne({ where: { email } })
    return user
  }
  /**
   * 根据openid查询用户
   * @param {*} openid 
   */
  static async findUserByOpenId(openid) {
    let user = await User.findOne({ where: { openid } })
    return user
  }
  /**
   * 根据基本信息创建用户
   * @param {*} params 
   */
  static async registerUserByInfo(params) {
    await User.create(params)
  }
  /**
   * 根据openId创建用户
   * @param {*} openid 
   */
  static async registerUserByOpenId(openid) {
    await User.create({ openid })
  }
}

User.init({
  id: {
    type: DB.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    comment: '用户id'
  },
  mobile: {
    type: DB.STRING(11),
    unique: true,
    comment: '手机号',
  },
  username: {
    type: DB.STRING(50),
    unique: true,
    comment: '用户名',
  },
  password: {
    type: DB.STRING,
    set(val) {
      this.setDataValue('password', hash(val))
    },
    comment: '密码'
  },
  email: {
    type: DB.STRING(100),
    unique: true,
    comment: '邮箱'
  },
  openid: {
    type: DB.STRING(64),
    unique: true,
    comment: '微信openid'
  },
  level: {
    type: DB.INTEGER,
    defaultValue: 8
  }
}, {
  sequelize: db,
  modelName: 'db_user',
  comment: '用户信息表'
})

module.exports = User
