import React from 'react';
import './styles.css';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';

// these are props passed from withFormik
const Login = ({ values, errors, touched }) => (
	<Form>
		<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
		<Field type="email" name="email" placeholder="Email" />

		<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>
		<Field type="password" name="password" placeholder="Password" />

		<button>Go</button>
	</Form>
);

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
		password: Yup.string()
			.min(9, 'Password must be 9 characters or longer')
			.required('Password is required'),
	}),
	handleSubmit(values, { resetForm, setSubmitting }) {
		console.log(values);
		alert('Values outputed to Console');
		resetForm();
		setSubmitting(false);
	},
})(Login);

export default FormikLogin;
