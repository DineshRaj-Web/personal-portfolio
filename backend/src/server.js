const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config");
const cors = require("./middleware/cors");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const messageRoutes = require("./routes/message.routes");
const messageController = require("./controllers/message.controller");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/messages", messageRoutes);
app.post("/contact", messageController.createContactMessage);

app.listen(config.PORT, () => {
  console.log(
    `Server running on port ${config.PORT}  click Here -> http://localhost:${config.PORT}`
  );
});
