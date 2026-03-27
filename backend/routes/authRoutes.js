const express = require("express");
const { authLoginUser, authRegisterUser, authLogoutUser, getMe } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/authenticate");
const router = express.Router();

router.route("/register").post(authRegisterUser);
router.route("/login").post(authLoginUser);
router.route("/logout").get(isAuthenticated, authLogoutUser);
router.route("/me").get(isAuthenticated, getMe);

module.exports = router;