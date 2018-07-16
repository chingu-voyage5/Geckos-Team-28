import axios from 'axios';
import types from './types';

export const fetchRoutines = userId => dispatch => {
	dispatch({ type: types.GET_ROUTINES });
	return axios
		.get('/api/routines/')
		.then(res => {
			console.log(res);
			dispatch({
				type: types.GET_ROUTINES_SUCCESS,
				payload: res.data,
			});
		})
		.catch(err => {
			console.log(err);
		});
};

export const createRoutine = data => dispatch => {
	if (!data) return null;
	console.log(data);
	return axios
		.post('api/routines', data)
		.then(res => console.log(res))
		.catch(err => {
			console.log(err);
		});
};
