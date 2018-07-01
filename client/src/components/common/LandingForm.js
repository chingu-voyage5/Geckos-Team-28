import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import Yup from 'yup';

import { loginUser } from '../../Redux/actions/authActions';
import { CloseIcon } from '../../assets/CloseIcon';

const LandingForm = ({ errors, touched, closeCallback }) => {
	return (
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
						<label htmlFor="pass">Password</label>
						<Field className="input-block" name="password" id="pass" placeholder="Password" />
						<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>
					</div>
				</div>
			</div>
			<button>Login</button>
		</Form>
	);
};

LandingForm.propTypes = {
	errors: PropTypes.shape({
		email: PropTypes.string,
		password: PropTypes.string,
	}),
	touched: PropTypes.shape({
		email: PropTypes.bool,
		password: PropTypes.bool,
	}),
	closeCallback: PropTypes.func,
};

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
})(LandingForm);

const mapDispatchToProps = dispatch => ({
	loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(
	null,
	mapDispatchToProps
)(FormikLogin);
