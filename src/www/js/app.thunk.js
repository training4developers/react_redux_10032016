import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, bindActionCreators, compose } from 'redux';
import thunk from 'redux-thunk';

const middleware1 = ({ getState }) => {

	// runs when the store is created

	console.log('middleware1 start');

	return next => action => {

		// runs on each dispatch

		console.log('middleware1 end');

		console.log(action);
		console.log('getState', getState());

		//action.value = 10;
	
		console.log('next1', next.toString());

		// next is the next middleware
		let returnValue = next(action);

		console.dir(returnValue);

		return returnValue;
	};

};

const middleware2 = ({ getState }) => {

	console.log('middleware2 start');

	return next => action => {

		console.log('middleware2 end');

		console.log(action);

		console.log('next2', next.toString());

		// last middleware is the last dispatch function
		let returnValue = next(action);

		console.dir(returnValue);

		return returnValue;
	};

};


const reducer = (state = 0, action) => {

	console.log('reducer');

	switch(action.type) {
		case 'add':
			return state + action.value;
		case 'subtract':
			return state - action.value;
		default:
			return state;
	}

};

//const store = createStore(reducer, null, applyMiddleware(middleware1, middleware2));
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(function() {

	console.log('subscribe');

	console.log(store.getState());

});

const calcActions = {
	add: value => ({ type: 'add', value }),
	subtract: value => ({ type: 'subtract', value })	
};

const actions = bindActionCreators(calcActions, store.dispatch); 





console.log('dispatch1');
// dispatch returns the action
// const a1 = store.dispatch({
// 	type: 'add',
// 	value: 4
// });
// console.log('a1', a1);
//actions.add(4);


console.log('dispatch2');
// store.dispatch({
// 	type: 'add',
// 	value: 8
// });
//actions.add(7);


// console.dir(compose(
// 	a => a * 2,
// 	b => b + 2,
// 	c => c / 2
// )(2));


const delayAdd = (value) => {

	return dispatch => {

		return new Promise(resolve => {
			setTimeout(() => {
				console.log('timeout expired');
				resolve(dispatch({
					type: 'add',
					value
				}));
			}, 2000);
		});

	};


};

store.dispatch(delayAdd(23));
store.dispatch(delayAdd(23));
store.dispatch(delayAdd(23));
store.dispatch(delayAdd(23));
console.log('waiting');