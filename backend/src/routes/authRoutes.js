const express = require('express');
const router = express.Router();
// Correct path to step out of 'routes' and find 'db' in 'src'
const db = require('./../db'); 
const bcrypt = require('bcrypt');

// --- REGISTRATION ROUTE ---
router.post('/register', async (req, res) => {
    const { fullName, phone, email, district, division, password } = req.body;

    try {
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (fullName, phone, email, district, division, password) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        
        await db.query(sql, [fullName, phone, email, district, division, hashedPassword]);

        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (users.length === 0) {
            // Error code 401: Unauthorized
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = users[0];

        // 2. Compare the plain-text password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // 3. Success
        res.status(200).json({ 
            message: "Login successful!",
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                district: user.district
            }
        });

    } catch (error) {
        console.error("Login DB Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;