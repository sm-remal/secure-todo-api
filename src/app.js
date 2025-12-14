const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const testRoutes = require("./routes/testRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

//  ROOT ROUTE
app.get("/", (req, res) => {
  res.send("SecureTodo API is running 🚀");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/test", testRoutes);

//  404 route
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// global error handler
app.use(errorHandler);

module.exports = app;