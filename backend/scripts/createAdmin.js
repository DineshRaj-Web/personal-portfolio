const bcrypt = require('bcryptjs');
const prisma = require('../src/config/prisma');

async function createAdmin() {
  try {
    const username = 'Admin';
    const password = '12345';

    console.log('Creating admin user...');
    console.log('Username:', username);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Password hashed successfully');

    const admin = await prisma.admin.create({
      data: {
        username: username,
        password: hashedPassword
      }
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('Admin ID:', admin.id);
    console.log('Username:', admin.username);
    console.log('\n⚠️  IMPORTANT: Change the default password in production!');

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
