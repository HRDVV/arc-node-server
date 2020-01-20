
const { db, Model, Sequelize } = require('../../core/db')

class DemoModel extends Model {
}

DemoModel.init({
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
}, { sequelize: db, modelName: 'demo' })

module.exports = DemoModel
