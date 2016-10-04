import React from 'react';
import ReactDOM from 'react-dom';

class ListItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			item: props.item
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) { this.setState({ item: e.target.value }); }

	componentWillReceiveProps(nextProps) {

		this.setState({
			item: nextProps.item
		});

	}

	render() {
		return <li>{this.props.item}
			<input type="text" value={this.state.item} onChange={this.onChange} />
		</li>;
	}

}

class ListOfItems extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: props.items.concat()
		};

		setTimeout(() => {
			this.setState({ items: this.state.items.slice(1) }, () => {
				console.log('new state', JSON.stringify(this.state.items));
			});
			console.log('old state', JSON.stringify(this.state.items));
		}, 4000);
	}

	render() {
		return <ul>
			{this.state.items.map((item, index) => <ListItem item={item} />)}
		</ul>;
	}

}

ReactDOM.render(
	<ListOfItems items={['red','orange','yellow']} />,
	document.querySelector('main')
);