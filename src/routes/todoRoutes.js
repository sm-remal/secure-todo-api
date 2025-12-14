const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// CRUD routes
router.post("/", protect, createTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;
