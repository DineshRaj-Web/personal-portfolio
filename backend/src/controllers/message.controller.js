const prisma = require("../config/prisma");

exports.getActiveMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

exports.getTrashMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      where: { isDeleted: true },
      orderBy: { deletedAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching trash messages:", error);
    res.status(500).json({ message: "Failed to fetch trash messages" });
  }
};

exports.softDeleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    res.json({ message: "Message moved to trash", data: message });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
};

exports.restoreMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isDeleted: false, deletedAt: null },
    });
    res.json({ message: "Message restored", data: message });
  } catch (error) {
    console.error("Error restoring message:", error);
    res.status(500).json({ message: "Failed to restore message" });
  }
};

exports.permanentDeleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Message permanently deleted" });
  } catch (error) {
    console.error("Error permanently deleting message:", error);
    res.status(500).json({ message: "Failed to permanently delete message" });
  }
};

exports.emptyTrash = async (req, res) => {
  try {
    await prisma.contactMessage.deleteMany({
      where: { isDeleted: true },
    });
    res.json({ message: "Trash emptied successfully" });
  } catch (error) {
    console.error("Error emptying trash:", error);
    res.status(500).json({ message: "Failed to empty trash" });
  }
};

exports.autoCleanupTrash = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await prisma.contactMessage.deleteMany({
      where: {
        isDeleted: true,
        deletedAt: { lte: thirtyDaysAgo },
      },
    });

    res.json({
      message: "Auto-cleanup completed",
      deletedCount: result.count,
    });
  } catch (error) {
    console.error("Error during auto-cleanup:", error);
    res.status(500).json({ message: "Failed to run auto-cleanup" });
  }
};

exports.createContactMessage = async (req, res) => {
  const { name, email, phone, projectType, message } = req.body;

  try {
    await prisma.contactMessage.create({
      data: { name, email, phone, projectType, message },
    });

    console.log(" New Contact Form Submission (Saved to DB):");
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Phone: ${phone || "Not provided"}`);
    console.log(`   Project Type: ${projectType || "Not specified"}`);
    console.log(`   Message: ${message}`);
    console.log("---------------------------");

    res.json({ message: "Saved in database " });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to process message" });
  }
};
