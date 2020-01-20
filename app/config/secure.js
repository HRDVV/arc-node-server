module.exports = {
  db: {
    database: 'spider',
    username: 'root',
    password: '12345678',
    options: {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: true,
      timezone: '+08:00',
      define: {
        //create_time  update_time delete_time
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        freezeTableName: true,
        scopes: {
          bh: {
            attributes: {
              exclude: ['updated_at', 'deleted_at', 'created_at']
            }
          }
        }
      }
    }
  }
}
