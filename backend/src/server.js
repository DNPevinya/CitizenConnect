const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data from requests

// A simple test route
app.get('/', (req, res) => {
  res.send('Citizen Connect Backend is running!');
});

// Set the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});