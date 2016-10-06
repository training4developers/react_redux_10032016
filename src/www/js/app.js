import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';


const sortFieldExtract = ({ getState }) => {

	return (next) => {

		return (action) => {

			action.sortField = action.sortField || getState().status.sortField;

			return next(action);

		};

	};

};

const carsReducer = (state = [], action) => {

	const sortCars = (carA, carB) => {
		const sortField = action.sortField;
		return carA[sortField] > carB[sortField];
	};	

	switch(action.type) {
		case 'refresh_cars_request':
			return [];
		case 'refresh_cars_complete':
			return action.cars.sort(sortCars);
		case 'add_car_complete':
			return state.concat(action.car).sort(sortCars);
		case 'sortcars':
			return state.concat().sort(sortCars);
		default:
			return state;
	}
};

const statusReducer = (state = { sortField: 'make', status: 'loading' }, action) => {

	switch(action.type) {
		case 'refresh_cars_request':
			return Object.assign({}, state, { status: 'requesting' });
		case 'refresh_cars_complete':
			return Object.assign({}, state, { status: 'complete' });
		case 'sortcars':
			return Object.assign({}, state, { sortField: action.sortField });
		default:
			return state;
	}

};

const refreshCarsAction = () => {

	return (dispatch) => {

		dispatch({
			type: 'refresh_cars_request'
		});

		return fetch('http://localhost:3010/cars')
			.then(res => res.json())
			.then(cars => dispatch({
				type: 'refresh_cars_complete',
				cars
			}));
	};

};

const addCarAction = (car) => {

	return (dispatch) => {

		dispatch({
			type: 'add_car_request'
		});

		return fetch('http://localhost:3010/cars', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(car)
		})
			.then(res => res.json())
			.then(car => dispatch({
				type: 'add_car_complete',
				car
			}));
	};

};

const store = createStore(combineReducers({
	cars: carsReducer,
	status: statusReducer
}), applyMiddleware(sortFieldExtract, thunk));

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

	componentDidMount() {
		this.props.refreshCars();
	}

	render() {
		return <div>
			<button type="button" onClick={this.props.refreshCars}>Refresh</button>
			<CarTable sortCars={this.props.sortCars} cars={this.props.cars} />
			<CarForm addCar={this.props.addCar} />
		</div>; 
	}

} 

const mapStateToProps = (state, ownProps) => {

	return {
		cars: state.cars,
		status: state.status
	};

};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		refreshCars: () => {
			dispatch(refreshCarsAction());
		},
		addCar: (car) => {
			dispatch(addCarAction(car));
		},
		sortCars: (sortField) => {
			dispatch({
				type: 'sortcars',
				sortField
			});
		}
	};

};

const CarAppContainer = connect(mapStateToProps, mapDispatchToProps)(CarApp);

ReactDOM.render(<Provider store={store}>
	<CarAppContainer />
</Provider>, document.querySelector('main'));