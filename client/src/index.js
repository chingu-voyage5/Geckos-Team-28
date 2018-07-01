import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';

import './styles/paper.min.css';
import './styles/App.css';

import configureStore from './Redux/configureStore';
import App from './components/App';
import { setAuthToken } from './helpers';
import { setCurrentUser, logoutUser, clearUser } from './Redux/actions/authActions';

const store = configureStore();

const Root = () => (
	<Provider store={store}>
		<App className="App" />
	</Provider>
);

// Check for token
if (localStorage.getItem('jwtToken')) {
	// Set Auth token
	setAuthToken(localStorage.getItem('jwtToken'));
	// Decode token and get user info and expiration
	const decoded = jwtDecode(localStorage.getItem('jwtToken'));
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user if token has expired
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(clearUser());
		// Redirect to login page
		window.location.href = '/';
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
