import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const app = () => {
	return (
		<Router>
			<div>
				<Route path="/register" component={RegisterPage} />
				<Route path="/login" component={LoginPage} />
			</div>
		</Router>
	);
};

export default app;
