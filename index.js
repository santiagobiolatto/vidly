const config = require("./config/config");
const logger = require("./utils/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const debuggerStartUp = require("debug")("app:startup");
const express = require("express");
const app = express();

//Initializations
require("express-async-errors");
require("./database/index");
require("./routes")(app);

//Middlewares
app.use(helmet());
if (config.env === "development") {
  app.use(morgan("dev"));
  debuggerStartUp("Morgan enable..");
}

//Server start
const server = app.listen(config.serverPort, () => {
  logger.info(`Listening on port ${config.serverPort}..`);
});

module.exports = server;
