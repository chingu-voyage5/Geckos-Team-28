import React from 'react';

const TimePicker = () => {
	return (
		<div>
			<input type="time" id="appt-time" name="appt-time" min="00:00" max="12:00" required />
		</div>
	);
};

export default TimePicker;
