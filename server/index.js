const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const donationRoutes = require("./routes/donationRoutes"); // Add this line

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        console.log("📊 Database:", mongoose.connection.db.databaseName);
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        console.log("🔧 Please check your MongoDB connection string in .env file");
        process.exit(1); // Exit if MongoDB connection fails
    });

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch((err) => console.error("MongoDB error ❌", err));

// Routes - MUST COME AFTER app is defined
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes); // Add this line

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));