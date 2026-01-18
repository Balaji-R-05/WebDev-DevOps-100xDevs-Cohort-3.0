import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const PORT = 5000;
const secretKey = process.env.JWT_SECRET || 'secret';

const users = [];

app.use(express.json());
app.use(cors());

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    // console.log("TOKEN RECEIVED:", token);
    try {
        const decodedToken = jwt.verify(token, secretKey);
        // console.log("DECODED TOKEN:", decodedToken);
        const user = users.find(
            user => user.username === decodedToken.username
        );
        // console.log("USER FOUND:", user);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = user;
        // console.log("USER ADDED TO REQ:", req.user);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or malformed token" });
    }
}


app.post("/sign-up", (req, res) => {
    const { name, username, password } = req.body;
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(401).json({ message: "Username already exists" });
    }
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    const newUser = {
        name,
        username,
        password
    };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully", token });
})

app.post("/sign-in", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: "Invalid username" });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
})

app.get("/me", authMiddleware, (req, res) => {
    // console.log("ME ROUTE HIT");
    // console.log("USER FROM REQ:", req.user);
    // console.log("NAME FROM REQ:", req.user.name);
    // console.log("USERNAME FROM REQ:", req.user.username);
    res.json({
        name: req.user.name,
        username: req.user.username,
        message: "User fetched successfully"
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})