const fs = require("fs");

const contents1 = fs.readFileSync("a.txt", "utf8");
console.log(contents1);

const contents2 = fs.readFileSync("b.txt", "utf-8");
console.log(contents2);

const contents3 = fs.readFileSync("b.txt", "utf-8");
console.log(contents3);
