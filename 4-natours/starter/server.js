const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('uncaughtException 💥💥💥 shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(
    `App running on port ${port} and in ${process.env.NODE_ENV} mode`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('unhandledRejection 💥💥💥 shutting down...');
  server.close(() => process.exit(1));
});

// console.log(x);
