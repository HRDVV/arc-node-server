const { Model, db } = require('../../core/db')
const { art } = require('./common')

class Movie extends Model {}

Movie.init(art, {
  sequelize: db,
  modelName: 'db_movie'
})

module.exports = Movie
