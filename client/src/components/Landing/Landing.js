import React from 'react';

import Button from '../common/Button';

const Landing = () => {
	return (
		<div className="landing">
			<div className="container">
				<h1 className="heading heading--primary landing__title">Your Morning Routine</h1>
				<h2 className="heading heading--tertiary landing__subtitle">
					Some people dream of success, while other people get up every morning and make it happen.
				</h2>
				<div className="cta h__mt--medium h__center-text">
					<Button to="/register" buttonText="Learn More" customStyles="button--white button--animated" />
					<Button to="/login" buttonText="Sign In" customStyles="button--primary button--animated" />
				</div>
			</div>
		</div>
	);
};

export default Landing;
