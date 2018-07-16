import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createRoutine } from '../../Redux/actions/routineActions';
import { createActivity } from '../../Redux/actions/activityActions';
import { CloseIcon } from '../../assets/CloseIcon';

class AddForm extends Component {
	state = {
		blockName: '',
		description: '',
		name: '',
		startTime: '',
		endTime: '',
	};

	onRoutineSubmit = e => {
		e.preventDefault();
		const { blockName, description } = this.state;
		const data = {
			blockName,
			description,
		};
		this.props.createRoutine(data);
		this.props.closeCallback(e);
	};

	onActivitySubmit = e => {
		e.preventDefault();

		const { name, startTime, endTime } = this.state;
		const { routineId } = this.props;

		const data = {
			name,
			startTime,
			endTime,
		};
		this.props.createActivity(data, routineId);
		this.props.closeCallback(e);
	};

	onChange = e => {
		const { name, value } = e.target;
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
							/>
						</div>
					</div>
					<div className="col sm-10">
						<div className="form-group">
							<label htmlFor="routineDescription">Description</label>
							<input
								className="input-block"
								name="description"
								type="text"
								id="routineDescription"
								placeholder="Make yourself a breakfast and enjoy it"
								onChange={this.onChange}
							/>
						</div>
					</div>
				</div>
				<button type="submit">Create</button>
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
							/>
						</div>
					</div>
				</div>
				<button type="submit">Create</button>
			</form>
		);
	}
}

AddForm.propTypes = {
	routine: PropTypes.bool,
	closeCallback: PropTypes.func,
	createRoutine: PropTypes.func,
	routineId: PropTypes.string,
	createActivity: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
	createRoutine: data => dispatch(createRoutine(data)),
	createActivity: (data, id) => dispatch(createActivity(data, id)),
});

export default connect(
	null,
	mapDispatchToProps
)(AddForm);
