/*
You have been given an express server which has a few endpoints.

Your task is to create a global middleware (app.use) which will maintain a count of the number of 
requests made to the server in the global requestCount variable
*/

import express from "express";

const app = express();
const PORT = 5000;

let requestCount = 0;

const requestCountMiddleware = (req, res, next) => {
    requestCount++;
    next();
}

app.use(requestCountMiddleware);

app.get("/getRequestCount", (req, res) => {
    res.status(200).json({ requestCount });
});

app.use((req, res) => {
    res.status(200).json({ msg: `Success` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
