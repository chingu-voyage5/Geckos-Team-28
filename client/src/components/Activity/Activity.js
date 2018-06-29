import React from 'react';

const Activity = ({ activity }) => {
	return (
		<li className="activity">
			<input type="checkbox" name="" id="" />
			<span>7:00 AM - 9:00 AM</span>
			<span>{activity.name}</span>
		</li>
	);
};

export default Activity;
