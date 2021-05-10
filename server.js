const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routes = require('./routes/api');
const path = require("path")
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connecting to database
// var DB_URI;
// if (process.env.NODE_ENV == 'test') {
//   // Connect to database specifically for test under test env
//   DB_URI = process.env.MONGODB_URL_TEST
//   console.log('IN TEST ENV')
// } else {
//   DB_URI = process.env.MONGODB_URL
//   console.log(DB_URI)
// }

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/images",
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('Successfully connected to database')
  }
);

app.use(express.static('client/build'))

// Support parsing of application/json type post data
app.use(bodyParser.json());

app.use('/api', routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

module.exports = app // Used for testing