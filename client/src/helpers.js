import axios from 'axios';

export const setAuthToken = token => {
	// If no token delete it from header
	if (!token) return delete axios.defaults.headers.common['Authorization'];

	// Apply to every request
	axios.defaults.headers.common['Authorization'] = token;
};

export const isEmpty = obj =>
	obj === undefined ||
	obj === null ||
	(typeof obj === 'object' && Object.keys(obj).length === 0) ||
	(typeof obj === 'string' && obj.trim().length === 0);
