import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Activity from '../Activity/Activity';

import Portal from '../Portal/Portal';
import AddForm from '../common/AddForm';
import { deleteRoutine } from '../../Redux/actions/routineActions';
import { updateActivity, deleteActivity } from '../../Redux/actions/activityActions';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { EditIcon } from '../../assets/EditIcon';

class Routine extends React.Component {
	editRoutineRef = React.createRef();
	deleteRoutineRef = React.createRef();
	state = {
		isPortalVisible: false,
		isEditPortalVisible: false,
	};

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false, isEditPortalVisible: false });
	};

	onPortalOpen = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: true });
	};

	onEditPortalOpen = e => {
		e.preventDefault();
		this.setState({ isEditPortalVisible: true });
	};

	onRoutineDelete = () => {
		if (window.confirm('Are you sure you want to delete this routine? This cannot be reverted!')) {
			this.props.deleteRoutine(this.props.routine._id);
		} else {
			return null;
		}
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

		const sort = arr =>
			arr.concat().sort((a, b) => {
				if (a.startTime < b.startTime) {
					return -1;
				}
				if (a.startTime > b.startTime) {
					return 1;
				}
				return 0;
			});

		return (
			<div className="routine">
				{this.state.isPortalVisible && (
					<Portal>
						<AddForm closeCallback={this.onPortalClose} routineId={routine._id} />
					</Portal>
				)}
				{this.state.isEditPortalVisible && (
					<Portal>
						<AddForm
							closeCallback={this.onPortalClose}
							routineId={routine._id}
							routine
							edit
							blockName={routine.blockName}
							description={routine.description}
						/>
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
							? sort(routine.activities).map((activity, index) => (
									<Activity
										key={activity._id}
										index={index}
										activity={activity}
										parentId={routine._id}
										updateActivity={this.props.updateActivity}
										deleteActivity={this.props.deleteActivity}
									/>
							  ))
							: null}
					</ul>
					<div className="open-portal" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
						<a
							className="paper-btn hide"
							ref={this.editRoutineRef}
							onClick={this.onEditPortalOpen}
							popover-right="Edit routine"
						>
							<EditIcon size="1.3rem" />
						</a>
						<a className="paper-btn" onClick={this.onPortalOpen} popover-right="Add new activity">
							+
						</a>
						<a
							className="paper-btn hide"
							ref={this.deleteRoutineRef}
							onClick={this.onRoutineDelete}
							popover-right="Delete Routine"
						>
							<DeleteIcon size="1.3rem" />
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
		_id: PropTypes.string,
	}),
	deleteRoutine: PropTypes.func.isRequired,
	updateActivity: PropTypes.func.isRequired,
	deleteActivity: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	deleteRoutine: id => dispatch(deleteRoutine(id)),
	updateActivity: (routineId, activityId, data) => dispatch(updateActivity(routineId, activityId, data)),
	deleteActivity: (routineId, activityId) => dispatch(deleteActivity(routineId, activityId)),
});

export default connect(
	null,
	mapDispatchToProps
)(Routine);
