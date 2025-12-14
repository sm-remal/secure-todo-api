const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
// test
app.use("/api/test", testRoutes);

// 404 route (Not Found)
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error); 
});

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("SecureTodo API is running ");
});

module.exports = app;
