import { Router } from "express";
import { Course, Purchase } from "../db.js";
import { authMiddleware } from "./Auth.js";
import mongoose from "mongoose";

const courseRouter = Router();

courseRouter.get("/", async (req, res) => {
    const courses = await Course.find();
    res.json({ courses });
})

courseRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    const course = await Course.findById(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.json({ course });
})

export default courseRouter;