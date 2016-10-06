import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, bindActionCreators } from 'redux';
import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
	ADD: null,
	SUBTRACT: null
});

const createAddAction = value => ({
	type: actionTypes.ADD, value
});

const createSubtractAction = value => ({
	type: actionTypes.SUBTRACT, value
});

const actionCreators = {
	add: createAddAction,
	subtract: createSubtractAction
};

const reducer = (state = 0, action) => {

	switch(action.type) {
		case actionTypes.ADD:
			return state + action.value;
		case actionTypes.SUBTRACT:
			return state - action.value;
		default:
			return state;
	}

};

const store = createStore(reducer);
const actions = bindActionCreators(actionCreators, store.dispatch);

store.subscribe(() => {
	console.log(store.getState());
});

// store.dispatch(createAddAction(1));
// store.dispatch(createSubtractAction(2));
// store.dispatch(createAddAction(3));

// actions.add(1);
// actions.subtract(2);
// actions.add(3);

// class OutputValue extends React.Component {
// 	render() {
// 		return <span>Output: {this.props.outputValue}</span>;
// 	}
// }

const OutputValue = (props) => <span>Output: {props.outputValue}</span>;

class Calculator extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			outputValue: 0,
			operand: 0
		};

		this.addValue = this.addValue.bind(this);
		this.subtractValue = this.subtractValue.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			operand: e.target.value ? parseInt(e.target.value, 10): ''
		});
	}

	componentDidMount() {

		this.storeUnsubscribe = this.props.store.subscribe(() => {

			this.setState({
				outputValue: this.props.store.getState()
			});

		});

	}

	componentWillUnmount() {
		this.storeUnsubscribe();
	}

	addValue() {
		this.props.actions.add(this.state.operand);
	}

	subtractValue() {
		//this.props.store.dispatch({ type: 'SUBTRACT', value: this.state.operand });
		this.props.actions.subtract(this.state.operand);
	}

	render() {

		return <div>
			<form>
				<button type="button" onClick={this.addValue}>Add</button>
				<button type="button" onClick={this.subtractValue}>Subtract</button>
				<input type="number" name="operand" id="operand"
					value={this.state.operand} onChange={this.onChange} />
			</form>
			<OutputValue outputValue={this.state.outputValue} />
		</div>;

	}

}

ReactDOM.render(<Calculator store={store} actions={actions} />, document.querySelector('main'));

