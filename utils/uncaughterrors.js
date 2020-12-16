const logger = require("./logger");

module.exports = function () {
  //Unexpected error (From crashing or something like that)
  process.on("uncaughtException", (ex) => {
    logger.error(ex);
    process.exit(1);
  });

  //Unexpected error from a rejected promise
  process.on("uncaughtRejection", (ex) => {
    logger.error(ex);
    process.exit(1);
  });
};
