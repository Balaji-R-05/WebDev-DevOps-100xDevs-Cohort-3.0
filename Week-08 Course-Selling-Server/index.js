import express from "express";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import { connectDB } from "./db.js";
import { authRouter } from "./routes/Auth.js";
import courseRouter from "./routes/Courses.js";
import adminRouter from "./routes/Admin.js";
import userRouter from "./routes/User.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

await connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);


app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/user", userRouter);
app.use("/admin", adminRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);  
});