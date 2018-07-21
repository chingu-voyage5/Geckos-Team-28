import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route {...rest} component={props => (isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} />)} />
);

const mapStateToProps = state => ({
	// TBD
	isAuthenticated: state.auth.isAuthenticated,
});

PublicRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
	component: PropTypes.any,
};

export default connect(mapStateToProps)(PublicRoute);
