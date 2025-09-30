const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetGoal: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ["Health", "Education", "Relief", "Other"],
      default: "Other",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
