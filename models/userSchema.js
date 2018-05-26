const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const md5 = require('md5');

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

// // Create a virtual field for gravatar using MD5 hashing
// userSchema.virtual('gravatar').get(function() {
// 	const hash = md5(this.email);
// 	return `https://gravatar.com/avatar/${hash}?s=200`;
// });

// // Saves the user's password hashed (plain text password storage is not good)
// userSchema.pre('save', function(next) {
// 	var user = this;
// 	if (this.isModified('password') || this.isNew) {
// 		bcrypt.genSalt(10, function(err, salt) {
// 			if (err) {
// 				return next(err);
// 			}
// 			bcrypt.hash(user.password, salt, function(err, hash) {
// 				if (err) {
// 					return next(err);
// 				}
// 				user.password = hash;
// 				next();
// 			});
// 		});
// 	} else {
// 		return next();
// 	}
// });

// // Create method to compare password input to password saved in database
// userSchema.methods.comparePassword = function(pw, cb) {
// 	bcrypt.compare(pw, this.password, function(err, isMatch) {
// 		if (err) {
// 			return cb(err);
// 		}
// 		cb(null, isMatch);
// 	});
// };

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
