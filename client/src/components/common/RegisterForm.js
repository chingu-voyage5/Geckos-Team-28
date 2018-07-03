import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

import { registerUser } from '../../Redux/actions/authActions';
import { CloseIcon } from '../../assets/CloseIcon';

const RegisterForm = ({ errors, touched, closeCallback }) => {
	return (
		// Add tabs?
		<Form className="add-form centered border border-success">
			<div onClick={closeCallback}>
				<CloseIcon size={25} styles="closeIco" />
			</div>

			<div className="row">
				<div className="col sm-8">
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<Field className="input-block" name="email" id="email" placeholder="Email" />
						<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
					</div>
				</div>

				<div className="col sm-8">
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<Field className="input-block" name="password" id="password" placeholder="Password" />
						<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>

						<label htmlFor="password2">Confirm Password</label>
						<Field className="input-block" id="password2" name="password2" placeholder="Confirm password" />
						<div>{touched.password2 && errors.password2 && <p>{errors.password2}</p>}</div>
					</div>
				</div>

				<div className="col sm-8">
					<div className="form-group">
						<label htmlFor="fullName">Your Name</label>
						<Field className="input-block" name="fullName" placeholder="Full name" id="fullName" />
						<div>{touched.fullName && errors.fullName && <p>{errors.fullName}</p>}</div>

						<label htmlFor="username">Your Username</label>
						<Field className="input-block" name="username" placeholder="Username" id="username" />
						<div>{touched.username && errors.username && <p>{errors.username}</p>}</div>
					</div>
				</div>
			</div>
			<button>Register</button>
		</Form>
	);
};

RegisterForm.propTypes = {
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
	closeCallback: PropTypes.func.isRequired,
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
})(RegisterForm);

const mapDispatchToProps = dispatch => ({
	registerUser: (userData, history) => dispatch(registerUser(userData, history)),
});

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(FormikRegister)
);
