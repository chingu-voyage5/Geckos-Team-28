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
