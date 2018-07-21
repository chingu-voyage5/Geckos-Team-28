import React from 'react';

const Info = props => {
	return (
		<div className="info">
			<img src={props.imgSrc} alt="User avatar" />
			<p>Welcome back {props.name}</p>
		</div>
	);
};

export default Info;
