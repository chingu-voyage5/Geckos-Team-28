import { Component } from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');
const body = document.getElementsByTagName('body')[0];

export default class Portal extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	constructor(props) {
		super(props);
		this.el = document.createElement('div');
		this.body = document.getElementsByTagName('body')[0];
	}

	componentDidMount() {
		portalRoot.appendChild(this.el);
		this.body.classList.add('portal-open');
	}

	componentWillUnmount() {
		portalRoot.removeChild(this.el);
		this.body.classList.remove('portal-open');
	}

	render() {
		const { children } = this.props;
		return ReactDOM.createPortal(children, this.el);
	}
}
