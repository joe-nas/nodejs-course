// const hello = "hello world";
// console.log(hello);

const fs = require("fs");
// const exercises = fs.open("/Users/affennacken/Coding/exercises.json");

// fs.readFileSync("/Users/affennacken/Coding/exercises.json", );

// blocking reading and writing
// const textin = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textin);

// const textout = `This is what we know about the avocado ${textin}. \n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textout);
// console.log("file has been written");

// async read and write
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.error("Error");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("written data2 and data3");
      });
    });
  });
});
console.log("will read file");
