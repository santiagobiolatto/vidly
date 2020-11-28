const express = require("express");
const config = require('./config/config');
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const debuggerStartUp = require("debug")("app:startup");
const debuggerDb = require("debug")("app:db");
const app = express();

//Routers exports
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require('./routes/users');
const auth = require('./routes/auth');

//MongoDB connection
mongoose
  .connect(config.serverDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    debuggerDb("Connected to MongoDB...");
  })
  .catch((err) => {
    debuggerDb("Could not connect to MongoDB..", err);
  });

//Middleware
app.use(express.json());
app.use(helmet());
if (config.env === "development") {
  app.use(morgan("dev"));
  debuggerStartUp("Morgan enable..");
}

//Routes
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Server start
app.listen(config.serverPort, () => {
  debuggerStartUp(`Listening on port ${config.serverPort}..`);
});
