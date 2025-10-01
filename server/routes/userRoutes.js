const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Get user by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ msg: "User not found" });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Update user profile
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user !== req.params.id) return res.status(403).json({ msg: "Forbidden" });
        const updates = { ...req.body };
        delete updates.password;
        const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select(
            "-password"
        );
        return res.json(updated);
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Change password
router.put("/change-password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user);
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ msg: "Both current and new password are required" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect current password" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.json({ msg: "Password updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;
