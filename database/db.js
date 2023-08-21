let dotenv = require("dotenv")
dotenv.config()
const Sequelize = require("sequelize")

const sequelize = new Sequelize(
 process.env.DATABASE_NAME,
 process.env.DATABASE_USER,
 process.env.DATABASE_PASSWORD,
 {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
  timezone: "+03:00",
 }
)

const user = require("../models/users")

const userModel = user(sequelize, Sequelize)

module.exports = {
 Sequelize,
 sequelize,
 userModel,
}
