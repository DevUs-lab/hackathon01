// models/Campaign.js
import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetGoal: { type: Number, required: true },
  raisedAmount: { type: Number, default: 0 }, // initially 0
  category: { type: String, enum: ["Health", "Education", "Relief", "Other"], default: "Other" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // NGO admin
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);
