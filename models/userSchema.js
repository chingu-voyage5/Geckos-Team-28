const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
fullName: {
	type:String,
	required: true,
	trim: true
},	
username: {
	type: String,
	required: true,
	trim: true,
	unique:true
},
email: {
	type: String,
	lowercase: true,
	trim: true,
	unique:true,
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
