import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createRoutine } from '../../Redux/actions/routineActions';
import { CloseIcon } from '../../assets/CloseIcon';

class AddForm extends Component {
	state = {
		blockName: '',
		description: '',
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

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return this.props.routine ? (
			<form className="add-form centered border border-success">
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
				<button type="submit" onClick={this.onRoutineSubmit}>
					Create
				</button>
			</form>
		) : (
			<form className="add-form centered border border-success">
				<div onClick={this.props.closeCallback}>
					<CloseIcon size={25} styles="closeIco" />
				</div>
				<div className="row">
					<div className="col sm-8">
						<div className="form-group">
							<label htmlFor="activityName">Name</label>
							<input className="input-block" id="activityName" type="text" placeholder="My new activity" />
						</div>
					</div>
					<div className="col sm-4">
						<div className="form-group">
							<label htmlFor="activityStart">Start Time</label>
							<input className="input-block input-time" type="time" id="activityStart" />
						</div>
					</div>
					<div className="col sm-4">
						<div className="form-group">
							<label htmlFor="activityEnd">End Time</label>
							<input className="input-block input-time" type="time" id="activityEnd" />
						</div>
					</div>
				</div>
				<button>Create</button>
			</form>
		);
	}
}

AddForm.propTypes = {
	routine: PropTypes.bool,
	closeCallback: PropTypes.func,
	createRoutine: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
	createRoutine: data => dispatch(createRoutine(data)),
});

export default connect(
	null,
	mapDispatchToProps
)(AddForm);
