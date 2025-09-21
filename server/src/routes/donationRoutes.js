import express from "express";
import {
    createDonation,
    getMyDonations,
    getCampaignDonations,
} from "../controllers/donationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a donation (Donor only)
router.post("/", authMiddleware, createDonation);

// Get my donations (Donor only)
router.get("/my", authMiddleware, getMyDonations);

// Get donations for a campaign (NGO only)
router.get("/campaign/:campaignId", authMiddleware, getCampaignDonations);

export default router;
