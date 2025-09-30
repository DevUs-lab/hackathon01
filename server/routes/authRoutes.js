const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Register
router.post("/register", async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        if (!firstName || !email || !password)
            return res.status(400).json({ msg: "Missing fields" });

        email = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        return res.json({ msg: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email: rawEmail, password } = req.body;
        if (!rawEmail || !password) return res.status(400).json({ msg: "Missing credentials" });

        const email = rawEmail.trim().toLowerCase();
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        const safeUser = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        return res.json({ token, user: safeUser });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Current user
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
