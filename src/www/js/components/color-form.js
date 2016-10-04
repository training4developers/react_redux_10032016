import React from 'react';
import { BaseComponent } from './base-component';

export class ColorForm extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			newColor: ''
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.addColor(this.state.newColor);
		this.setState({
			newColor: ''
		});
	}

	render() {

		return <div>
			<label htmlFor="new-color">New Color:</label>
			<input type="text" id="new-color" name="newColor"
				value={this.state.newColor} onChange={this.onChange} />
			<button type="button" onClick={this.onClick}>Add Color</button> 
		</div>;
	}
}
