var dotenv = require("dotenv")
dotenv.config()

const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")

const { userModel } = require("../database/db")

const userService = require("../services/userService")

const modelService = require("../services/modelService")

module.exports = {
 register: async (req, res, next) => {
  const { username, password } = req.body
  try {
   const user = await userModel.findOne({ where: { username: username } })

   if (user) {
    return res
     .status(409)
     .json({ status: "error", data: "User already exists" })
   } else {
    const hash = await userService.hashPassword(password)

    const uuid = uuidv4()

    await modelService.create(userModel, {
     id: uuid,
     username: username,
     password: hash,
    })
   }

   res.status(200).json({ status: "success", data: "Register user successful" })
  } catch (error) {
    console.log("ERROR", error)
   res.status(500).json({ status: "error", data: error })
   next(error)
  }
 },

 login: async (req, res, next) => {
  const { username, password } = req.body
  try {
   const user = await userModel.findOne({ where: { username: username } })
   if (!user) {
    return res.status(401).json({ status: "error", data: "User not found" })
   } else {
    const validPassword = await userService.checkPassword(
     password,
     user.password
    )
    if (validPassword) {
     const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)
     res.status(200).json({ status: "success", data: { token: token } })
    } else {
     res.status(401).json({ status: "error", data: "Invalid Password" })
    }
   }
  } catch (error) {
   res.status(500).json({ status: "error", data: error })
   next(error)
  }
 },
}
