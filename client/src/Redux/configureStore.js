// Store Creation
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
		/* preloadedState, */
		// window.__REDUX_DEVTOOLS_EXTENSION__ &&
		//     window.__REDUX_DEVTOOLS_EXTENSION__(),
	);
	return store;
};
