// IOBoundTask - Task that invole I/O operations like file , user input, etc

const fs = require('fs');

const contents = fs.readFileSync("a.txt", "utf-8");

console.log(contents); 