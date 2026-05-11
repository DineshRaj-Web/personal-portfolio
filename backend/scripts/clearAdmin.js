const prisma = require("../src/config/prisma");

async function clearAdmin() {
  try {
    console.log("🗑️  Clearing existing admin data...");
    
    const count = await prisma.admin.deleteMany({});
    console.log(`✅ Deleted ${count.count} admin records`);
    
  } catch (error) {
    console.error("❌ Error clearing admin data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearAdmin();
