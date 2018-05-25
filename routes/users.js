const express = require('express');

const User = require('../models/userSchema');
const config = require('../config/main');

// instance of the Router
const router = express.Router();

/**
 * @route   POST api/users/register
 * @desc    Registers User
 * @access  Public
 */
router.post('/register', (req, res) => {
	res.json({ page: 'Register Page' });
});

/**
 * @route   POST api/users/login
 * @desc    Login User / Returning JWT token
 * @access  Public
 */
router.post('/login', (req, res) => {
	res.json({ page: 'Login Page' });
});

module.exports = router;
