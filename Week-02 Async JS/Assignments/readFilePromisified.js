import { readFile } from "fs";

function readFilePromise(path, encoding = "utf-8") {
  return new Promise((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromise("a.txt")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));