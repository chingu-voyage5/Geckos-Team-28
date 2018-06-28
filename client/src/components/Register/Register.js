import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

import { registerUser } from '../../Redux/actions/authActions';

// these are props passed from withFormik
const Register = ({ errors, touched }) => (
	<Form>
		<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
		<Field type="email" name="email" placeholder="Email Address" />

		<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>
		<Field type="password" name="password" placeholder="Password" />

		<div>{touched.password2 && errors.password2 && <p>{errors.password2}</p>}</div>
		<Field type="password" name="password2" placeholder="Confirm password" />

		<div>{touched.fullName && errors.fullName && <p>{errors.fullName}</p>}</div>
		<Field type="text" name="fullName" placeholder="Full name" />

		<div>{touched.username && errors.username && <p>{errors.username}</p>}</div>
		<Field type="text" name="username" placeholder="Username" />

		<button>Register</button>
	</Form>
);

Register.propTypes = {
	errors: PropTypes.shape({
		email: PropTypes.string,
		password: PropTypes.string,
	}),
	touched: PropTypes.shape({
		email: PropTypes.bool,
		password: PropTypes.bool,
		password2: PropTypes.bool,
		fullName: PropTypes.bool,
		username: PropTypes.bool,
	}),
};

// withFormik HOC
const FormikRegister = withFormik({
	mapPropsToValues({ email, password, passwordConfirm, fullName, username }) {
		return {
			email: email || '',
			password: password || '',
			password2: passwordConfirm || '',
			fullName: fullName || '',
			username: username || '',
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Email not valid')
			.required('Email is required'),
		password: Yup.string()
			.min(8, 'Password must be 8 characters or longer')
			.required('Password is required'),
		password2: Yup.mixed().test('Match', 'Passwords do not match', function() {
			return this.parent.password2 === this.parent.password;
		}),
		fullName: Yup.string()
			.min(2, 'Password must be 2 characters or longer')
			.required('Your name is required'),
		username: Yup.string()
			.min(2, 'Password must be 2 characters or longer')
			.required('Your username is required'),
	}),
	handleSubmit(values, { props, resetForm, setSubmitting }) {
		props.registerUser(values, props.history);
		resetForm();
		setSubmitting(false);
	},
})(Register);

const mapDispatchToProps = dispatch => ({
	registerUser: (userData, history) => dispatch(registerUser(userData, history)),
});

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(FormikRegister)
);
