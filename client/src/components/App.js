import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import '../styles/App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import Landing from './Landing/Landing';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';

const Dashboard = () => <h1>Dashboard</h1>;
const Journal = () => <h1>Journal</h1>;

const App = () => {
	return (
		<Router>
			<Switch>
				<PublicRoute exact path="/" component={Landing} />
				<PublicRoute path="/register" component={Register} />
				<PublicRoute path="/login" component={Login} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/journal" component={Journal} />
			</Switch>
		</Router>
	);
};

export default App;
