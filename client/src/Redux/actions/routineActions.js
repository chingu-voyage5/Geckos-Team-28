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
	return axios
		.post('api/routines', data)
		.then(() =>
			dispatch({
				type: types.ADD_ROUTINE_SUCCESS,
				payload: data,
			})
		)
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			});
		});
};

export const deleteRoutine = id => dispatch => {
	return axios
		.delete(`/api/routines/${id}`)
		.then(res => console.log(res))
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			});
		});
};

export const updateRoutine = (id, data) => dispatch => {};
