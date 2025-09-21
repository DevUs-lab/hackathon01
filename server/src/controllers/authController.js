// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";

// // // Register new user
// // export const register = async (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;

// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) return res.status(400).json({ message: "User already exists" });

// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         const newUser = new User({ name, email, password: hashedPassword });
// //         await newUser.save();

// //         res.status(201).json({ message: "User registered successfully" });
// //     } catch (err) {
// //         res.status(500).json({ message: "Server error", error: err.message });
// //     }
// // };

// // // Login user
// // export const login = async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         const user = await User.findOne({ email });
// //         if (!user) return res.status(400).json({ message: "Invalid email or password" });

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

// //         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// //         res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
// //     } catch (err) {
// //         res.status(500).json({ message: "Server error", error: err.message });
// //     }
// // };

// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// // Generate JWT
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // Register
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//         });

//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user._id),
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// // Login
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user._id),
//         });
//     } catch (err) {
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };

// // Profile
// export const getProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select("-password");
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// };


import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
