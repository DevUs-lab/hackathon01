// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// MongoDB connect
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully ✅"))
    .catch((err) => console.error("MongoDB connection error ❌", err));

// --- Schemas & Models ---

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        photoURL: { type: String },
        phone: { type: String },
        bio: { type: String },
        status: { type: String, default: "active" },
    },
    { timestamps: true }
);
const User = mongoose.model("User", UserSchema);

const TodoSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);
const Todo = mongoose.model("Todo", TodoSchema);

// --- auth middleware ---
function authMiddleware(req, res, next) {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
}

// ----------------- AUTH ROUTES -----------------

// register
app.post("/api/auth/register", async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        if (!firstName || !email || !password) return res.status(400).json({ msg: "Missing required fields" });

        firstName = firstName.trim();
        email = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already in use" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();

        return res.json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// login
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email: rawEmail, password } = req.body;
        if (!rawEmail || !password) return res.status(400).json({ msg: "Missing credentials" });

        const email = rawEmail.trim().toLowerCase();
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        return res.json({
            token,
            user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// get current user
app.get("/api/auth/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ----------------- USER ROUTES -----------------

// get user by id (protected)
app.get("/api/users/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// update profile (protected) - allowed only for owner
app.put("/api/users/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user !== req.params.id) return res.status(403).json({ msg: "Forbidden" });

        const updates = { ...req.body };
        // Prevent password update here; use change-password route
        delete updates.password;

        const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// change password (protected)
app.put("/api/users/change-password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).json({ msg: "Missing fields" });

        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect current password" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.json({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// ----------------- TODOS ROUTES (protected) -----------------

// list todos for logged-in user
app.get("/api/todos", authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user }).sort({ createdAt: -1 });
        return res.json(todos);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// create todo
app.post("/api/todos", authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || !text.trim()) return res.status(400).json({ msg: "Text is required" });

        const todo = new Todo({ userId: req.user, text: text.trim(), completed: false });
        await todo.save();
        return res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// update todo
app.put("/api/todos/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: "Todo not found" });
        if (todo.userId.toString() !== req.user) return res.status(403).json({ msg: "Forbidden" });

        const updates = req.body;
        const updated = await Todo.findByIdAndUpdate(req.params.id, updates, { new: true });
        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// delete todo
app.delete("/api/todos/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: "Todo not found" });
        if (todo.userId.toString() !== req.user) return res.status(403).json({ msg: "Forbidden" });

        await Todo.findByIdAndDelete(req.params.id);
        return res.json({ msg: "Todo deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
