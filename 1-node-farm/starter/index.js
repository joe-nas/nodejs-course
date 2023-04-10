//! core modules import
const fs = require('fs');
// webserver
const http = require('http');
// routing
const url = require('url');

//! third party modules
const slugify = require('./node_modules/slugify');

//! project modules
const replaceTemplate = require('./modules/replaceTemplate.js');
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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template_overview.html`,
  'utf-8'
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  'utf-8'
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template_product.html`,
  'utf-8'
);

const slugs = dataObj.map((obj) => slugify(obj.productName, { lower: true }));
console.log(slugs);

// create server with callback function that executes when a req hits the server and responding with res
const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
    // Product page
  } else if (pathName === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // api
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
    // Not found
  } else {
    // header must come before the response content - in this case end()
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world!',
    });
    res.end('<h1>Page not found</h1>');
  }
});

// telling the server to listen to incoming requests on localhost:port
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
});
