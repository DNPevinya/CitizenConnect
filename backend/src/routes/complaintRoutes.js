const express = require('express');
const router = express.Router();
const db = require('./../db'); 
const multer = require('multer');
const path = require('path');

// =========================================================================
// 1. STORAGE CONFIGURATION (UNTOUCHED LOGIC)
// =========================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Keeping your unique naming convention
    cb(null, `COMP-${Date.now()}-${Math.floor(Math.random() * 1000)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// =========================================================================
// 2. SUBMIT A NEW COMPLAINT (UPDATED FOR MULTIPLE PHOTOS)
// =========================================================================
// 👉 Changed to .array('images', 3) to match the new Frontend key and limit
router.post('/submit', upload.array('images', 3), async (req, res) => {
  const { 
    user_id, category, title, description, 
    location_text, latitude, longitude 
  } = req.body;

  // 👉 LOGIC UPGRADE: Convert multiple file paths into a single string for your DB
  // Files are stored as: "/uploads/img1.jpg,/uploads/img2.jpg"
  let image_url = null;
  if (req.files && req.files.length > 0) {
    image_url = req.files.map(file => `/uploads/${file.filename}`).join(',');
  }

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
// 3. GET ALL COMPLAINTS FOR A SPECIFIC USER (UNTOUCHED)
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
// 4. GET SINGLE COMPLAINT DETAILS BY ID (UNTOUCHED)
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

// =========================================================================
// 5. GET DASHBOARD STATS (UNTOUCHED)
// =========================================================================
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