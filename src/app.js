const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// test
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("SecureTodo API is running ");
});

module.exports = app;
