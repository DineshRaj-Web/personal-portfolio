const prisma = require("../src/config/prisma");
const bcrypt = require("bcryptjs");

async function createSuperAdmin() {
  try {
    console.log("🔧 Creating Super Admin user...");

    // Check if Super Admin already exists
    const existingSuperAdmin = await prisma.admin.findFirst({
      where: { role: "SUPER_ADMIN" }
    });

    if (existingSuperAdmin) {
      console.log("⚠️  Super Admin already exists!");
      console.log("📋 Super Admin Details:");
      console.log(`   Name: ${existingSuperAdmin.name}`);
      console.log(`   Username: ${existingSuperAdmin.username}`);
      console.log(`   Email: ${existingSuperAdmin.email}`);
      console.log(`   Role: ${existingSuperAdmin.role}`);
      return;
    }

    // Super Admin credentials
    const superAdminData = {
      name: "Super Admin",
      username: "superadmin",
      email: "superadmin@example.com",
      password: "SuperAdmin123!", // Change this in production!
      role: "SUPER_ADMIN"
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(superAdminData.password, 10);

    // Create Super Admin
    const superAdmin = await prisma.admin.create({
      data: {
        name: superAdminData.name,
        username: superAdminData.username,
        email: superAdminData.email,
        password: hashedPassword,
        role: superAdminData.role
      }
    });

    console.log("✅ Super Admin created successfully!");
    console.log("📋 Super Admin Details:");
    console.log(`   Name: ${superAdmin.name}`);
    console.log(`   Username: ${superAdmin.username}`);
    console.log(`   Email: ${superAdmin.email}`);
    console.log(`   Password: ${superAdminData.password} (CHANGE THIS IN PRODUCTION!)`);
    console.log(`   Role: ${superAdmin.role}`);
    console.log("\n⚠️  IMPORTANT: Change the password in production!");
    console.log("🔐 Use these credentials to login as Super Admin");

  } catch (error) {
    console.error("❌ Error creating Super Admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createSuperAdmin();
