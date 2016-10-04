import React from 'react';

export class ColorList extends React.Component {

	render() {
		return <div>
			<h1>List of Colors</h1>
			<ul>
				{this.props.colors.map(color => <li key={color}>{color}</li>)}
			</ul>
		</div>;
	}

}