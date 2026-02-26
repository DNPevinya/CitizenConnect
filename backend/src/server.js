const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes'); // Import new routes

const app = express();
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/auth', authRoutes); // This makes the URL: http://localhost:5000/api/auth/register

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));