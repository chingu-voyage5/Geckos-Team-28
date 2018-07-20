import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DeleteIcon } from '../../assets/DeleteIcon';
import { EditIcon } from '../../assets/EditIcon';
import Portal from '../Portal/Portal';
import AddForm from '../common/AddForm';

class Activity extends Component {
	static propTypes = {
		parentId: PropTypes.string.isRequired,
		activity: PropTypes.shape({
			_id: PropTypes.string.isRequired,
		}),
		deleteActivity: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		updateActivity: PropTypes.func,
	};

	state = {
		isPortalVisible: false,
	};

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false });
	};

	onClick = e => {
		e.preventDefault();
		e.stopPropagation();

		this.setState({ isPortalVisible: true });
	};

	onDeleteActivity = () => {
		const {
			parentId,
			activity: { _id },
		} = this.props;

		if (window.confirm('Are you sure you want to delete this activity?')) {
			return this.props.deleteActivity(parentId, _id);
		}
		return null;
	};

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const { index, activity, updateActivity, parentId } = this.props;

		return (
			<li className="activity">
				{this.state.isPortalVisible && (
					<Portal>
						<AddForm
							closeCallback={this.onPortalClose}
							activityId={activity._id}
							routineId={parentId}
							name={activity.name}
							startTime={activity.startTime}
							endTime={activity.endTime}
							updateActivity={updateActivity}
							edit
						/>
					</Portal>
				)}
				<fieldset className="form-group">
					<label htmlFor={`paperChecks${index}`} className="paper-check">
						<div>
							<input
								type="checkbox"
								name="checked"
								id={`paperChecks${index}`}
								onChange={this.onChange}
								value="option 1"
								checked={activity.checked}
							/>{' '}
							<span>{`${activity.startTime} - ${activity.endTime}`}</span>
							<span>{activity.name}</span>
						</div>
						<div className="activity__actions">
							<div onClick={this.onClick}>
								<EditIcon size="1.3rem" />
							</div>
							<div onClick={this.onDeleteActivity}>
								<DeleteIcon size="1.3rem" />
							</div>
						</div>
					</label>
				</fieldset>
			</li>
		);
	}
}

export default Activity;
