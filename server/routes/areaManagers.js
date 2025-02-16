const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { authMiddleware } = require("../middleware/authMiddleware");
const AreaManager = require('../models/AreaManager');


// Route to add a new area manager
router.post('/', authMiddleware, async (req, res) => {
  const { NIC_no, first_name, last_name, area, email, password } = req.body;

  try {
    const existingManager = await AreaManager.findOne({ $or: [{ NIC_no }, { email }] });
    if (existingManager) {
      return res.status(400).json({ message: 'Manager with this NIC or email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password
    const newManager = new AreaManager({
      NIC_no,
      first_name,
      last_name,
      area,
      email,
      password: hashedPassword,
    });

    await newManager.save();
    res.status(201).json(newManager);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add area manager.', error: err.message });
  }
});

// Route to get all area managers
router.get('/', authMiddleware, async (req, res) => {
  try {
    const areaManagers = await AreaManager.find();
    res.status(200).json(areaManagers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch area managers.', error: err.message });
  }
});

// Route to get a single area manager by NIC_no
router.get('/:NIC_no', authMiddleware, async (req, res) => {
  try {
    const manager = await AreaManager.findOne({ NIC_no: req.params.NIC_no });
    if (!manager) {
      return res.status(404).json({ message: 'Area manager not found.' });
    }
    res.status(200).json(manager);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch area manager.', error: err.message });
  }
});

router.put('/:NIC_no', authMiddleware, async (req, res) => {
    const { NIC_no, first_name, last_name, area, email, password } = req.body;
  
    try {
      const manager = await AreaManager.findOne({ NIC_no: req.params.NIC_no });
      if (!manager) {
        return res.status(404).json({ message: 'Area manager not found.' });
      }
  
      manager.first_name = first_name || manager.first_name;
      manager.last_name = last_name || manager.last_name;
      manager.area = area || manager.area;
      manager.email = email || manager.email;
      if (password) {
        manager.password = await bcrypt.hash(password, 10); // Encrypt new password
      }
  
      await manager.save();
      res.status(200).json(manager);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update area manager.', error: err.message });
    }
  });
  

// Route to delete an area manager
router.delete('/:NIC_no', authMiddleware, async (req, res) => {
    try {
      const manager = await AreaManager.findOne({ NIC_no: req.params.NIC_no });
      if (!manager) {
        return res.status(404).json({ message: 'Area manager not found.' });
      }
  
      await manager.remove();
      res.status(200).json({ message: 'Area manager deleted successfully.' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete area manager.', error: err.message });
    }
  });




  const jwt = require("jsonwebtoken");

// Route to login area manager
router.post('/manager-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const manager = await AreaManager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ message: "Area manager not found." });
    }

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: manager._id, area: manager.area }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      manager: {
        first_name: manager.first_name,
        email: manager.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
});



module.exports = router;
