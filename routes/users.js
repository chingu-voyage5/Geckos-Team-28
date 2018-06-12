const express = require('express');
const gravatar = require('gravatar');
const User = require('../models/userSchema');
const config = require('../config/main');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
	const { errors, isValid } = validateRegister(req.body);

	// Validate request body
	if (!isValid) {
		return res.status(400).json(errors);
	}
	// Try to find the user with the same email first
	User.findOne({
		email: req.body.email,
	})
		.then(user => {
			// If email exists throw error
			if (user) {
				errors.email = 'Email is already in use';
				return res.status(400).json({ message: 'Email is already in use', devMsg: errors });
			}

			const { email, password, fullName, username } = req.body;

			const avatar = gravatar.url(email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'retro', // Default
			});

			const newUser = new User({
				username,
				fullName,
				email,
				avatar,
				password,
			});

			bcrypt.genSalt(10, (error, salt) => {
				if (error) throw error;

				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;

					newUser.password = hash;
					newUser
						.save()
						.then(savedUser => res.json(savedUser))
						.catch(err => res.json({ message: 'bcrypt error', devMsg: err }));
				});
			});
		})
		.catch(err => res.status(400).json({ message: 'Something bad happened. Please try again', devMsg: err }));
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

	// Find user by mail
	User.findOne({
		email,
	})
		.then(user => {
			// Check for user
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json({ message: 'User not found', devMsg: errors });
			}

			// Check password
			bcrypt.compare(password, user.password).then(isMatch => {
				if (!isMatch) {
					errors.password = 'Wrong credentials';
					return res.status(400).json({ message: 'Wrong credentials', devMsg: errors });
				}
				// Pass good, create JWT payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar,
				};

				// Sign token
				return jwt.sign(
					payload,
					config.secret,
					{
						expiresIn: 3600, // 1 hour
					},
					(err, token) =>
						res.json({
							success: true,
							token: `Bearer ${token}`,
						})
				);
			});
		})
		.catch(err => res.status(400).json({ message: 'Something bad happened. Please try again', devMsg: err }));
});

module.exports = router;
