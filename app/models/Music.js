const { Model, db, DB } = require('../../core/db')
const { art } = require('./common')

class Music extends Model {}

Music.init(Object.assign({}, art, {
  url: DB.STRING(100)
}), {
  sequelize: db,
  modelName: 'db_music'
})

module.exports = Music
