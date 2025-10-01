const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 1
        },
        message: {
            type: String,
            maxlength: 500
        },
        anonymous: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Donation", DonationSchema);