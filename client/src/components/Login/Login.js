import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import Yup from 'yup';

import { loginUser } from '../../Redux/actions/authActions';

// these are props passed from withFormik
const Login = ({ errors, touched }) => (
	<Form>
		<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
		<Field type="email" name="email" placeholder="Email" />

		<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>
		<Field type="password" name="password" placeholder="Password" />
		<button>Login</button>
	</Form>
);

Login.propTypes = {
	errors: PropTypes.shape({
		email: PropTypes.string,
		password: PropTypes.string,
	}),
	touched: PropTypes.shape({
		email: PropTypes.bool,
		password: PropTypes.bool,
	}),
};

// withFormik HOC
const FormikLogin = withFormik({
	mapPropsToValues({ email, password }) {
		return {
			email: email || '',
			password: password || '',
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Email not valid')
			.required('Email is required'),
		password: Yup.string().required('Password is required'),
	}),
	handleSubmit(values, { props, resetForm, setSubmitting }) {
		props.loginUser(values);
		resetForm();
		setSubmitting(false);
	},
})(Login);

const mapDispatchToProps = dispatch => ({
	loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(
	null,
	mapDispatchToProps
)(FormikLogin);
