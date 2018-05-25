//this is the server file//
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const users = require('./routes/users');

const app = express();

/*********  Body-parser config  **********/
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

// Database Config
const DB = require('./config/main').database;
mongoose
	.connect(DB)
	.then(() => console.log('MongoDB connected'))
	.catch(err => {
		throw new Error(err);
	});

/*********  Routes  **********/
app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.use('/api/users', users);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
