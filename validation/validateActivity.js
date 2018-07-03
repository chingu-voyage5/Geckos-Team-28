const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.startTime = !isEmpty(data.startTime) ? data.startTime : '';

	if (!Validator.isLength(data.name, { min: 2, max: 80 })) {
		errors.name = 'Name must be between 2 and 80 characters!';
	}
	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required!';
	}

	if (!Validator.isLength(data.startTime, { min: 2, max: 30 })) {
		errors.startTime = 'startTime must be between 2 and 30 characters!';
	}
	if (Validator.isEmpty(data.startTime)) {
		errors.startTime = 'Start time field is required!';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
