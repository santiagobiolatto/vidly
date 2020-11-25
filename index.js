require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');
const debuggerStartUp = require('debug')('app:startup');
const debuggerDb = require('debug')('app:db');
const app = express();
const port = 3000;

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
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    debuggerStartUp('Morgan enable..');
}

//Server start
app.listen(process.env.PORT, () => {
    debuggerStartUp(`Listening on port ${process.env.PORT}..`);
});
