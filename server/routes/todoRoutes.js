const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get all todos
router.get("/", authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user }).sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Add todo
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ msg: "Text is required" });

        const todo = new Todo({ userId: req.user, text });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Update todo
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: "Todo not found" });
        if (todo.userId.toString() !== req.user) return res.status(403).json({ msg: "Forbidden" });

        const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Delete todo
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: "Todo not found" });
        if (todo.userId.toString() !== req.user) return res.status(403).json({ msg: "Forbidden" });

        await todo.deleteOne();
        res.json({ msg: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
