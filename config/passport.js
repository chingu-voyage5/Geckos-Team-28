var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const config = require('./main');

const User = mongoose.model('user');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

// Setup work and export for the JWT passport strategy
module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (!user) return done(null, false);

					return done(null, user);
				})
				.catch(err => console.log(err));
		})
	);
};
