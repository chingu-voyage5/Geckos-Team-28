const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.blockName = !isEmpty(data.blockName) ? data.blockName : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	if (!Validator.isLength(data.blockName, { min: 2, max: 30 })) {
		errors.blockName = 'Routine name must be between 2 and 30 characters!';
	}
	if (Validator.isEmpty(data.blockName)) {
		errors.blockName = 'Routine name field is required!';
	}

	if (!Validator.isLength(data.description, { min: 2, max: 30 })) {
		errors.description = 'Description must be between 2 and 30 characters!';
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required!';
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
