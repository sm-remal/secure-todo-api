const Todo = require("../models/Todo");

//  Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get All Todos of logged-in user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user)
      return res.status(403).json({ message: "Not authorized" });

    const { title, description, completed } = req.body;

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user)
      return res.status(403).json({ message: "Not authorized" });

    // await todo.remove();
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
