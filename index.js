const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});