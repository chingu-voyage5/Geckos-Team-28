import types from '../actions/types';
import { isEmpty } from '../../helpers';

const initialState = {
	isAuthenticated: false,
	user: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case types.CLEAR_USER:
			return { ...state, isLoading: false, profile: null };
		default:
			return state;
	}
};
