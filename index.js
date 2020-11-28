require("dotenv").config();
const express = require("express");
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

//MongoDB connection
mongoose
  .connect(`mongodb://${process.env.HOST}/vidly`, {
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
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  debuggerStartUp("Morgan enable..");
}

//Routes
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

//Server start
app.listen(process.env.PORT, () => {
  debuggerStartUp(`Listening on port ${process.env.PORT}..`);
});
