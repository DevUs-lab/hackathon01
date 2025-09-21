// src/controllers/campaignController.js
import Campaign from "../models/Campaign.js";

// Create new campaign (Protected)
export const createCampaign = async (req, res) => {
    try {
        const { title, description, goalAmount } = req.body;

        const newCampaign = new Campaign({
            title,
            description,
            goalAmount,
            createdBy: req.user._id, // from middleware
        });

        await newCampaign.save();
        res.status(201).json(newCampaign);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get all campaigns (Public)
export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate("createdBy", "name email");
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get single campaign by ID
export const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate("createdBy", "name email");
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update campaign
export const updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });

        if (campaign.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        campaign.title = req.body.title || campaign.title;
        campaign.description = req.body.description || campaign.description;
        campaign.goalAmount = req.body.goalAmount || campaign.goalAmount;

        const updatedCampaign = await campaign.save();
        res.json(updatedCampaign);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete campaign
export const deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: "Campaign not found" });

        if (campaign.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await campaign.deleteOne();
        res.json({ message: "Campaign deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
