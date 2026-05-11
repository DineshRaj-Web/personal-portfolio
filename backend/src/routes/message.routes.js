const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const authMiddleware = require("../middleware/auth");
const { requireAdmin } = require("../middleware/role");

// All message routes require ADMIN or SUPER_ADMIN role
router.get("/", authMiddleware, requireAdmin, messageController.getActiveMessages);
router.get("/trash", authMiddleware, requireAdmin, messageController.getTrashMessages);
router.put("/:id/delete", authMiddleware, requireAdmin, messageController.softDeleteMessage);
router.put("/:id/restore", authMiddleware, requireAdmin, messageController.restoreMessage);
router.delete("/:id/permanent", authMiddleware, requireAdmin, messageController.permanentDeleteMessage);
router.delete("/trash/empty", authMiddleware, requireAdmin, messageController.emptyTrash);
router.delete("/trash/auto-cleanup", authMiddleware, requireAdmin, messageController.autoCleanupTrash);

module.exports = router;
