const fs = require("fs");


function print(err, data) {
    console.log(data);
}

fs.readFile("a.txt", "utf8", print);

fs.readFile("b.txt", "utf8", print);

console.log("Done!");


// fs.readFile("a.txt", "utf-8", function (err, contents) {
//     console.log(contents);
// });