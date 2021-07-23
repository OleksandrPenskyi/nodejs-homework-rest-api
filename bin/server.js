const mongoose = require("mongoose");

const app = require("../app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

mongoose.Promise = global.Promise;

mongoose
  .connect(uriDb, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server is not running. Error message: ${err.message}`);
    process.exit(1);
  });
