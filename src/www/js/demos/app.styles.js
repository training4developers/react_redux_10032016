import React from 'react';
import ReactDOM from 'react-dom';

import '../css/styles.scss';

class StyleDemo extends React.Component {

	static defaultProps = {
		message: 'Default Message'
	}

	static propTypes = {
		message: React.PropTypes.string.isRequired
	}

	// static get propTypes() {
	// 	return {
	// 		message: React.PropTypes.string.isRequired
	// 	};
	// }

	render() {

		const bold = {fontWeight:'bold'};

		return <span style={bold} className='important'>{this.props.message}</span>;

	}

}

// StyleDemo.defaultProps = {
// 	message: 'Default Message'
// };

ReactDOM.render(<StyleDemo />, document.querySelector('main'));