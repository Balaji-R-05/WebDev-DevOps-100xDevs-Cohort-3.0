import mongoose from "mongoose";
import "dotenv/config";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

const ObjectId = mongoose.Schema.Types.ObjectId;

const userModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true }
});

const adminModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { unique: true, type: String, required: true },
    password: { type: String, required: true }
});

const courseModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    content: { type: Array, required: true },
    creator: { type: ObjectId, ref: "Admin", required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const purchaseModel = new mongoose.Schema({
    userId: { type: ObjectId, ref: "User", required: true },
    courseId: { type: ObjectId, ref: "Course", required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userModel);
const Admin = mongoose.model("Admin", adminModel);
const Course = mongoose.model("Course", courseModel);
const Purchase = mongoose.model("Purchase", purchaseModel);

export { connectDB, User, Admin, Course, Purchase };