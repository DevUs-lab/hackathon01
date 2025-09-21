// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ["ngo", "donor"],
//         default: "donor"
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const User = mongoose.model("User", userSchema);
// export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["donor", "ngo"], default: "donor" },
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// export default User;



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["donor", "ngo"], default: "donor" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
