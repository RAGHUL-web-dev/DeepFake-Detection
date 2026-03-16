const express = require("express");
const { 
    getAdminStats, 
    getAllUsers, 
    getUserDetails, 
    updateUserRoleStatus, 
    deleteUser, 
    getAllMedia, 
    deleteMediaContent 
} = require("../controllers/adminController");
const { isAuthenticated, authrizeRoles } = require("../middleware/authenticate");

const router = express.Router();

// ---- Analytics / Dashboard Routes ----
router.route("/stats")
    .get(isAuthenticated, authrizeRoles("admin"), getAdminStats);

// ---- User Management Routes ----
router.route("/users")
    .get(isAuthenticated, authrizeRoles("admin"), getAllUsers);

router.route("/user/:id")
    .get(isAuthenticated, authrizeRoles("admin"), getUserDetails)
    .put(isAuthenticated, authrizeRoles("admin"), updateUserRoleStatus)
    .delete(isAuthenticated, authrizeRoles("admin"), deleteUser);

// ---- Media Moderation Routes ----
router.route("/media")
    .get(isAuthenticated, authrizeRoles("admin"), getAllMedia);

router.route("/media/:id")
    .delete(isAuthenticated, authrizeRoles("admin"), deleteMediaContent);

module.exports = router;
