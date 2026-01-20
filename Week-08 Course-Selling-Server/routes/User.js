import express from "express";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authMiddleware } from "./Auth.js";
import { Purchase } from "../db.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json({ user });
});

userRouter.get("/purchases", authMiddleware, async (req, res) => {
    const purchases = await Purchase.find({ userId: req.userId });
    res.json({ purchases });
})

userRouter.post("/purchase", authMiddleware, async (req, res) => {
    const { courseId } = req.body;
    const purchase = new Purchase({ userId: req.userId, courseId });
    await purchase.save();
    res.json({ message: "User purchase successfull" });
})

export default userRouter;