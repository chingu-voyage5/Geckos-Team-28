import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Dashboard extends Component {
	static propTypes = {};

	render() {
		return (
			<main className="dashboard">
				<header className="header">
					<h2 className="header__title">My Miracle Morning</h2>
				</header>
				<section className="routines">
					<div />
				</section>
				<aside className="calendar">
					<p>Calendar placeholder</p>
				</aside>
				<aside className="clock">
					<p>Clock placeholder</p>
				</aside>
			</main>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
