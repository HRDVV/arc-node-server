module.exports = {
  db: {
    database: 'api_server',
    username: 'root',
    password: '12345678',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: process.env.NODE_ENV === 'development',
      timezone: '+08:00',
      define: {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName: true
      }
    }
  },
  wx: {
    appId: 'wx23e89c9000ba99be',
    appSecret: 'eee893e2d646fc80282ec61101c926c6'
  },
  jwt: {
    secret: 'hrdvv123456',
    expiresIn: 60 * 60 * 2
  }
}
