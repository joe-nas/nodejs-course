const http = require("http");
const EventEmitter = require("events");

// Usually one creates a new class which extends EventEmitter
// this is also teh way how node core modules implement event listeners internally
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

//! Observer Pattern:
//* Observer observe the emitter: listens for "newSale" events and logs message to console
myEmitter.on("newSale", () => {
  console.log("There was a new Sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items in stock`);
});

//* emitter emits "newSale" events. The emitter can also date arguments which it emits.
myEmitter.emit("newSale", 10);

////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.end("request received");
});

server.on("request", (req, res) => {
  console.log("another request received");
});

server.on("close", () => console.log("server closing"));

server.listen(8000, "localhost", () => {
  console.log("server is listening");
});
