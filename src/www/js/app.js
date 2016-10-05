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

const carsReducer = (state = [], action) => {

	const sortCars = (carA, carB) => {
		const sortField = action.sortField;
		return carA[sortField] > carB[sortField];
	};	

	switch(action.type) {
		case 'addcar':
			return state.concat(action.car).sort(sortCars);
		case 'sortcars':
			return state.concat().sort(sortCars);
		default:
			return state;
	}
};

const sortReducer = (state = 'make', action) => {

	switch(action.type) {
		case 'sortcars':
			return action.sortField;
		default:
			return state;
	}

};

const store = createStore(combineReducers({
	cars: carsReducer,
	sortField: sortReducer
}), {
	cars, sortField: 'make'
});

class CarTable extends React.Component {

	constructor(props) {
		super(props);

		//this.onSort = this.onSort.bind(this);
	}

	onSort = (e) => {
		this.props.sortCars(e.target.getAttribute('data-sortfield'));
	}

	// onSort(e) {
	// 	console.log(e.target.getAttribute('data-sortfield'));
	// }

	render() {

		return <table>
			<thead>
				<tr>
					<th data-sortfield='make' onClick={this.onSort}>Make</th>
					<th data-sortfield='model' onClick={this.onSort}>Model</th>
					<th data-sortfield='year' onClick={this.onSort}>Year</th>
					<th data-sortfield='color' onClick={this.onSort}>Color</th>
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

	sortCars = (sortField) => {
		this.props.store.dispatch({
			type: 'sortcars',
			sortField
		});
	}

	render() {
		return <div>
			<CarTable sortCars={this.sortCars} cars={this.state.cars} />
			<CarForm addCar={this.addCar} />
		</div>; 
	}

} 

ReactDOM.render(<CarApp store={store} />, document.querySelector('main'));