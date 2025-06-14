const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connected successfully!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
