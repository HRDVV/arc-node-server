const { db, DB, Model } = require('../../core/db')

class Favor extends Model {}

Favor.init({
  uid: DB.INTEGER,
  type: DB.INTEGER,
  artId: DB.INTEGER
}, {
  sequelize: db,
  modelName: 'db_favor'
})

module.exports = Favor
