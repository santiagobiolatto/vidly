const mongoose = require("mongoose");
const config = require("../config/config");
const debuggerDb = require("debug")("app:db");

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
    debuggerDb(config.serverDb, err.message);
  });
const db = mongoose.connection;

module.exports = db;
