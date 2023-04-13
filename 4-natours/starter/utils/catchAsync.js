// catchAsync takes a asyncFn as input and calls it and returns it but calling the catch method on it
module.exports = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch(next);
  };
};
