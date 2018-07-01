import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Button = props => {
	const styles = ['button', props.customStyles];

	return (
		<a className={styles.join(' ')} onClick={props.handleClick}>
			{props.buttonText}
		</a>
	);
};

Button.propTypes = {
	to: PropTypes.string.isRequired,
	customStyles: PropTypes.string,
	buttonText: PropTypes.string.isRequired,
};

export default Button;
