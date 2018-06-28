import React from 'react';

const Nav = () => {
	return (
		<nav className="nav">
			<span className="logo" />
			<ul className="nav__pages">
				<li className="nav__pages__item">Dashboard</li>
				<li className="nav__pages__item">My Journal</li>
				<li className="nav__pages__item">About</li>
				<li className="nav__pages__item">Blog</li>
				<li className="nav__pages__item">Contact Us</li>
			</ul>
			<ul className="nav__menu">
				<li className="nav__menu__item">Login</li>
				<li className="nav__menu__item">Register</li>
				<li className="nav__menu__item">Logout</li>
			</ul>
		</nav>
	);
};

export default Nav;
