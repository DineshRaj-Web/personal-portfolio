/**
 * Seed Super Admin Script
 * Run once after database migration to create the default Super Admin
 * 
 * Usage: node seed-superadmin.js
 */

const prisma = require('./src/config/prisma');
const bcrypt = require('bcryptjs');

async function seedSuperAdmin() {
  try {
    // Check if Super Admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username: 'superadmin' }
    });

    if (existingAdmin) {
      console.log('✅ Super Admin already exists');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}`);
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('NewPassword123!', 10);

    // Create Super Admin
    const superAdmin = await prisma.admin.create({
      data: {
        name: 'Super Admin',
        username: 'superadmin',
        email: 'superadmin@portfolio.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });

    console.log('✅ Super Admin created successfully!');
    console.log(`   ID: ${superAdmin.id}`);
    console.log(`   Username: ${superAdmin.username}`);
    console.log(`   Email: ${superAdmin.email}`);
    console.log(`   Role: ${superAdmin.role}`);
    console.log('\nYou can now login with:');
    console.log('   Username: superadmin');
    console.log('   Password: NewPassword123!');

  } catch (error) {
    console.error('❌ Error creating Super Admin:', error.message);
    process.exit(1);
  }
}

seedSuperAdmin();
