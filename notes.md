# backend development

## request response model or client server architecture:

client sends request:
protocol: http/https
ip address: 127.0.0.1
port: 80/443

client and server connect via TCP/IP socket connections. Is kept alive until response is received.

http/s request:
GET/POST/PUT/PATCH: /maps HTTP/1.1 <!-- Start line: http method, request target, http version -->
Host: www.google.com <!-- Http request header -->
User-Agent: Mozilla/5.0
Accept-Language: en-US

<BODY> <!-- Request body (only when sending data to server) -->

server sends response

http response:
HTTP/1.1 200 OK <!-- Start line: http version, status code, status message -->
Date: Sat, 11 Feb 2007 <!-- Http response header -->
Content-Type: text/html
Transfer-Encoding: chunked

<BODY><!-- Response body (e.g. JSON or html) -->

index.html is the first to be loaded --> scanned for assets: JS, CSS, images --> process is repeated for each file.

# web api

## nodejs

v8
libuv: fs, async, event loop thread pool
http-parser
c-ares
OpenSSL
zlib

## nodejs process runs on a single thread

1. initialization
2. execute top level code
3. require modules
4. register event callbacks
5. start event loop (the heart of the node architecture) (libuv)

### the thread pool

- 4 to 128 threads
- the event loop can offload heavy tasks to the event loop
  - file system
  - cryptography
  - compression
  - DNS lookup

## the event pool

- all the application code that is inside callback functions (non-top-level code)
- node is build around callback functions
- node has an event driven architecture
  - events are emitted
  - event loop picks them up
  - callbacks are called
- event loop does the orchestration

- use sync functions only in top level code and not in the event loop / callback functions
- don't perform complex calculations inside the event loop / callback functions
- be careful with JSON in large objects inside the event loop / callback functions
- don't use too complex regular expressions (e.g. nested quantifiers) inside the event loop / callback functions

## The event-driven architecture

event emitters -- emits events --> event listeners -- calls --> attached callback functions

## listener:

listens to events

```javascript
const server = http.createServer();
// server on is a listener for the request event and has a callback function specified
// server is an instance of the EventEmitter class
server.on('request', (req, res) => {
  console.log('Request received');
  res.send('Request received');
});
```

event-emitter logic is also called the called the observer pattern in javascript

## emitter:

new request on server:
'request' event
127.0.0.1:8080

# What are streams

Streams are used to process - read/write - data piece by piece (in chunks), without completing the whole read or write operation, and therefore without keeping all the date in memory. E.g. large I/O operations such as reading files or streaming videos (netflix/ youtube). Streams are more memory efficient, because not all data needs to be kept in memory.

## 4 Types of streams

streams are instances of the EventEmitter class and hence can emit and listen/observe named events

1. readable: consuming data:

- http requests or fs read streams
- important events: data, end
- important functions: pipe(), read()

2. writable: writing data

- http response or fs write streams
- important events: drain, finish
- important functions: write() and end()

3. duplex: readable and writable at the same time

- net web sockets

4. transform: are duplex streams that transform data as it is written or read

- zlib gzip creation

## The commonjs module system

- Each javscript file is treated as a separate module
- node.js uses the CommonJS module system: require(), exports or module.exports
- ES module system is used in browsers: import/export
- there have been attemts to bring ES modules to node.js (.mjs)

### What happens in require()

1. resolving and loading

   - first core modules, then developer modules (./, ../) else node_modules/

2. wrapping

   - module code is wrapped into iife a function giving us access to special objects:
   - iife keeps top level variables we define in our modules private instead of leaking them into the global object

   - export: function to require modules
   - module: reference to current module
   - exports: reference to module.exports used to export object from a module
   - \_\_filename: absolute path of the current modules' gile
   - \_\_dirname: directory of the current module

```javascript
(function (exports, require, module, __filename, __dirname) {
  // module code lives here
});
```

3. execution

4. returning exports

   - require function returns the exports of the required modules
   - module.export is the returned object!!!
   - use model.export to export one single variable, e.g. one class or one function( module.exports = Calculator)
   - use exports to export multiple named variables (exports.add = (a,b) => a + b)

5. caching
   - is only executed once and modules will be in cache
