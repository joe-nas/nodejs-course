// console.log(arguments);
// console.log(require("module").wrapper);

//* module.exports
const C = require("./test-module1");
const calc1 = new C();
console.log(calc1.add(1, 2));
console.log(calc1.divde(2, 4));

//* exports
// const calc2 = require("./test-module2");
// console.log(calc2.add(2, 5));

// using exports and destructuring
const { add, divide, multiply } = require("./test-module2");
console.log(add(34, 5));
console.log(multiply(34, 2));

//caching
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();

//Hello from module 3 --> on load
//Beautiful text in this log --> on load
//Beautiful text in this log --> cached
//Beautiful text in this log --> cached
