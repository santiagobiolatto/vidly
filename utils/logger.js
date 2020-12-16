const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf } = format;
require("winston-mongodb");
require("express-async-errors");

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

module.exports = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({
      handleExceptions: true,
      handleRejections: true,
      maxsize: 512000, //bytes
      maxFiles: 10,
      filename: `${__dirname}/../logs/logfile.log`,
    }),
    new transports.File({
      handleExceptions: true, //Unexpected error (From crashing or something like that)
      handleRejections: true, //Unexpected error from a rejected promise
      maxsize: 512000, //bytes
      maxFiles: 5,
      filename: `${__dirname}/../logs/errorlog.log`,
      level: "error",
    }),
    new transports.Console({
      handleExceptions: true,
      level: "debug",
    }),
    new transports.MongoDB({
      db: "mongodb://localhost:27017/vidly_test",
      options: { useUnifiedTopology: true },
      level:'error'
    }),
  ],
});
