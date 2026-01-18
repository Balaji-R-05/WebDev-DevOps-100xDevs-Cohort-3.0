import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;
const secretKey = process.env.JWT_SECRET || 'secret';

const users = [];

app.use(express.json());

// const generateToken = () => {
//     const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         token += characters[Math.floor(Math.random() * characters.length)];
//     }
//     return token;
// }


app.post("/sign-up", (req, res) => {
    const { name, username, password } = req.body;
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(401).json({ message: "Username already exists" });
    }
    // const token = generateToken();
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
    // const token = generateToken();
    // user.token = token;
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
})

app.get("/me", (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decodedToken = jwt.verify(token, secretKey);
        const user = users.find(user => user.username === decodedToken.username);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.json({ name: user.name, username: user.username });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})