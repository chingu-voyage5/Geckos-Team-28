const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
	console.log(data);
	let errors = {};

	data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
	data.username = !isEmpty(data.username) ? data.username : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isLength(data.fullName, { min: 2, max: 30 })) {
		errors.fullName = 'Full Name must be between 2 and 30 characters!';
	}
	if (Validator.isEmpty(data.fullName)) {
		errors.fullName = 'Full Name field is required!';
	}

	if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
		errors.username = 'Username must be between 2 and 30 characters!';
	}
	if (Validator.isEmpty(data.username)) {
		errors.username = 'Username field is required!';
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required!';
	}

	if (Validator.isLength(data.password, { min: 8, max: 32 })) {
		errors.password = 'Password must be between 8 and 32 characters!';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords don't match";
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Confirm password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
