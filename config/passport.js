var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/userSchema');
var config = require('./main');

// Setup work and export for the JWT passport strategy
module.exports = passport => {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findOne({ id: jwt_payload.id }, (err, user) => {
				if (err) return done(err, false);
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			});
		})
	);
};
