import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../assets/CloseIcon';

const AddForm = props => {
	return props.routine ? (
		<div className="add-form centered border border-success">
			<div onClick={props.closeCallback}>
				<CloseIcon size={25} styles="closeIco" />
			</div>
			<div className="row">
				<div className="col sm-10">
					<div className="form-group">
						<label htmlFor="routineName">Block Name</label>
						<input className="input-block" type="text" id="routineName" placeholder="Breakfast time" />
					</div>
				</div>
				<div className="col sm-10">
					<div className="form-group">
						<label htmlFor="routineDescription">Description</label>
						<input
							className="input-block"
							type="text"
							id="routineDescription"
							placeholder="Make yourself a breakfast and enjoy it"
						/>
					</div>
				</div>
			</div>
			<button onClick={() => {}}>Create</button>
		</div>
	) : (
		<div className="add-form centered border border-success">
			<div onClick={props.closeCallback}>
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
		</div>
	);
};

AddForm.propTypes = {
	routine: PropTypes.bool,
	closeCallback: PropTypes.func,
};

export default AddForm;
