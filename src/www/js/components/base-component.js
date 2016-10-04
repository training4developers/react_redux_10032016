import React from 'react';

export class BaseComponent extends React.Component {

	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {

		const newState = {};

		switch (e.target.type) {
			case 'number':
				newState[e.target.name] = parseInt(e.target.value,10);
				break;
			case 'checkbox':
				newState[e.target.name] = e.target.checked;
				break;
			default:
				if (e.target.multiple) {
					newState[e.target.name] = Array.from(e.target.options)
						.filter(option => option.selected)
						.map(option => option.value);
				} else {
					newState[e.target.name] = e.target.value;
				}
				break;
		}

		this.setState(newState);
	}

}