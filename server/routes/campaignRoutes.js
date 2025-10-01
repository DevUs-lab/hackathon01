const express = require("express");
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Middleware to check admin
async function isAdmin(req, res, next) {
  const user = await User.findById(req.user).select("role");
  if (!user || user.role !== "admin") return res.status(403).json({ msg: "Admins only" });
  next();
}

// Create campaign (admin only)
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, description, targetGoal, category } = req.body;
    if (!title || !description || !targetGoal)
      return res.status(400).json({ msg: "Missing fields" });

    const campaign = new Campaign({
      title,
      description,
      targetGoal,
      category,
      createdBy: req.user,
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get all campaigns
// router.get("/", async (req, res) => {
//   const campaigns = await Campaign.find().populate("createdBy", "firstName email");
//   res.json(campaigns);
// });

router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("createdBy", "firstName email");
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update campaign (admin only)
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Campaign not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Delete campaign (admin only)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ msg: "Campaign not found" });

    await campaign.deleteOne();
    res.json({ msg: "Campaign deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
