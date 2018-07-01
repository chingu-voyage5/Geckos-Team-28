import React from 'react';

import { CloseIcon } from '../../assets/CloseIcon';

const AddForm = props => {
	return (
		<div className="add-form centered border border-success">
			<div onClick={props.closeCallback}>
				<CloseIcon size={25} styles="closeIco" />
			</div>
			<div className="form-group">
				<label htmlFor="paperInputs1">Input</label>
				<input type="text" placeholder="Nice input" id="paperInputs1" />
			</div>
			<div className="row">
				<div className="col sm-4">
					<div className="form-group">
						<label htmlFor="paperInputs2">Block Level</label>
						<input className="input-block" type="text" id="paperInputs2" />
					</div>
				</div>
				<div className="col sm-8">
					<div className="form-group">
						<label htmlFor="paperInputs3">Block Level</label>
						<input className="input-block" type="text" id="paperInputs3" />
					</div>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="paperInputs4">Disabled</label>
				<input type="text" placeholder="Disabled" id="paperInputs4" disabled />
			</div>
			<div className="form-group">
				<label>Large Input</label>
				<textarea placeholder="Large input" />
			</div>
			<div className="form-group">
				<label>No Resize</label>
				<textarea className="no-resize" placeholder="No resize" />
			</div>
			<fieldset className="form-group">
				<legend>Some Check Boxes</legend>
				<label htmlFor="paperChecks1" className="paper-check">
					<input type="checkbox" name="paperChecks" id="paperChecks1" value="option 1" />{' '}
					<span>This is the first check</span>
				</label>
				<label htmlFor="paperChecks2" className="paper-check">
					<input type="checkbox" name="paperChecks" id="paperChecks2" value="option 2" />{' '}
					<span>This is the second check</span>
				</label>
			</fieldset>
		</div>
	);
};

export default AddForm;
