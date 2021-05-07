const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routes = require('./routes/api');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connecting to database
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/images",
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('Successfully connected to database')
  }
);

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});