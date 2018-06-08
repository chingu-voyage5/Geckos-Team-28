import React from 'react';
import './styles.css';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import axios from 'axios';

// these are props passed from withFormik
const Register = ({ values, errors, touched }) => (
	<Form>
		<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
		<Field type="email" name="email" placeholder="Email" />

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

// withFormik HOC
const FormikRegister = withFormik({
	mapPropsToValues({ email, password, password2, fullName, username }) {
		return {
			email: email || '',
			password: password || '',
			password2: password2 || '',
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
		password2: Yup.string()
			.min(8, 'Password must be 8 characters or longer')
			.required('Password is required'),
		fullName: Yup.string().required('Your name is required'),
		username: Yup.string().required('Your username is required'),
	}),

	handleSubmit(values, { resetForm, setSubmitting }) {
		const { email, password, password2, fullName, username } = values;

		axios
			.post('/api/users/register', { email, password, password2, fullName, username })
			.then(result => {
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
})(Register);

export default FormikRegister;
