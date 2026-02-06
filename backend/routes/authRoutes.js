const express = require("express")
const { authLoginUser, authRegisterUser } = require("../controllers/authController")
const router = express.Router()


router.route("/register").post(authRegisterUser)
router.route("/login").post(authLoginUser)

module.exports = router