import axios from 'axios';
import types from './types';

export const createActivity = (data, routine_id) => dispatch => {
	if (!data) return null;
	console.log(data, routine_id);
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
