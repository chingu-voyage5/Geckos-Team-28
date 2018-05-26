const express = require('express');

const User = require('../models/userSchema');
const config = require('../config/main');
const jwt = require('jsonwebtoken');

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
	const { email, password, fullName, date, username } = req.body;

	// Validate request body
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Register new user
	const newUser = new User({
		email,
		password,
		username,
		fullName,
		date,
	});

	// Attempt to save the new user
	newUser.save(function(err) {
		if (err) {
			console.log(err);
			return res.json({ success: false, message: 'There was error with the entered values' });
		}
		res.json({ success: true, message: 'Successfully created new user.' });
	});
});

/**
 * @route   POST api/users/login
 * @desc    Login User / Returning JWT token
 * @access  Public
 */
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLogin(req.body);
	const { password, email } = req.body;

	// Validate request body
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email }, function(err, user) {
		if (err) throw err;
		user.comparePassword(password, function(err, isMatch) {
			if (isMatch && !err) {
				// Create the token
				let token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 10080, // in seconds
				});
				res.json({ success: true, token: `JWT ${token}` });
			} else {
				res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
			}
		});
	});
});

// Logout route

router.get('/logout', function(req, res) {
	req.logout();
	res.send({ success: false, message: 'There was an error with the logout' });
});

module.exports = router;
