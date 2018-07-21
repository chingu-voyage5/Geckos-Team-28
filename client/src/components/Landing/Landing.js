import React from 'react';

import Button from '../common/Button';
import Portal from '../Portal/Portal';
import LoginForm from '../common/LoginForm';
import RegisterForm from '../common/RegisterForm';

class Landing extends React.Component {
	state = {
		isPortalVisible: false,
		type: '',
	};

	onPortalClose = e => {
		e.preventDefault();
		this.setState({ isPortalVisible: false });
	};

	onPortalOpen = (e, type) => {
		e.preventDefault();
		this.setState({ isPortalVisible: true, type });
	};

	render() {
		return (
			<div className="landing">
				{this.state.isPortalVisible && (
					<Portal>
						{this.state.type === 'login' ? (
							<LoginForm closeCallback={this.onPortalClose} />
						) : (
							<RegisterForm closeCallback={this.onPortalClose} />
						)}
					</Portal>
				)}
				<div className="container">
					<h1 className="heading heading--primary landing__title">Your Morning Routine</h1>
					<h2 className="heading heading--tertiary landing__subtitle">
						Some people dream of success, while other people get up every morning and make it happen.
					</h2>
					<div className="cta h__mt--medium h__center-text">
						<Button
							handleClick={e => this.onPortalOpen(e, 'register')}
							buttonText="Learn More"
							customStyles="button--white button--animated"
						/>
						<Button
							handleClick={e => this.onPortalOpen(e, 'login')}
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
