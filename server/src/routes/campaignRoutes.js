// src/routes/campaignRoutes.js
import express from "express";
import {
    createCampaign,
    getCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
} from "../controllers/campaignController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCampaigns);
router.get("/:id", getCampaignById);

// Protected
router.post("/", authMiddleware, createCampaign);
router.put("/:id", authMiddleware, updateCampaign);
router.delete("/:id", authMiddleware, deleteCampaign);

export default router;
