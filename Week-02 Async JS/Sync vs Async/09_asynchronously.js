import { readFile } from "fs";

readFile("a.txt", "utf-8", function (err, contents) {
  console.log(contents);
});


readFile("b.txt", "utf-8", function (err, contents) {
  console.log(contents);
});

readFile("a.txt", "utf-8", function (err, contents) {
  console.log(contents);
});
