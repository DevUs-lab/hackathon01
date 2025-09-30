const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        photoURL: { type: String },
        phone: { type: String },
        bio: { type: String },
        status: { type: String, default: "active" },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
