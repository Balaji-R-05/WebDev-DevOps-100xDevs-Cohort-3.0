import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../db.js";
import { signupSchema, loginSchema } from "./schema.js";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.id;
    next();
};

authRouter.post("/signup", async (req, res) => {
    const parsedInput = signupSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { name, email, password } = parsedInput.data;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User created successfully" });
});

authRouter.post("/login", async (req, res) => { 
    const parsedInput = loginSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { email, password } = parsedInput.data;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "User logged in successfully", token });
});

export { authMiddleware, authRouter };