const bcrypt = require('bcryptjs');
const prisma = require('../src/config/prisma');

async function createAdmin() {
  try {
    const username = 'superadmin';
    const password = 'NewPassword123!';
    const email = 'superadmin@portfolio.com';

    console.log('Creating Super Admin user...');
    console.log('Username:', username);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Password hashed successfully');

    const admin = await prisma.admin.create({
      data: {
        name: 'Super Admin',
        username: username,
        email: email,
        password: hashedPassword,
        role: 'SUPER_ADMIN'
      }
    });

    console.log('\n✅ Super Admin created successfully!');
    console.log('Admin ID:', admin.id);
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('\nYou can now login with:');
    console.log('   Username: superadmin');
    console.log('   Password: NewPassword123!');

  } catch (error) {
    console.error('\n❌ Error creating admin user:');
    if (error.code === 'P2002') {
      console.error('Admin user with this username already exists!');
    } else {
      console.error(error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
