const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendEmail");

/**
 * POST /admin/admins
 * Create new admin user (SUPER_ADMIN only)
 */
exports.createAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Send welcome email to new admin
    try {
      await sendEmail({
        to: email,
        subject: "Welcome to Admin Panel - Your Account Has Been Created",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4a90e2;">Welcome to the Admin Panel!</h2>
            <p>Hello,</p>
            <p>Your admin account has been successfully created.</p>
            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Role:</strong> ${role}</p>
              <p><strong>Password:</strong> ${password}</p>
            </div>
            <p>You can now login to the admin dashboard using these credentials.</p>
            <p style="color: #666; font-size: 12px;">Please change your password after first login for security.</p>
          </div>
        `
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Failed to create admin" });
  }
};

/**
 * GET /admin/admins
 * Get all admin users (SUPER_ADMIN only)
 */
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json({ admins });
  } catch (error) {
    console.error("List admins error:", error);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

/**
 * DELETE /admin/:id
 * Delete admin user (SUPER_ADMIN only)
 */
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === parseInt(id)) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id) }
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.role === "SUPER_ADMIN") {
      return res.status(403).json({ message: "Cannot delete Super Admin" });
    }

    await prisma.admin.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({ message: "Failed to delete admin" });
  }
};

/**
 * PUT /admin/admins/:id
 * Update admin details
 */
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, name } = req.body;

    // Find the admin
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id) }
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if trying to change role to SUPER_ADMIN (only SUPER_ADMIN can do this)
    if (role === "SUPER_ADMIN" && req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ message: "Only Super Admin can assign Super Admin role" });
    }

    // Check if email already exists (if changing email)
    if (email && email !== admin.email) {
      const existingAdmin = await prisma.admin.findUnique({
        where: { email }
      });

      if (existingAdmin) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Update admin
    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: {
        email: email || admin.email,
        role: role || admin.role,
        name: name !== undefined ? name : admin.name
      }
    });

    res.json({ 
      message: "Admin updated successfully", 
      admin: updatedAdmin 
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Failed to update admin" });
  }
};
