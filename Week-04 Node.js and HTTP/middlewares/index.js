import express from "express";

const app = express();
const PORT = 5000;

app.use(express.json());


// function isOldEnough(age) {
//     if (age >= 18) {
//         return true;
//     } else {
//         return false;
//     }
// }
// app.get("/", (req, res) => {
//     if (!isOldEnough(req.params.age)) {
//         res.json({msg: "Not old enough"})
//     }
//     res.json({ msg: "success" });
// });

const isOldEnough = (req, res, next) => {
    if (req.params.age >= 18) {
        next();
    } else {
        res.json({ msg: "Not old enough" });
    }
}

app.get("/:age", isOldEnough, (req, res) => {
    res.json({ msg: "success" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})