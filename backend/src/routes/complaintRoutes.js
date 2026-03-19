const express = require('express');
const router = express.Router();
const db = require('./../db'); 
const multer = require('multer');
const path = require('path');

// =========================================================================
// 1. STORAGE CONFIGURATION
// =========================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensures files go to the root /uploads directory
  },
  filename: (req, file, cb) => {
    // Generates a unique filename (e.g., COMP-1701234567.jpg) to prevent overwrites
    cb(null, `COMP-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// =========================================================================
// 2. SUBMIT A NEW COMPLAINT
// =========================================================================
router.post('/submit', upload.single('profileImage'), async (req, res) => {
  const { 
    user_id, category, title, description, 
    location_text, latitude, longitude 
  } = req.body;

  // Map the uploaded file to a local URL path
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const sql = `
      INSERT INTO complaints 
      (user_id, category, title, description, location_text, latitude, longitude, status, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', ?)
    `;

    const values = [
      user_id, category, title, description, location_text, 
      latitude || null, longitude || null, image_url
    ];

    const [result] = await db.query(sql, values);

    res.status(201).json({ 
      success: true,
      message: "Complaint submitted successfully!",
      complaint_id: result.insertId 
    });

  } catch (error) {
    console.error("Complaint Submission Error:", error);
    res.status(500).json({ success: false, message: "Failed to save complaint to database." });
  }
});

// =========================================================================
// 3. GET ALL COMPLAINTS FOR A SPECIFIC USER
// =========================================================================
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const sql = `SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC`;
    const [complaints] = await db.query(sql, [userId]);
    
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Fetch Complaints Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch complaints." });
  }
});

// =========================================================================
// 4. GET SINGLE COMPLAINT DETAILS BY ID
// =========================================================================
router.get('/:id', async (req, res) => {
  try {

    const sql = `SELECT * FROM complaints WHERE complaint_id = ?`;
    const [complaint] = await db.query(sql, [req.params.id]);
    
    if (complaint.length > 0) {
      res.status(200).json({ success: true, data: complaint[0] });
    } else {
      res.status(404).json({ success: false, message: "Complaint not found" });
    }
  } catch (error) {
    console.error("Fetch Single Complaint Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch complaint details." });
  }
});

// --- GET COMPLAINT STATS FOR DASHBOARD ---
router.get('/stats/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const [total] = await db.query('SELECT COUNT(*) as count FROM complaints WHERE user_id = ?', [userId]);
        const [pending] = await db.query("SELECT COUNT(*) as count FROM complaints WHERE user_id = ? AND status = 'Pending'", [userId]);
        const [resolved] = await db.query("SELECT COUNT(*) as count FROM complaints WHERE user_id = ? AND status = 'Resolved'", [userId]);

        res.json({
            total: total[0].count,
            pending: pending[0].count,
            resolved: resolved[0].count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;