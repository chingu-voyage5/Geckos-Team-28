import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchRoutines } from '../../Redux/actions/routineActions';

import Routine from '../Routine/Routine';
import Portal from '../Portal/Portal';
import AddForm from '../common/AddForm';

export class Dashboard extends Component {
	static propTypes = {
		routinesData: PropTypes.shape({
			routines: PropTypes.arrayOf(PropTypes.object),
		}),
		fetchRoutines: PropTypes.func.isRequired,
	};

	state = {
		isPortalVisible: false,
	};

	componentDidMount = () => {
		this.props.fetchRoutines();
	};

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false });
	};

	onPortalOpen = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: true });
	};

	render() {
		return (
			<main className="dashboard border border-4 border-primary">
				{this.state.isPortalVisible && (
					<Portal>
						<AddForm routine={true} closeCallback={this.onPortalClose} />
					</Portal>
				)}
				<header className="header">
					<h2 className="header__title">My Miracle Morning</h2>
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
				<aside className="calendar border border-6 border-primary background-secondary">
					<p>Calendar placeholder</p>
				</aside>
				<aside className="clock border border-6 border-primary background-secondary">
					<p>Clock placeholder</p>
				</aside>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	routinesData: state.routines,
});

const mapDispatchToProps = dispatch => ({
	fetchRoutines: userId => dispatch(fetchRoutines(userId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
