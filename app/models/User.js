const { db, DB, Model } = require('../../core/db')
const { hash } = require('../../core/utils')

class User extends Model {}

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
