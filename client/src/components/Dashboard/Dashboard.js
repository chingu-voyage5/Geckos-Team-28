import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import Clock from 'react-clock';

import { fetchRoutines } from '../../Redux/actions/routineActions';

import Routine from '../Routine/Routine';
import Portal from '../Portal/Portal';
import AddForm from '../common/AddForm';
import Info from '../common/Info';

export class Dashboard extends Component {
	static propTypes = {
		routinesData: PropTypes.shape({
			routines: PropTypes.arrayOf(PropTypes.object),
		}),
		fetchRoutines: PropTypes.func.isRequired,
	};

	state = {
		isPortalVisible: false,
		date: new Date(),
	};

	componentDidMount = () => {
		this.props.fetchRoutines();

		this.setTime();
	};

	componentWillUnmount = () => {
		clearInterval(this.setTime);
	};

	setTime = () => setInterval(() => this.setState({ date: new Date() }), 1000);

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false });
	};

	onPortalOpen = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: true });
	};

	onDateChange = date => this.setState({ date });

	render() {
		return (
			<main className="dashboard border border-4 border-primary">
				{this.state.isPortalVisible && (
					<Portal>
						<AddForm routine={true} closeCallback={this.onPortalClose} />
					</Portal>
				)}
				<header className="header">
					<h2 className="header__title h__mb--small">My Miracle Morning</h2>
				</header>
				<section className="routines border border-primary background-success">
					{this.props.routinesData.routines
						? this.props.routinesData.routines.map(routine => <Routine key={routine._id} routine={routine} />)
						: null}
					<div className="open-portal open-portal--dashboard" popover-right="Add new routine">
						<a className="paper-btn margin" onClick={this.onPortalOpen}>
							+
						</a>
					</div>
				</section>
				<aside className="calendar ">
					<Info name={this.props.user.name} imgSrc={this.props.user.avatar} />
					<Calendar onChange={this.onDateChange} value={this.state.date} />
				</aside>
				<aside className="clock border border-6 border-primary background-secondary">
					<Clock value={this.state.date} size={230} />
				</aside>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	routinesData: state.routines,
	user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
	fetchRoutines: userId => dispatch(fetchRoutines(userId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
