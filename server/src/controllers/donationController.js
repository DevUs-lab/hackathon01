// import Donation from "../models/Donation.js";
// import Campaign from "../models/Campaign.js";

// // Make a donation (Donor only)
// export const donate = async (req, res) => {
//     try {
//         if (req.user.role !== "donor") {
//             return res.status(403).json({ message: "Only donors can donate" });
//         }

//         const { campaignId, amount } = req.body;

//         // check campaign
//         const campaign = await Campaign.findById(campaignId);
//         if (!campaign) return res.status(404).json({ message: "Campaign not found" });
//         if (campaign.status !== "active") {
//             return res.status(400).json({ message: "Campaign is not active" });
//         }

//         // create donation
//         const donation = await Donation.create({
//             donorId: req.user.id,
//             campaignId,
//             amount
//         });

//         // update campaign raisedAmount
//         campaign.raisedAmount += amount;
//         await campaign.save();

//         res.status(201).json({ message: "Donation successful", donation });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get donations by donor (donor history)
// export const getMyDonations = async (req, res) => {
//     try {
//         if (req.user.role !== "donor") {
//             return res.status(403).json({ message: "Only donors can view this" });
//         }

//         const donations = await Donation.find({ donorId: req.user.id })
//             .populate("campaignId", "title category");

//         res.json(donations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get donations for a campaign (NGO only)
// export const getCampaignDonations = async (req, res) => {
//     try {
//         if (req.user.role !== "ngo") {
//             return res.status(403).json({ message: "Only NGOs can view this" });
//         }

//         const donations = await Donation.find({ campaignId: req.params.id })
//             .populate("donorId", "name email");

//         res.json(donations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


import Donation from "../models/Donation.js";
import Campaign from "../models/Campaign.js";

// Create Donation
export const createDonation = async (req, res) => {
    try {
        const { campaignId, amount } = req.body;

        // check campaign exists
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        // create donation
        const donation = await Donation.create({
            donor: req.user._id,
            campaign: campaignId,
            amount,
        });

        // update campaign raisedAmount
        campaign.raisedAmount += amount;
        await campaign.save();

        res.status(201).json(donation);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get donations of logged-in donor
export const getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ donor: req.user._id })
            .populate("campaign", "title goalAmount raisedAmount");
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get donations for a campaign (NGO view)
export const getCampaignDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ campaign: req.params.campaignId })
            .populate("donor", "name email");
        res.json(donations);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
