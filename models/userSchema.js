const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defines how the user's data will be stored in MongoDB
const userSchema = new Schema({
	fullName: {
		type: String,
		required: true,
		trim: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
