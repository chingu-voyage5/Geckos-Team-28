import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
	return <Route render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} {...rest} />;
};

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
	component: PropTypes.any,
};

const mapStateToProps = state => ({
	// TBD
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
