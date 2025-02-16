const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { protect } = require('../middleware/authMiddleware.js');


const router = express.Router();


// Generate JWT Token with email included
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};



// @desc Register a new user
// @route POST /api/users/signup
// @access Public
router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user), 
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);






// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);



// @desc Get user profile
// @route GET /api/users/me
// @access Private
router.get(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      res.status(401);
      throw new Error('User not authenticated');
    }

    const user = await User.findById(req.user.id);
    if (user) {
      res.json({ _id: user._id, username: user.username, email: user.email });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);




module.exports = router;
