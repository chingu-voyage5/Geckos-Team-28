import React from 'react';
import PropTypes from 'prop-types';

import Activity from '../Activity/Activity';
import Input from '../common/Input';
import InputButton from '../common/InputButton';
import TimePicker from '../TimePicker/TimePicker';

const Routine = props => {
	return (
		<div className="routine">
			<h4 className="routine__title">Just a title</h4>
			<div className="activities">
				<div className="activities__box">
					<Activity />
					<Activity />
					<Activity />
					<Activity />
					<Activity />
				</div>
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
