import { createStore, combineReducers, applyMiddleware, bindActionCreators, compose } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state = { widgets: [], status: 'loading' }, action) => {

	switch (action.type) {
		case 'request':
			return Object.assign({}, state, { widgets: [], status: 'requesting' });
		case 'refresh':
			return Object.assign({}, state, { widgets: action.widgets, status: 'complete' });
		default:
			return state;
	}


};

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
	console.log(store.getState().status);
	console.log(store.getState().widgets);
});


const refreshAction = () => {
	return dispatch => {

		dispatch({
			type: 'request'
		});

		return fetch('http://localhost:3010/widgets')
			.then(res => res.json())
			.then(widgets => {
				dispatch({
					type: 'refresh',
					widgets
				});
			});
	};
};

store.dispatch(refreshAction());

console.log('fetching widgets...');