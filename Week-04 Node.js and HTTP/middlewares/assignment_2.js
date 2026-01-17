// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which clears every one second


import express from "express";

const app = express();
const PORT = 5000;

let queue = {};

setInterval(() => {
    queue = {};
}, 10000);

const rateLimitMiddleware = (req, res, next) => {
    const userId = req.headers["user-id"];
    if (!queue[userId]) {
        queue[userId] = 1;
    } else {
        queue[userId]++;
    }
    if (queue[userId] > 5) {
        return res.status(404).json({ msg: `Rate limit exceeded` });
    }
    next();
}

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
    res.status(200).json({ msg: `Success from GET /` });
});

app.get("/user", (req, res) => {
    res.status(200).json({ msg: `Success from GET /user` });
});

app.post("/user", (req, res) => {
    res.status(200).json({ msg: `Success from POST /user` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});