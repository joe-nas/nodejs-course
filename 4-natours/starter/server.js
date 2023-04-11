const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//! run app code after we have loaded the environmental varibles
const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `App running on port ${port} and in ${process.env.NODE_ENV} mode`
  );
});
