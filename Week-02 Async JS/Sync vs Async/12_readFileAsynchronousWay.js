const fs = require("fs");


function print(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(data);
}

fs.readFile("a.txt", "utf8", print);

fs.readFile("b.txt", "utf8", print);

console.log("Done!");