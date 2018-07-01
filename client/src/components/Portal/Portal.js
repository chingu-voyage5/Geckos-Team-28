import { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

export default class Portal extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	constructor(props) {
		super(props);
		this.el = document.createElement('div');
	}

	componentDidMount() {
		portalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		portalRoot.removeChild(this.el);
	}

	render() {
		const { children } = this.props;
		return ReactDOM.createPortal(children, this.el);
	}
}
