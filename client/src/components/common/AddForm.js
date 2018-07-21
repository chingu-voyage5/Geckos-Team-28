import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createRoutine, updateRoutine } from '../../Redux/actions/routineActions';
import { createActivity } from '../../Redux/actions/activityActions';
import { CloseIcon } from '../../assets/CloseIcon';

class AddForm extends Component {
	state = {
		blockName: this.props.blockName || '',
		description: this.props.description || '',
		name: this.props.name || '',
		startTime: this.props.startTime || '',
		endTime: this.props.endTime || '',
		checked: this.props.checked || false,
	};

	onRoutineSubmit = e => {
		e.preventDefault();
		const { blockName, description } = this.state;
		const data = {
			blockName,
			description,
		};

		if (this.props.edit) {
			if (this.props.blockName === blockName && this.props.description === description) {
				this.props.closeCallback(e);
			}
			this.props.updateRoutine(data, this.props.routineId);
			this.props.closeCallback(e);
		} else {
			this.props.createRoutine(data);
			this.props.closeCallback(e);
		}
	};

	onActivitySubmit = e => {
		e.preventDefault();

		const { name, startTime, endTime, checked } = this.state;
		const { routineId, activityId } = this.props;

		const data = {
			name,
			startTime,
			endTime,
			checked,
		};

		if (this.props.edit) {
			this.props.updateActivity(routineId, activityId, data);
			this.props.closeCallback(e);
		} else {
			this.props.createActivity(data, routineId);
			this.props.closeCallback(e);
		}
	};

	onChange = e => {
		const { name, value } = e.target;
		console.log(value);
		this.setState({ [name]: value });
	};

	render() {
		return this.props.routine ? (
			<form onSubmit={this.onRoutineSubmit} className="add-form centered border border-success">
				<div onClick={this.props.closeCallback}>
					<CloseIcon size={25} styles="closeIco" />
				</div>
				<div className="row">
					<div className="col sm-10">
						<div className="form-group">
							<label htmlFor="routineName">Block Name</label>
							<input
								className="input-block"
								type="text"
								name="blockName"
								id="routineName"
								placeholder="Breakfast time"
								onChange={this.onChange}
								value={this.state.blockName}
							/>
						</div>
					</div>
					<div className="col sm-10">
						<div className="form-group">
							<label htmlFor="routineDescription">Description</label>
							<textarea
								className="input-block"
								name="description"
								type="text"
								rows="5"
								id="routineDescription"
								placeholder="Make yourself a breakfast and enjoy it"
								onChange={this.onChange}
								value={this.state.description}
							/>
						</div>
					</div>
				</div>
				<button type="submit">{this.props.edit ? 'Update' : 'Create'}</button>
			</form>
		) : (
			<form onSubmit={this.onActivitySubmit} className="add-form centered border border-success">
				<div onClick={this.props.closeCallback}>
					<CloseIcon size={25} styles="closeIco" />
				</div>
				<div className="row">
					<div className="col sm-8">
						<div className="form-group">
							<label htmlFor="activityName">Name</label>
							<input
								name="name"
								className="input-block"
								id="activityName"
								type="text"
								placeholder="My new activity"
								onChange={this.onChange}
								value={this.state.name}
							/>
						</div>
					</div>
					<div className="col sm-4">
						<div className="form-group">
							<label htmlFor="activityStart">Start Time</label>
							<input
								name="startTime"
								className="input-block input-time"
								type="time"
								id="activityStart"
								onChange={this.onChange}
								value={this.state.startTime}
							/>
						</div>
					</div>
					<div className="col sm-4">
						<div className="form-group">
							<label htmlFor="activityEnd">End Time</label>
							<input
								name="endTime"
								className="input-block input-time"
								type="time"
								id="activityEnd"
								onChange={this.onChange}
								value={this.state.endTime}
							/>
						</div>
					</div>
				</div>
				<button type="submit">{this.props.edit ? 'Update' : 'Create'}</button>
			</form>
		);
	}
}

AddForm.propTypes = {
	routine: PropTypes.bool,
	edit: PropTypes.bool,
	closeCallback: PropTypes.func,
	createRoutine: PropTypes.func,
	updateRoutine: PropTypes.func,
	routineId: PropTypes.string,
	createActivity: PropTypes.func,
	updateActivity: PropTypes.func,
	blockName: PropTypes.string,
	description: PropTypes.string,
	name: PropTypes.string,
	startTime: PropTypes.string,
	endTime: PropTypes.string,
	checked: PropTypes.bool,
	activityId: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
	createRoutine: data => dispatch(createRoutine(data)),
	createActivity: (data, id) => dispatch(createActivity(data, id)),
	updateRoutine: (data, id) => dispatch(updateRoutine(data, id)),
});

export default connect(
	null,
	mapDispatchToProps
)(AddForm);
