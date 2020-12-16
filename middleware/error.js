const logger = require('../utils/logger');

module.exports = function (err, req, res, next) {
  logger.error(err);
  //Levels of errors on winston
  //error
  //warn
  //info
  //verbose
  //debug
  //silly
  res.status(500).send("Something failed.");
};
