// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: { type: String, unique: true },
//     password: String,
// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
