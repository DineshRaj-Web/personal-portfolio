const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middleware/auth");
const { requireSuperAdmin } = require("../middleware/role");

// All admin management routes require SUPER_ADMIN role
router.get("/admins", authMiddleware, requireSuperAdmin, adminController.getAllAdmins);
router.post("/admins", authMiddleware, requireSuperAdmin, adminController.createAdmin);
router.delete("/admins/:id", authMiddleware, requireSuperAdmin, adminController.deleteAdmin);

// Update admin
router.put("/admins/:id", authMiddleware, requireSuperAdmin, adminController.updateAdmin);

module.exports = router;
