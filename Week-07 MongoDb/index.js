import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { connectDB, User, Todo } from "./db.js";
import bcrypt from "bcrypt";
import { z } from "zod";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET ?? "secret";
const saltRounds = 10;

app.use(express.json());

const authMiddleware = (req, res, next) => {
    // console.log("authMiddleware hit");
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decodedToken = jwt.verify(token, secret);
        if (decodedToken.userId) {
            req.userId = decodedToken.userId;
            next();
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

app.post("/sign-up", async (req, res) => {
    try {
        // console.log("POST /sign-up hit");
        const signUpSchema = z.object({
            name: z.string().min(3),
            email: z.email(),
            password: z.string().min(6),
        });
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }
        const { name, email, password } = result.data;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

app.post("/sign-in", async (req, res) => {
    try {
        // console.log("POST /sign-in hit");
        const signInSchema = z.object({
            email: z.email(),
            password: z.string().min(6),
        });
        const result = signInSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }
        const { email, password } = result.data;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1d" });
        res.status(200).json({ message: "User logged in successfully", token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

app.get("/todos", authMiddleware, async (req, res) => {
    try {
        // console.log("GET /todos hit");
        const userId = req.userId;
        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

})

app.post("/todos", authMiddleware, async (req, res) => {
    try {
        // console.log("POST /todos hit");
        const todoSchema = z.object({
            title: z.string().min(1),
            description: z.string().optional(),
        });
        const result = todoSchema.safeParse(req.body);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }
        const userId = req.userId;
        const { title, description } = result.data;
        const todoData = { userId, title };
        if (description) todoData.description = description;
        const todo = new Todo(todoData);
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
})



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});