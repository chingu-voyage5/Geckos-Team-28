import React from 'react';
import PropTypes from 'prop-types';

import Activity from '../Activity/Activity';
import Input from '../common/Input';
import InputButton from '../common/InputButton';
import TimePicker from '../TimePicker/TimePicker';

const Routine = ({ routine }) => {
	return (
		<div className="routine">
			<div>
				<span className="routine__name">{routine.blockName}</span>
				{' - '}
				<span className="routine__description">{routine.description}</span>
			</div>
			<div className="activities">
				<ul className="activities__box">
					{routine.activities
						? routine.activities.map(activity => <Activity key={activity._id} activity={activity} />)
						: null}
				</ul>
				<div className="activities__add">
					<Input />
					<TimePicker />
					<TimePicker />
					<InputButton />
				</div>
			</div>
		</div>
	);
};

Routine.propTypes = {};

export default Routine;
