const Validator = require('validator');

const isUsernameLengthValid = val => !Validator.isLength(val, { min: 2, max: 30 });
