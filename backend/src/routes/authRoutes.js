const express = require('express');
const router = express.Router();
const db = require('./../db'); 
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// --- MULTER CONFIGURATION FOR IMAGE UPLOADS ---
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'), 
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

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
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        res.status(200).json({ 
            message: "Login successful!",
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                district: user.district,
                division: user.division,
                profilePicture: user.profilePicture || null 
            }
        });

    } catch (error) {
        console.error("Login DB Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// --- UPDATE PROFILE ROUTE (REFINED FOR SECURITY ISOLATION) ---
router.put('/update-profile', upload.single('profileImage'), async (req, res) => {
    const { email, fullName, phone, district, division, currentPassword, newPassword, deleteImage } = req.body;

    try {
        // 1. Fetch current user data
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) return res.status(404).json({ message: "User not found." });
        
        const user = users[0];

        // 2. Handle Password Change Logic
        let finalPassword = user.password;
        
        // ONLY check passwords if the user is attempting a password reset
        if (newPassword && newPassword.trim() !== "") {
            // If they want a new password, they MUST provide the old one
            if (!currentPassword) {
                return res.status(400).json({ message: "Current password is required to change to a new one." });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect current password. Password was not changed." });
            }

            const salt = await bcrypt.genSalt(10);
            finalPassword = await bcrypt.hash(newPassword, salt);
        }

        // 3. Handle Image Logic (Upload vs. Delete vs. Keep)
        let profilePicPath = user.profilePicture; 
        
        if (deleteImage === 'true') {
            profilePicPath = null; // Set to null in DB
        } else if (req.file) {
            profilePicPath = `/uploads/${req.file.filename}`; // New upload path
        }

        // 4. Perform Database Update
        const updateSql = `
            UPDATE users 
            SET fullName = ?, phone = ?, district = ?, division = ?, password = ?, profilePicture = ?
            WHERE email = ?
        `;
        
        await db.query(updateSql, [fullName, phone, district, division, finalPassword, profilePicPath, email]);

        res.status(200).json({ 
            message: "Profile updated successfully!",
            profilePicture: profilePicPath 
        });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Failed to update profile details." });
    }
});

module.exports = router;