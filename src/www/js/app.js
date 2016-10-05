import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';

const cars = [
	{ id: 1, make: 'Ford', model:'F-150', year:2016, color: 'red' },
	{ id: 2, make: 'Ford', model:'F-250', year:2016, color: 'blue' }
];

let carLastId = 2;

const addCarActionCreator = (car) => {

	return { type: 'addcar', car: Object.assign(car, { id: ++carLastId }) };

};

const reducer = (state = { cars: [], sortField: '' }, action) => {

	console.log(state);

	switch(action.type) {
		case 'addcar':
			return Object.assign({}, state, { cars: state.cars.concat(action.car)});
		case 'sortcars':
			return Object.assign({}, state, { sortField: action.sortField });	
		default:
			return state;
	}

};

class CarTable extends React.Component {

	render() {

		return <table>
			<thead>
				<tr>
					<th>Make</th>
					<th>Model</th>
					<th>Year</th>
					<th>Color</th>
				</tr>
			</thead>
			<tbody>
				{this.props.cars.map(car => <tr key={car.id}>
					<td>{car.make}</td>	
					<td>{car.model}</td>	
					<td>{car.year}</td>	
					<td>{car.color}</td>	
				</tr>)}
			</tbody>
		</table>;

	}

}

class CarForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			make: '',
			model: '',
			year: '',
			color: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}	

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onClick() {
		this.props.addCar(this.state);

		this.setState({
			make: '', model: '', year: '', color: ''
		});
	}

	render() {

		return <form>
			Make: <input type="text" name="make" value={this.state.make} onChange={this.onChange} /><br />
			Model: <input type="text" name="model" value={this.state.model} onChange={this.onChange} /><br />
			Year: <input type="text" name="year" value={this.state.year} onChange={this.onChange} /><br />
			Color: <input type="text" name="color" value={this.state.color} onChange={this.onChange} /><br />
			<button type="button" onClick={this.onClick}>Add Car</button>
		</form>;

	}

}

const store = createStore(reducer, {
	cars, sortField: ''
});

class CarApp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cars: [],
			sortField: ''
		};

		this.addCar = this.addCar.bind(this);
	}

	componentDidMount() {
		this.storeUnsubscribe = this.props.store.subscribe(() => {
			this.setState(this.props.store.getState());
		});

		this.setState(this.props.store.getState());
	}

	componentWillUnmount() {
		this.storeUnsubscribe();
	}

	addCar(car) {
		this.props.store.dispatch(addCarActionCreator(car));
	}

	render() {
		return <div>
			<CarTable cars={this.state.cars} />
			<CarForm addCar={this.addCar} />
		</div>; 
	}

} 

ReactDOM.render(<CarApp store={store} />, document.querySelector('main'));