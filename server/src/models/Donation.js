// import mongoose from "mongoose";

// const donationSchema = new mongoose.Schema({
//     donorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
//     amount: { type: Number, required: true },
//     donatedAt: { type: Date, default: Date.now }
// });

// const Donation = mongoose.model("Donation", donationSchema);
// export default Donation;

import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
    {
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
        amount: { type: Number, required: true },
    },
    { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
