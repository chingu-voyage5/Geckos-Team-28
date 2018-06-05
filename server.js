//this is the server file//
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const config = require('./config/main');
const users = require('./routes/users');
const routines = require('./routes/routines');

const PORT = process.env.PORT || 5000;

const app = express();

/*********  Body-parser config  **********/
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Initialize passport
app.use(passport.initialize());

// Database Config
mongoose
	.connect(config.database)
	.then(() => console.log('MongoDB connected'))
	.catch(err => {
		throw new Error(err);
	});

// Bring in the passport strategy we defined
require('./config/passport')(passport);

/*********  Routes  **********/
// Append user routes from user.js to /api/users
app.use('/api/users/', users);

app.use('/api/routines/', routines);

// Test public route
app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

// Test Protect dashboard route
app.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.send(`It worked. Used id is ${req.user._id}, and your name is ${req.user.username}`);
});

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));

module.exports = app;
