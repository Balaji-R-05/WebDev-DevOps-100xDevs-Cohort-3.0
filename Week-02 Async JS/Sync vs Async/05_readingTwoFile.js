const fs = require('fs');

const contents = fs.readFileSync("a.txt", "utf8") + fs.readFileSync("b.txt", "utf-8");

console.log(contents); 

const contents1 = fs.readFileSync("a.txt", "utf8"); 

const contents2 = fs.readFileSync("b.txt", "utf8");

console.log(contents1); 
console.log(contents2);