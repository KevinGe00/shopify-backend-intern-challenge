const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routes = require('./routes/api');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connecting to database
var DB_URI;
if (process.env.NODE_ENV == 'test') {
  // Connect to database specifically for test under test env
  DB_URI = process.env.MONGODB_URL_TEST
  console.log('IN TEST ENV')
} else {
  DB_URI = process.env.MONGODB_URL
}

mongoose.connect(
  DB_URI || "mongodb://localhost:27017/images",
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('Successfully connected to database')
  }
);

// Support parsing of application/json type post data
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

module.exports = app // Used for testing