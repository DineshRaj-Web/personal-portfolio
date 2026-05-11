const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

// Public routes
router.post("/superadmin/login", authController.superAdminLogin);
router.post("/login", authController.adminLogin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// OTP-based password reset routes
router.post("/forgot-password-otp", authController.sendPasswordResetOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/reset-password-with-otp", authController.resetPasswordWithOTP);

// Protected routes
router.get("/me", authMiddleware, authController.getMe);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
