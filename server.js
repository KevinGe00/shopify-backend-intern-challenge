const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

// Connecting to database
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('Successfully connected to database')
  }
);

//

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});