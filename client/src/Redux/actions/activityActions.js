import axios from 'axios';
import types from './types';

export const createActivity = (data, routine_id) => dispatch => {
	if (!data) return null;

	return axios
		.post(`api/routines/activity/${routine_id}`, data)
		.then(res =>
			dispatch({
				type: types.ADD_ACTIVITY_SUCCESS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			})
		);
};

export const deleteActivity = (routineId, activityId) => dispatch => {
	return axios
		.delete(`api/routines/activity/${routineId}/${activityId}`)
		.then(res =>
			dispatch({
				type: types.DELETE_ACTIVITY_SUCCESS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			})
		);
};

export const updateActivity = (routineId, activityId, data) => dispatch => {
	if (!data) return null;

	return axios
		.put(`api/routines/activity/${routineId}/${activityId}`, data)
		.then(res =>
			dispatch({
				type: types.UPDATE_ACTIVITY_SUCCESS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: types.GET_ERRORS,
				payload: err,
			})
		);
};
