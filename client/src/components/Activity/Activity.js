import React from 'react';

const Activity = ({ activity }) => {
	return (
		<li className="activity">
			<fieldset className="form-group">
				<label htmlFor="paperChecks1" className="paper-check">
					<input type="checkbox" name="paperChecks" id="paperChecks1" value="option 1" /> <span>7:00 AM - 9:00 AM</span>
					<span>{activity.name}</span>
				</label>
			</fieldset>
		</li>
	);
};

export default Activity;
