import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Nav = props => {
	return props.isAuthenticated ? (
		<nav className="border fixed split-nav nav background-primary">
			<div className="nav-brand">
				<h3>
					<NavLink to="/dashboard">Your Morning Routine</NavLink>
				</h3>
			</div>
			<div className="collapsible">
				<input id="collapsible1" type="checkbox" name="collapsible1" />
				<button>
					<label htmlFor="collapsible1">
						<div className="bar1" />
						<div className="bar2" />
						<div className="bar3" />
					</label>
				</button>
				<div className="collapsible-body">
					<ul className="inline">
						<li className="nav__item">
							<NavLink to="/journal">Journal</NavLink>
						</li>
						<li className="nav__item">
							<NavLink to="/about">About</NavLink>
						</li>
						<li className="nav__item">
							<a onClick={props.logout}>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	) : null;
};

Nav.propTypes = {
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

export default Nav;
