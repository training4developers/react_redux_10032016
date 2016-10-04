import React from 'react';
import ReactDOM from 'react-dom';
import { BaseComponent } from './components/base-component';
import { ColorList } from './components/color-list';
import { ColorForm } from './components/color-form';

class ColorApp extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			colors: props.colors.concat()
		};

		this.addColor = this.addColor.bind(this);
	}

	addColor(newColor) {
		this.setState({
			colors: this.state.colors.concat(newColor)
		});
	}

	render() {

		return <div>
			<ColorList colors={this.state.colors} />
			<ColorForm addColor={this.addColor} />
		</div>;
	}
}

ColorApp.propTypes = {
	colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

const colors = ['brown','white','red','yellow','blue','orange','gold','saffron'];

ReactDOM.render(<ColorApp colors={colors} />, document.querySelector('main'));
