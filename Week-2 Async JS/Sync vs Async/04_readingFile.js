// fs is stands for file system used to read and write files in your local system 

const fs = require('fs');

const contents = fs.readFileSync("a.txt", "utf-8");

console.log(contents); 