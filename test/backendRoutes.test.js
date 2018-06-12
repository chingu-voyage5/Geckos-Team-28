const chai = require('chai');
const expect = chai.expect;
const app = require('../server');
const request = require('supertest')(app);
const chaihttp = require('chai-http');
const Validator = require('validator');
chai.use(chaihttp);

describe('API /api/users/login', () => {
	it('Login route should expect email and password', done => {
		chai
			.request(app)
			.post('/api/users/login')
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.email).to.equal('Email field is required!');
				expect(res.body.password).to.equal('Password field is required');
				done();
			});
	});

	it('Login route should return status 400 without credentials', done => {
		chai
			.request(app)
			.post('/api/users/login')
			.end(function(err, res) {
				if (err) throw err;
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Wrong credentials for invalid password', function(done) {
		request
			.post('/api/users/login')
			.send({ password: '1234567', email: 'unit@testing.com' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.devMsg).to.have.property('password');
				expect(res.body.message).to.equal('Wrong credentials');
				expect(res).not.to.have.status(200);
				done();
			});
	});

	it('User not found for invalid username', function(done) {
		request
			.post('/api/users/login')
			.send({ password: '12345678', email: 'unittesting@abv.bg' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.message).to.equal('User not found');
				expect(res).not.to.have.status(200);
				done();
			});
	});

	it('Successful login', function(done) {
		request
			.post('/api/users/login')
			.send({ password: '12345678', email: 'unit@testing.com' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.success).to.equal(true);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Successful login should return a token', function(done) {
		request
			.post('/api/users/login')
			.send({ password: '12345678', email: 'unit@testing.com' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.token).to.be.a('string');
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('API /api/users/register', () => {
	it('Register route should expect fullName, username. email, password and password2,', done => {
		chai
			.request(app)
			.post('/api/users/register')
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.fullName).to.equal('Full Name field is required!');
				expect(res.body.username).to.equal('Username field is required!');
				expect(res.body.email).to.equal('Email field is required!');
				expect(res.body.password).to.equal('Password field is required');
				expect(res.body.password2).to.equal('Confirm password field is required');
				done();
			});
	});

	it('Username must be between 2 and 30 characters!', function(done) {
		request
			.post('/api/users/register')
			.send({ username: '.' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.username).to.equal('Username must be between 2 and 30 characters!');
				done();
			});
	});

	it('Username should be unique', function(done) {
		request
			.post('/api/users/register')
			.send({
				email: 'asd@abv.bg',
				fullName: 'testing',
				password: '12345678',
				password2: '12345678',
				username: 'Lubo',
			})
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.message).to.equal('Email is already in use');
				done();
			});
	});

	it('Password must be between 8 and 32 characters!', function(done) {
		request
			.post('/api/users/register')
			.send({ password: '12345', password2: '1234567' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.password).to.equal('Password must be between 8 and 32 characters!');
				done();
			});
	});

	it('Passwords should match', function(done) {
		request
			.post('/api/users/register')
			.send({ password: '12345678', password2: '123456789' })
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.password2).to.equal("Passwords don't match");
				done();
			});
	});

	it('Email should be valid', function(done) {
		request.post('/api/users/register').end(function(err) {
			if (err) throw err;
			expect(Validator.isEmail('12345678')).to.equal(false);
			done();
		});
	});

	it('Email should be unique', function(done) {
		request
			.post('/api/users/register')
			.send({
				email: 'asd@abv.bg',
				fullName: 'testing',
				password: '12345678',
				password2: '12345678',
				username: 'test123',
			})
			.end(function(err, res) {
				if (err) throw err;
				expect(res.body.message).to.equal('Email is already in use');
				done();
			});
	});
});
