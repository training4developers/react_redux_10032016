import React from 'react';
import ReactDOM from 'react-dom';
import { BaseComponent } from './components/base-component';
import { ColorList } from './components/color-list';
import { ColorForm } from './components/color-form';

class ListItem extends BaseComponent {

	constructor(props) {
		
		super(props);
		
		this.state = {
			item: props.item
		};
	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			item: nextProps.item
		});

	}

	render() {

		return <li>
			<input type="text" name="item" value={this.state.item} onChange={this.onChange} />
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

			this.setState({
				items: this.state.items.slice(1)
			});

		}, 2000);

	}

	render() {

		return <ul>
			{this.state.items.map((item, index) => <ListItem item={item}>{item}</ListItem>)}
		</ul>;

	}
}


// class ColorApp extends BaseComponent {

// 	constructor(props) {
// 		super(props);

// 		// this.state = {
// 		// 	colors: props.colors.concat()
// 		// };

// 		// this.addColor = this.addColor.bind(this);
// 	}

// 	// addColor(newColor) {
// 	// 	this.setState({
// 	// 		colors: this.state.colors.concat(newColor)
// 	// 	});
// 	// }

// 	render() {

// 		// return <div>
// 		// 	<ColorList colors={this.state.colors} />
// 		// 	<ColorForm addColor={this.addColor} />
// 		// </div>;
// 		return <h1>Hello World!</h1>;
// 	}
// }

// ColorApp.propTypes = {
// 	//colors: React.PropTypes.array.isRequired
// 	colors: React.PropTypes.arrayOf(React.PropTypes.number),
// 	point: React.PropTypes.shape({
// 		x: React.PropTypes.number,
// 		y: React.PropTypes.number
// 	})
// };

// const colors = ['brown','white','red','yellow','blue','orange','gold','saffron'];


// ReactDOM.render(<ColorApp colors={colors} point={({ x: '1', y: '2' })} />, document.querySelector('main'));

ReactDOM.render(<ListOfItems items={['red','blue','yellow']} />, document.querySelector('main'));