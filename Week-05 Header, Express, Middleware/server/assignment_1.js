// 1. Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
// 2. Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it

import express from "express";

const app = express();

app.use(express.json());
let requestCount = 0;

// 1
const logRequest = (req, res, next) => {
    console.log("---------------------------------------------------")
    console.log("Middleware called");
    console.log("HTTP Method: ", req.method);
    console.log("URL: ", req.url);
    console.log("Timestamp: ", Date.now());
    next();
}

// 2
const countRequest = (req, res, next) => {
    requestCount++;
    console.log("Request count: ", requestCount);
    next();
}

app.use(logRequest)
app.use(countRequest)

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health-check", (req, res) => {
    res.json({ ans: "OK" });
});

app.get("/request-count", (req, res) => {
    res.json({ count: requestCount });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});