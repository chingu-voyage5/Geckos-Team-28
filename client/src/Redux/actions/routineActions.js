import axios from 'axios';
import types from './types';

export const fetchRoutines = userId => dispatch => {
	dispatch({ type: types.GET_ROUTINES });
	return axios
		.get('/api/routines/')
		.then(res => {
			dispatch({
				type: types.GET_ROUTINES_SUCCESS,
				payload: res.data,
			});
		})
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			});
		});
};

export const createRoutine = data => dispatch => {
	if (!data) return null;
	return axios
		.post('api/routines', data)
		.then(res =>
			dispatch({
				type: types.ADD_ROUTINE_SUCCESS,
				payload: res.data,
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
		.then(() =>
			dispatch({
				type: types.DELETE_ROUTINE_SUCCESS,
				payload: id,
			})
		)
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			});
		});
};

export const updateRoutine = (data, id) => dispatch => {
	return axios
		.put(`api/routines/${id}`, data)
		.then(res =>
			dispatch({
				type: types.UPDATE_ROUTINE_SUCCESS,
				payload: res.data,
			})
		)
		.catch(err => {
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			});
		});
};
