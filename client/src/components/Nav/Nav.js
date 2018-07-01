import React from 'react';

const Nav = () => {
	return (
		<nav className="border fixed split-nav nav background-primary">
			<div className="nav-brand">
				<h3>
					<a href="#">Your Morning Routine</a>
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
							<a href="#">Journal</a>
						</li>
						<li className="nav__item">
							<a href="#">About</a>
						</li>
						<li className="nav__item">
							<a href="#">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
