const { Model, db } = require('../../core/db')
const { art } = require('./common')

class Sentence extends Model {}

Sentence.init(art, {
  sequelize: db,
  modelName: 'db_sentence'
})

module.exports = Sentence
