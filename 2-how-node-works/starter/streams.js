const fs = require("fs");
const server = require("http").createServer();

// bad solution, more or less blocking
// server.on("request", (req, res) => {
//   fs.readFile("test-file.txt", (err, data) => {
//     if (err) console.log(err);
//     res.end(data);
//   });
// });

// Also not optimal because of back pressure response stream is overwhelmed
// server.on("request", (req, res) => {
//   const readable = fs.createReadStream("test-fil.txt");
//   readable.on("data", (chunk) => {
//     // response is a writeable stream
//     res.write(chunk);
//   });
//   readable.on("end", () => {
//     res.end();
//   });
//   readable.on("error", (err) => {
//     console.log(err);
//     res.statusCode = 500;
//     res.end("File not found!");
//   });
// });

// Optimal solution to backpressure is piping streams
server.on("request", (req, res) => {
  const readable = fs.createReadStream("test-file.txt");
  // readableSource.pipe(writableDest) readable into response
  readable.pipe(res);

  readable.on("end", () => {
    res.end();
  });
  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
});

server.listen(8000, "localhost", () => {
  console.log("Listening");
});
