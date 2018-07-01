import React from 'react';

import Button from '../common/Button';

import Portal from '../Portal/Portal';
import LandingForm from '../common/LandingForm';

class Landing extends React.Component {
	state = {
		isPortalVisible: false,
	};

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false });
	};

	onPortalOpen = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: true });
	};

	render() {
		return (
			<div className="landing">
				{this.state.isPortalVisible && (
					<Portal>
						<LandingForm closeCallback={this.onPortalClose} />
					</Portal>
				)}
				<div className="container">
					<h1 className="heading heading--primary landing__title">Your Morning Routine</h1>
					<h2 className="heading heading--tertiary landing__subtitle">
						Some people dream of success, while other people get up every morning and make it happen.
					</h2>
					<div className="cta h__mt--medium h__center-text">
						<Button
							handleClick={this.onPortalOpen}
							buttonText="Learn More"
							customStyles="button--white button--animated"
						/>
						<Button
							handleClick={this.onPortalOpen}
							buttonText="Sign In"
							customStyles="button--primary button--animated"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
