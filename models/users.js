module.exports = (sequelize, Sequelize) => {
 const user = sequelize.define(
  "user",
  {
   id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
   },
   username: {
    type: Sequelize.STRING,
   },
   password: {
    type: Sequelize.STRING,
   },
  },
  {
   freezeTableName: true,
  }
 )

 return user
}
