import { Router } from "express";
import { Admin, Course } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupSchema, loginSchema, courseSchema } from "./schema.js";

const adminRouter = Router();

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decodedToken.id;
    if (decodedToken.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

// Signup
adminRouter.post("/signup", async (req, res) => {
    const parsedInput = signupSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { name, email, password } = parsedInput.data;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(401).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();
    res.json({ message: "Admin created successfully", admin: newAdmin });
})

// Login
adminRouter.post("/login", async (req, res) => {
    const parsedInput = loginSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { email, password } = parsedInput.data;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Admin logged in successfully", token });
})

// Create a course
adminRouter.post("/courses", adminMiddleware,async (req, res) => {
    const parsedInput = courseSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    const { title, description, price, content } = parsedInput.data;
    const course = new Course({ title, description, price, content, creator: req.adminId });
    await course.save();
    res.json({ message: "Course created successfully", course });
})

// Delete a course
adminRouter.delete("/courses/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    await Course.deleteOne({ _id: id });
    res.json({ message: "Course deleted successfully" });
})

// Get a course
adminRouter.get("/courses/:id", adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    res.json({ course });
})

// Get all courses
adminRouter.get("/courses", async (req, res) => {
    const courses = await Course.find();
    res.json({ courses });
})

export default adminRouter;