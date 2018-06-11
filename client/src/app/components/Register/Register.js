import React from 'react';
import './styles.css';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import axios from 'axios';

// these are props passed from withFormik
const Register = ({ values, errors, touched }) => (
	<Form>
		<div>{touched.email && errors.email && <p>{errors.email}</p>}</div>
		<Field type="email" name="email" placeholder="Email Address" />

		<div>{touched.emailConfirm && errors.emailConfirm && <p>{errors.emailConfirm}</p>}</div>
		<Field type="email" name="emailConfirm" placeholder="Confirm email" />

		<div>{touched.password && errors.password && <p>{errors.password}</p>}</div>
		<Field type="password" name="password" placeholder="Password" />

		<div>{touched.passwordConfirm && errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}</div>
		<Field type="password" name="passwordConfirm" placeholder="Confirm password" />

		<div>{touched.fullName && errors.fullName && <p>{errors.fullName}</p>}</div>
		<Field type="text" name="fullName" placeholder="Full name" />

		<div>{touched.username && errors.username && <p>{errors.username}</p>}</div>
		<Field type="text" name="username" placeholder="Username" />

		<button>Register</button>
	</Form>
);

// withFormik HOC
const FormikRegister = withFormik({
	mapPropsToValues({ email, emailConfirm, password, passwordConfirm, fullName, username }) {
		return {
			email: email || '',
			emailConfirm: emailConfirm || '',
			password: password || '',
			passwordConfirm: passwordConfirm || '',
			fullName: fullName || '',
			username: username || '',
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Email not valid')
			.required('Email is required'),
		emailConfirm: Yup.mixed().test('Match', 'Email addresses do not match', function() {
			return this.parent.emailConfirm === this.parent.email;
		}),
		password: Yup.string()
			.min(8, 'Password must be 8 characters or longer')
			.required('Password is required'),
		passwordConfirm: Yup.mixed().test('Match', 'Passwords do not match', function() {
			return this.parent.passwordConfirm === this.parent.password;
		}),
		fullName: Yup.string().required('Your name is required'),
		username: Yup.string().required('Your username is required'),
	}),

	handleSubmit(values, { resetForm, setSubmitting }) {
		const { email, emailConfirm, password, passwordConfirm, fullName, username } = values;

		console.log(password);
		axios
			.post('/api/users/register', { email, emailConfirm, password, passwordConfirm, fullName, username })
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				if (error.response.status === 400) {
					console.log(error.response.data);
				}
			});

		resetForm();
		setSubmitting(false);
	},
})(Register);

export default FormikRegister;
