const { Model, db, DB } = require('../../core/db')

class Flow extends Model {}

Flow.init(Object.assign({
  id: {
    type: DB.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  status: DB.SMALLINT,
  index: DB.INTEGER,
  type: DB.INTEGER,
  artId: DB.INTEGER
}), {
  sequelize: db,
  modelName: 'db_flow'
})

module.exports = Flow
