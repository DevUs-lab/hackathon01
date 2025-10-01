const express = require("express");
const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Make donation
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { campaignId, amount, message, anonymous } = req.body;

        if (!campaignId || !amount || amount <= 0) {
            return res.status(400).json({ msg: "Valid campaign ID and amount required" });
        }

        // Check if campaign exists
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ msg: "Campaign not found" });
        }

        // Create donation
        const donation = new Donation({
            donor: req.user,
            campaign: campaignId,
            amount,
            message,
            anonymous
        });

        await donation.save();

        // Update campaign raised amount
        campaign.raisedAmount = (campaign.raisedAmount || 0) + amount;
        await campaign.save();

        // Populate donor info for response
        await donation.populate("donor", "firstName lastName email");

        res.status(201).json({
            msg: "Donation successful!",
            donation,
            campaign: {
                raisedAmount: campaign.raisedAmount,
                progress: Math.round((campaign.raisedAmount / campaign.targetGoal) * 100)
            }
        });

    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Get donations for a campaign
router.get("/campaign/:campaignId", async (req, res) => {
    try {
        const donations = await Donation.find({ campaign: req.params.campaignId })
            .populate("donor", "firstName lastName")
            .sort({ createdAt: -1 });

        res.json(donations);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Get user's donations
router.get("/my-donations", authMiddleware, async (req, res) => {
    try {
        const donations = await Donation.find({ donor: req.user })
            .populate("campaign", "title description")
            .sort({ createdAt: -1 });

        res.json(donations);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});

module.exports = router;