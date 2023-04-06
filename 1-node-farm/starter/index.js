// const hello = "hello world";
// console.log(hello);

const fs = require("fs");
// const exercises = fs.open("/Users/affennacken/Coding/exercises.json");

// fs.readFileSync("/Users/affennacken/Coding/exercises.json", );
const textin = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textin);

const textout = `This is what we know about the avocado ${textin}. \n Created on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textout);
console.log("file has been written");
