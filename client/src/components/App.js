import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import Landing from './Landing/Landing';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';

const Dashboard = () => <h1>Dashboard</h1>;
const Journal = () => <h1>Journal</h1>;

const App = props => {
	return (
		<Router>
			<Switch>
				<PublicRoute exact path="/" component={Landing} isAuthenticated={props.isAuthenticated} />
				<PublicRoute path="/register" component={Register} isAuthenticated={props.isAuthenticated} />
				<PublicRoute path="/login" component={Login} isAuthenticated={props.isAuthenticated} />
				<PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={props.isAuthenticated} />
				<PrivateRoute path="/journal" component={Journal} isAuthenticated={props.isAuthenticated} />
			</Switch>
		</Router>
	);
};

App.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
