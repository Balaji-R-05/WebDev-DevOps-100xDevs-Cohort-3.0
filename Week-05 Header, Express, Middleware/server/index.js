import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


const middleware = (req, res, next) => {
    console.log("Middleware called");
    next();
}

// Route Specific Middleware - only works for the route it is applied to
function logRequest(req, res, next) {
  console.log(`Request made to: ${req.url}`);
  next();
}

app.use(middleware);

// http://localhost:3000/sum?a=10&b=10
app.get("/sum", logRequest, (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const sum = parseInt(a) + parseInt(b);
    res.json({ ans: sum.toString() });
});

app.post("/sum", (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const sum = parseInt(a) + parseInt(b);
    res.json({ ans: sum.toString() });
});

// http://localhost:3000/sub?a=10&b=10
app.get("/sub", (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const sub = parseInt(a) - parseInt(b);
    res.json({ ans: sub.toString() });
});

// http://localhost:3000/mul/10/10
app.get("/mul/:a/:b", (req, res) => {
    const a = req.params.a;
    const b = req.params.b;
    const mul = parseInt(a) * parseInt(b);
    res.json({ ans: mul.toString() });
})

// http://localhost:3000/div/10/10
app.get("/div/:a/:b", (req, res) => {
    const a = req.params.a;
    const b = req.params.b;
    const div = parseInt(a) / parseInt(b);
    res.json({ ans: div.toString() });
})

app.get("/health-check", (req, res) => {
    res.json({ ans: "OK" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});