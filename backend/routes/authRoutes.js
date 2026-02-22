const express = require("express")
const { authLoginUser, authRegisterUser, authLogoutUser } = require("../controllers/authController")
const { isAuthenticated, authorizeRoles } = require("../middleware/authenticate")
const router = express.Router()


router.route("/register").post(authRegisterUser)
router.route("/login").post(authLoginUser)
router.route("/logout").get(isAuthenticated, authLogoutUser)

module.exports = router