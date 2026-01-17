// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

import express from "express";

const app = express();
const PORT = 5000;

let errorCount = 0;

app.get("/", (req, res) => {
    res.status(200).json({ msg: `Success from GET /` });
});

app.post("/user", (req, res) => {
    res.status(200).json({ msg: `Success from POST /user` });
});

app.get("/user", (req, res, next) => {
    next(new Error("Some Error"));
});

// Error-handling middleware MUST be last
const errorMiddleware = (err, req, res, next) => {
    errorCount++;
    res.status(404).json({ 
        msg: err.message,
        count: errorCount 
    });
};

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
