const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("../config/config");

let dburl = config.serverDb;
if(config.env === 'test'){
  dburl = config.serverDbTest;
}else{
  dburl = config.serverDb;
}

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info(`Connected to ${config.env} MongoDB`);
  });
