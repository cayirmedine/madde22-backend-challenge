var express = require("express")
var router = express.Router()
const userController = require("../../controllers/userController")
const breweriesController = require("../../controllers/breweriesController")
const { body, validationResult } = require("express-validator")
const { verifyToken } = require("../../middlewares/userMiddlewares")

router.post(
 "/register",
 body("password")
  .matches(/\d/)
  .withMessage("Password must contain a number")
  .matches(/[A-Z]/)
  .withMessage("Password must contain a capital")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 character"),
 (req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg)

  const hasError = !error.isEmpty()

  if (hasError) {
   res.status(422).json({ status: "error", data: error.array() })
  } else {
   next()
  }
 },
 userController.register
)

router.post("/login", userController.login)

router.get("/breweries", verifyToken, breweriesController.getBreweries)

module.exports = router
