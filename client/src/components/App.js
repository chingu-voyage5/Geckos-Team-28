import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../Redux/actions/authActions';
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
				<Nav isAuthenticated={props.isAuthenticated} logout={props.logout} />
				<Switch>
					<PublicRoute exact path="/" component={Landing} isAuthenticated={props.isAuthenticated} />
					<PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={props.isAuthenticated} />
					<PrivateRoute path="/journal" component={Journal} isAuthenticated={props.isAuthenticated} />
				</Switch>
			</React.Fragment>
		</Router>
	);
};

App.propTypes = {
	user: PropTypes.shape({}),
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutUser()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
