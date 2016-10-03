import React from 'react';
import ReactDOM from 'react-dom';

class ListOfColors extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newColor: ''
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {

		return <div>
			<h1>List of Colors</h1>
			<ul>
				{this.props.colors.map(color => <li key={color}>{color}</li>)}
			</ul>

			<div>
				<label htmlFor="new-color">New Color:</label>
				<input type="text" id="new-color" name="newColor"
					value={this.state.newColor} onChange={this.onChange} />
			</div>

		</div>;
	}
}

ListOfColors.propTypes = {
	colors: React.PropTypes.array.isRequired
};

const colors = ['green','white','red','yellow','blue','orange','gold','saffron'];


ReactDOM.render(<ListOfColors colors={colors} />, document.querySelector('main'));