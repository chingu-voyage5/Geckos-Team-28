import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
	const styles = ['button', props.customStyles];

	return (
		<a className={styles.join(' ')} onClick={props.handleClick}>
			{props.buttonText}
		</a>
	);
};

Button.propTypes = {
	customStyles: PropTypes.string,
	buttonText: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
};

export default Button;
