import types from '../actions/types';

const initialState = {
	routines: [],
	isLoading: false,
	error: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ROUTINES:
			return { ...state, isLoading: true };
		case types.GET_ROUTINES_SUCCESS:
			return { ...state, isLoading: false, routines: action.payload };
		case types.ADD_ROUTINE_SUCCESS:
			return { ...state, isLoading: false, routines: [...state.routines, action.payload] };
		case types.UPDATE_ROUTINE_SUCCESS: {
			const routines = state.routines.filter(routine => routine._id !== action.payload._id);
			return { ...state, isLoading: false, routines: [...routines, action.payload] };
		}
		case types.ADD_ACTIVITY_SUCCESS: {
			const routines = state.routines.filter(routine => routine._id !== action.payload._id);
			return { ...state, isLoading: false, routines: [...routines, action.payload] };
		}
		case types.UPDATE_ACTIVITY_SUCCESS: {
			const routines = state.routines.filter(routine => routine._id !== action.payload._id);
			return { ...state, isLoading: false, routines: [...routines, action.payload] };
		}
		case types.DELETE_ACTIVITY_SUCCESS:
			return { ...state, isLoading: false, routines: action.payload };
		case types.DELETE_ROUTINE_SUCCESS: {
			const routines = state.routines.filter(routine => routine._id !== action.payload);
			return { ...state, isLoading: false, routines: [...routines] };
		}
		case types.GET_ERRORS:
			return { ...state, isLoading: false, error: action.payload };
		case types.CLEAR_ERRORS:
			return { ...state, error: '' };
		default:
			return state;
	}
};
