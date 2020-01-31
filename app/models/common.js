const { DB } = require('../../core/db')

const art = {
  id: {
    type: DB.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  status: DB.SMALLINT,
  image: DB.STRING(64),
  content: DB.STRING(300),
  pubdate: DB.DATEONLY,
  favNums: DB.SMALLINT,
  title: DB.STRING(50),
  type: DB.INTEGER
}

module.exports = {
  art
}
