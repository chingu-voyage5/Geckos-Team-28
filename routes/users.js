const express = require('express');

const User = require('../models/userSchema');
const config = require('../config/main');

/*********  Validation handlers  **********/
const validateLogin = require('../validation/validateLogin');
const validateRegister = require('../validation/validateRegister');

// instance of the Router
const router = express.Router();

/**
 * @route   POST api/users/register
 * @desc    Registers User
 * @access  Public
 */
router.post('/register', (req, res) => {
	console.log(req.body);
	const { errors, isValid } = validateRegister(req.body);

	// Validate request body
	if (!isValid) {
		return res.status(400).json(errors);
	}
});

/**
 * @route   POST api/users/login
 * @desc    Login User / Returning JWT token
 * @access  Public
 */
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLogin(req.body);
	const { email, password } = req.body;

	// Validate request body
	if (!isValid) {
		return res.status(400).json(errors);
	}
});

module.exports = router;
