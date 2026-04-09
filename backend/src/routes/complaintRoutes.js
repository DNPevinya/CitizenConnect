const express = require('express');
const router = express.Router();
const db = require('./../db'); 
const multer = require('multer');
const path = require('path');

// =========================================================================
// 0. THE ROUTING BRAIN: Map specific issues to general Departments
// =========================================================================
const issueToDepartmentMap = {
  // 1. Local Councils
  "Garbage Collection Delay": "Local Council", "Illegal Waste Dumping": "Local Council", "Street Cleaning Issue": "Local Council", "Drainage Blockage / Flooding": "Local Council", "Broken Road / Pothole": "Local Council", "Damaged Footpath": "Local Council", "Traffic Signal Malfunction": "Local Council", "Public Park Maintenance Issue": "Local Council", "Public Space Maintenance Issue": "Local Council",

  // 2. Public Health Inspector
  "Dengue Mosquito Breeding Site": "Public Health Inspector", "Food Hygiene Complaint": "Public Health Inspector", "Unsanitary Business Premises": "Public Health Inspector", "Public Sanitation Issue": "Public Health Inspector", "Waste Causing Health Hazard": "Public Health Inspector",

  // 3. Sri Lanka Police
  "Noise Complaint": "Police", "Parking Violation": "Police", "Vandalism": "Police", "Suspicious Activity": "Police", "Public Disorder": "Police",

  // 4. Water Board
  "Water Supply Interruption": "Water Board", "Low Water Pressure": "Water Board", "Pipe Leak": "Water Board", "Water Contamination": "Water Board", "Sewer Line Blockage": "Water Board",

  // 5. Environmental Authority
  "Illegal Tree Cutting": "Environmental Authority", "Air Pollution": "Environmental Authority", "Water Body Pollution (River/Canal)": "Environmental Authority", "Industrial Waste Disposal": "Environmental Authority", "Environmental Damage Complaint": "Environmental Authority",

  // 6. Urban Development Authority
  "Unauthorized Construction": "Urban Development Authority", "Building Code Violation": "Urban Development Authority", "Land Use Violation": "Urban Development Authority", "Unsafe Construction Site": "Urban Development Authority",

  // 7. Electricity Board
  "Power Outage": "Electricity Board", "Streetlight Breakdown": "Electricity Board", "Fallen Electrical Line": "Electricity Board", "Unsafe Electrical Connection": "Electricity Board", "Transformer Issue": "Electricity Board",

  // 8. Transport Authority
  "Bus Stop Maintenance Issue": "Transport Authority", "Unsafe Bus Operation": "Transport Authority", "Route Mismanagement": "Transport Authority", "Public Transport Safety Concern": "Transport Authority",

  // 9. Grama Niladhari
  "Resident Verification Issue": "Grama Niladhari", "Local Documentation Concern": "Grama Niladhari", "Community-Level Dispute (Non-Criminal)": "Grama Niladhari"
};

// 👉 Highly accurate town-level extraction
function extractCity(locationText) {
  if (!locationText) return 'Colombo'; // Default fallback
  
  const text = locationText.toLowerCase();
  
  // Specific Towns First!
  if (text.includes('kadawatha')) return 'Kadawatha';
  if (text.includes('dehiwala') || text.includes('mount lavinia')) return 'Dehiwala';
  if (text.includes('kaduwela') || text.includes('malabe')) return 'Kaduwela';
  if (text.includes('negombo')) return 'Negombo';
  
  // Broader Districts if specific town isn't found
  if (text.includes('gampaha')) return 'Gampaha';
  
  // Default fallback
  return 'Colombo';
}

// =========================================================================
// 1. STORAGE CONFIGURATION
// =========================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `COMP-${Date.now()}-${Math.floor(Math.random() * 1000)}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// =========================================================================
// 2. SUBMIT COMPLAINT (WITH TOWN-LEVEL ROUTING)
// =========================================================================
router.post('/submit', upload.array('images', 3), async (req, res) => {
  const { 
    user_id, category, title, description, 
    location_text, latitude, longitude 
  } = req.body;

  let image_url = null;
  if (req.files && req.files.length > 0) {
    image_url = req.files.map(file => `/uploads/${file.filename}`).join(',');
  }

  try {
    // 1. Determine Department & City
    const targetDept = issueToDepartmentMap[title] || "Local Council"; 
    const targetCity = extractCity(location_text);

    // 2. Query the exact Authority!
    let assigned_authority_id = null;
    
    // We look for an exact match on department AND region (city)
    const findAuthSql = `SELECT authority_id FROM authorities WHERE department = ? AND region = ? LIMIT 1`;
    const [authResults] = await db.query(findAuthSql, [targetDept, targetCity]);

    if (authResults.length > 0) {
      assigned_authority_id = authResults[0].authority_id;
    } else {
      // Fallback mechanism
      const fallbackDistrict = (targetCity === 'Kadawatha' || targetCity === 'Negombo') ? 'Gampaha' : 'Colombo';
      const fallbackSql = `SELECT authority_id FROM authorities WHERE department = ? AND region = ? LIMIT 1`;
      const [fallbackResults] = await db.query(fallbackSql, [targetDept, fallbackDistrict]);
      
      if (fallbackResults.length > 0) {
        assigned_authority_id = fallbackResults[0].authority_id;
      }
    }

    // 👉 DEBUG CONSOLE PRINTS
    console.log("====== ROUTING DEBUG ======");
    console.log("1. Title received:", title);
    console.log("2. Location received:", location_text);
    console.log("3. Mapped Department:", targetDept);
    console.log("4. Extracted City:", targetCity);
    console.log("5. Found Authority ID:", assigned_authority_id);
    console.log("===========================");

    // 3. Insert into database (Notice authority_id is now included!)
    const insertSql = `
      INSERT INTO complaints 
      (user_id, category, title, description, location_text, latitude, longitude, status, image_url, authority_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?)
    `;

    const values = [
      user_id, category, title, description, location_text, 
      latitude || null, longitude || null, image_url, assigned_authority_id
    ];

    const [result] = await db.query(insertSql, values);

    res.status(201).json({ 
      success: true,
      message: "Complaint submitted successfully!",
      complaint_id: result.insertId,
      routed_to: { department: targetDept, region: targetCity, authority_id: assigned_authority_id }
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
    res.status(500).json({ success: false, message: "Failed to fetch complaint details." });
  }
});

// =========================================================================
// 5. GET DASHBOARD STATS
// =========================================================================
router.get('/stats/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const [total] = await db.query('SELECT COUNT(*) as count FROM complaints WHERE user_id = ?', [userId]);
        const [pending] = await db.query("SELECT COUNT(*) as count FROM complaints WHERE user_id = ? AND status = 'Pending'", [userId]);
        const [resolved] = await db.query("SELECT COUNT(*) as count FROM complaints WHERE user_id = ? AND status = 'Resolved'", [userId]);

        res.json({ total: total[0].count, pending: pending[0].count, resolved: resolved[0].count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

// =========================================================================
// 6. GET COMPLAINTS FOR A SPECIFIC AUTHORITY (OFFICER DASHBOARD)
// =========================================================================
router.get('/authority/:authorityId', async (req, res) => {
  try {
    const sql = `SELECT * FROM complaints WHERE authority_id = ? ORDER BY created_at DESC`;
    const [complaints] = await db.query(sql, [req.params.authorityId]);
    
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    console.error("Fetch Authority Complaints Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch complaints." });
  }
});