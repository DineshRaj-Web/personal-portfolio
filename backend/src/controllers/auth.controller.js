const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const { generateToken, generateResetToken, getResetTokenExpiry, isResetTokenExpired } = require("../utils/jwt");
const { sendOTPEmail } = require("../utils/sendEmail");

/**
 * POST /auth/superadmin/login
 * Super Admin login using username + password
 */
exports.superAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin.role !== "SUPER_ADMIN") {
      return res.status(403).json({ message: "Super Admin access only" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin.id,
      role: admin.role,
      email: admin.email
    });

    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Super Admin login error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

/**
 * POST /auth/login
 * Admin login using email + password
 */
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin.id,
      role: admin.role,
      email: admin.email
    });

    res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

/**
 * POST /auth/forgot-password
 * Generate and store password reset token
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Don't reveal if email exists for security
      return res.json({ message: "If email exists, reset token has been sent" });
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = getResetTokenExpiry();

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    // Print reset token in terminal (simulating email)
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("🔐 PASSWORD RESET TOKEN");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log(`Email: ${email}`);
    console.log(`Reset Token: ${resetToken}`);
    console.log(`Expires in: 15 minutes`);
    console.log("═══════════════════════════════════════════════════════════════");

    res.json({ message: "If email exists, reset token has been sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to process request" });
  }
};

/**
 * POST /auth/reset-password
 * Reset password using token
 */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const admin = await prisma.admin.findFirst({
      where: { resetToken: token }
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    if (!admin.resetTokenExpiry || isResetTokenExpired(admin.resetTokenExpiry)) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

/**
 * GET /auth/me
 * Get current authenticated admin info
 */
exports.getMe = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ admin });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: "Failed to get user info" });
  }
};

/**
 * POST /auth/logout
 * Logout user and clear session
 */
exports.logout = async (req, res) => {
  try {
    // In a real app, you might want to:
    // 1. Add token to blacklist
    // 2. Clear session data
    // 3. Log the logout event
    
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Failed to logout" });
  }
};

/**
 * POST /auth/forgot-password-otp
 * Send OTP for password reset
 */
exports.sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if admin exists
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      // Always return success message to prevent email enumeration
      return res.json({ 
        message: "If your email exists in our system, you will receive a password reset OTP. Please check your email and follow the instructions." 
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Store or update OTP
    const existingOTP = await prisma.passwordResetOTP.findUnique({
      where: { email }
    });

    if (existingOTP) {
      // Update existing OTP
      await prisma.passwordResetOTP.update({
        where: { email },
        data: {
          otp,
          expiresAt
        }
      });
    } else {
      // Create new OTP
      await prisma.passwordResetOTP.create({
        data: {
          email,
          otp,
          expiresAt
        }
      });
    }

    // Send OTP email to user asynchronously
    console.log('📧 Attempting to send OTP email to:', email);
    console.log('📧 OTP Code:', otp);

    sendOTPEmail(email, otp, admin.name || 'User')
      .then(emailResult => {
        console.log('📧 Email sending result:', emailResult);
        if (!emailResult.success) {
          console.error('❌ Failed to send OTP email:', emailResult.error);
          console.error('❌ Error details:', emailResult.details);
        } else {
          console.log(`✅ OTP email sent successfully to ${email}:`, emailResult.messageId);
        }
      })
      .catch(emailError => {
        console.error('❌ Exception sending OTP email:', emailError);
        console.error('❌ Error stack:', emailError.stack);
      });

    res.json({ 
      message: "If your email exists in our system, you will receive a password reset OTP. Please check your email and follow the instructions." 
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/**
 * POST /auth/verify-otp
 * Verify OTP for password reset
 */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find OTP record
    const otpRecord = await prisma.passwordResetOTP.findUnique({
      where: { email }
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Check if OTP matches and is not expired
    if (otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

/**
 * POST /auth/reset-password-with-otp
 * Reset password using OTP
 */
exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Verify OTP first
    const otpRecord = await prisma.passwordResetOTP.findUnique({
      where: { email }
    });

    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash new password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.admin.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    // Delete OTP record
    await prisma.passwordResetOTP.delete({
      where: { email }
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password with OTP error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
};
