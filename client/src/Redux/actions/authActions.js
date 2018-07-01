import axios from 'axios';
import jwtDecode from 'jwt-decode';

import types from './types';
import { setAuthToken } from '../../helpers';

export const clearUser = () => ({
	type: types.CLEAR_USER,
});

export const registerUser = (userData, redirect) => dispatch =>
	axios
		.post('/api/users/register', userData)
		.then(() => redirect.push('/'))
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data,
			});
			dispatch({
				type: types.CLEAR_ERRORS,
			});
		});

export const setCurrentUser = decodedUser => ({
	type: types.SET_CURRENT_USER,
	payload: decodedUser,
});

// Login - Get User Token
export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			// Save to localStorage
			const { token } = res.data;
			// Set token to ls
			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwtDecode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
			dispatch({
				type: types.CLEAR_ERRORS,
			});
		})
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	dispatch(clearUser());
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
