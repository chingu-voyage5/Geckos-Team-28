const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name: {
	type:String,
	required: true,
	trim: true
},
surname: {
	type:String,
	required: true,
	trim: true
},	
username: {
	type: String,
	required: true,
	trim: true
},
email: {
	type: String,
	lowercase: true,
	trim: true,
	validate: [validator.isEmail, 'Invalid Email Address'],
	required: 'Please add your email address'
},
password: {
	type: String,
	required: true,
},
date: {
	type: Date,
	required: true,
	default: Date.now(),
},       
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;