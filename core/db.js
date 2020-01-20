/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-20 15:53:05
 * @modify date 2020-01-20 15:53:05
 * @desc 数据库
 */

const config = require('./config')
const { Sequelize, Model } = require('sequelize')

const database = config.getItem('db.database', '')
const username = config.getItem('db.username', '')
const password = config.getItem('db.password', '')
const options = config.getItem('db.options', {})

const db = new Sequelize(database, username, password, options)

db.sync({
  force: false
})

module.exports = { db, Model, Sequelize }
