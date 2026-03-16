const express = require("express");
const { getMyProfile, getMyMedia } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/authenticate");

const router = express.Router();

// Protected user routes
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/media").get(isAuthenticated, getMyMedia);

module.exports = router;
