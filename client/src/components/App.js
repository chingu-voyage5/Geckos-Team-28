import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login/Login';
import Register from './Register/Register';
import Landing from './Landing/Landing';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';
import Dashboard from './Dashboard/Dashboard';
import Nav from './Nav/Nav';

const Journal = () => <h1>Journal</h1>;

const App = props => {
	return (
		<Router>
			<React.Fragment>
				<Nav isAuthenticated={props.isAuthenticated} />
				<Switch>
					<PublicRoute exact path="/" component={Landing} isAuthenticated={props.isAuthenticated} />
					<PublicRoute path="/register" component={Register} isAuthenticated={props.isAuthenticated} />
					<PublicRoute path="/login" component={Login} isAuthenticated={props.isAuthenticated} />
					<PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={props.isAuthenticated} />
					<PrivateRoute path="/journal" component={Journal} isAuthenticated={props.isAuthenticated} />
				</Switch>
			</React.Fragment>
		</Router>
	);
};

App.propTypes = {
	user: PropTypes.shape({}),
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

// const mapDispatchToProps = dispatch => ({
// 	fetchRoutines: userId => dispatch(fetchRoutines(userId)),
// });

export default connect(mapStateToProps)(App);
