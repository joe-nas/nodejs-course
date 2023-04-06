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
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.error("Error");
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("written data2 and data3");
//       });
//     });
//   });
// });
// console.log("will read file");

// webserver
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// create server with callback function that executes when a req hits the server and responding with res
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview")
    res.end("This is the overview");
  else if (pathName === "/product") res.end("Hello from the product");
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    // header must come before the response content - in this case end()
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world!",
    });
    res.end("<h1>Page not found</h1>");
  }
});

// telling the server to listen to incoming requests on localhost:port
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});

// routing
const url = require("url");
