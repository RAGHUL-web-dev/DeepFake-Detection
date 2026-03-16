const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

// Setup environment and database connection
dotenv.config({ path: "./config/.env" });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected for seeding...");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ email: "admin@deepshield.test" });

        if (adminExists) {
            console.log("Admin user already exists. Overwriting to ensure correct password and role...");
            await User.deleteOne({ email: "admin@deepshield.test" });
        }

        const adminUser = await User.create({
            name: "DeepShield Administrator",
            email: "admin@deepshield.test",
            password: "adminpassword123", // Will be hashed securely via the pre-save hook
            role: "admin",
            status: "active",
            security: {
                isVerified: true
            }
        });

        console.log("------------------------------------------");
        console.log("✅ Admin user seeded successfully!");
        console.log(`Email: ${adminUser.email}`);
        console.log(`Password: adminpassword123`);
        console.log("------------------------------------------");
        
        process.exit(0);
    } catch (error) {
        console.error("Failed to seed admin:", error);
        process.exit(1);
    }
};

seedAdmin();
