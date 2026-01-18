import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const todoSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

export { connectDB, User, Todo };