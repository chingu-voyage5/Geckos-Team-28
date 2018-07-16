import React from 'react';
import PropTypes from 'prop-types';

import Activity from '../Activity/Activity';

import Portal from '../Portal/Portal';
import AddForm from '../common/AddForm';

class Routine extends React.Component {
	editRoutineRef = React.createRef();
	deleteRoutineRef = React.createRef();
	state = {
		isPortalVisible: false,
	};

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false });
	};

	onPortalOpen = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: true });
	};

	onMouseEnterHandler = () => {
		this.editRoutineRef.current.classList.remove('hide');
		this.deleteRoutineRef.current.classList.remove('hide');
	};
	onMouseLeaveHandler = () => {
		this.editRoutineRef.current.classList.add('hide');
		this.deleteRoutineRef.current.classList.add('hide');
	};

	render() {
		const { routine } = this.props;

		return (
			<div className="routine">
				{this.state.isPortalVisible && (
					<Portal>
						<AddForm closeCallback={this.onPortalClose} routineId={routine._id} />
					</Portal>
				)}
				<div className="routine__info">
					<span className="routine__name">{routine.blockName}</span>
					{' - '}
					<span className="routine__description">{routine.description}</span>
				</div>
				<div className="activities border border-6 border-primary shadow shadow-hover background-secondary">
					<ul className="activities__box">
						{routine.activities
							? routine.activities.map((activity, index) => (
									<Activity key={activity._id} index={index} activity={activity} />
							  ))
							: null}
					</ul>
					<div className="open-portal" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
						<a
							className="paper-btn hide"
							ref={this.editRoutineRef}
							onClick={this.onPortalOpen}
							popover-right="Edit routine"
						>
							☑
						</a>
						<a
							className="paper-btn hide"
							ref={this.deleteRoutineRef}
							onClick={this.onPortalOpen}
							popover-right="Delete Routine"
						>
							☒
						</a>
						<a className="paper-btn" onClick={this.onPortalOpen} popover-right="Add new activity">
							+
						</a>
					</div>
				</div>
			</div>
		);
	}
}

Routine.propTypes = {
	routine: PropTypes.shape({
		activities: PropTypes.array,
	}),
};

export default Routine;
