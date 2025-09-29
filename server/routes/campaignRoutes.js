// routes/campaignRoutes.js
import express from "express";
import Campaign from "../models/Campaign.js";

const router = express.Router();

// Create campaign
router.post("/", async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all campaigns
router.get("/", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

// Read single campaign
router.get("/:id", async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) return res.status(404).json({ error: "Not found" });
  res.json(campaign);
});

// Update campaign
router.put("/:id", async (req, res) => {
  const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete campaign
router.delete("/:id", async (req, res) => {
  await Campaign.findByIdAndDelete(req.params.id);
  res.json({ message: "Campaign deleted" });
});

export default router;
