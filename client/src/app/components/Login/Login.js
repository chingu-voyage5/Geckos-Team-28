import React from 'react';
import './styles.css';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import axios from 'axios';

// these are props passed from withFormik
const Login = ({ values, errors, touched }) => (
	<Form>
		<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
		<Field type="email" name="email" placeholder="Email" />

		<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>
		<Field type="password" name="password" placeholder="Password" />

		<button>Login</button>
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
			.min(8, 'Password must be 8 characters or longer')
			.required('Password is required'),
	}),

	handleSubmit(values, { resetForm, setSubmitting }) {
		const { email, password } = values;

		axios
			.post('/api/users/login', { email, password })
			.then(result => {
				localStorage.setItem('jwtToken', result.data.token);
				console.log(result);
			})
			.catch(error => {
				if (error.response.status === 400) {
					console.log(error);
				}
			});

		resetForm();
		setSubmitting(false);
	},
})(Login);

export default FormikLogin;
