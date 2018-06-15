import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

const app = () => {
	return (
		<Router>
			<div>
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
			</div>
		</Router>
	);
};

export default app;
