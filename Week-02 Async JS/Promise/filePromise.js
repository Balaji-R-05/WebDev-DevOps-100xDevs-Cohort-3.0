import {readFile, writeFile} from 'fs';

function cleanFile(filePath) {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf-8", (err, data) => {
      if (err) return reject(err);
      const cleaned = data.trim();
      writeFile(filePath, cleaned, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}



async function main() {
  await cleanFile("a.txt");
  console.log("Done cleaning file");
}

main();