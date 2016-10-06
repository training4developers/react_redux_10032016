import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware, bindActionCreators, compose } from 'redux';
import thunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';

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


export class WidgetTable extends React.Component {

	constructor(props) {
		super(props);

		this.refreshWidgets = this.refreshWidgets.bind(this);
	}

	refreshWidgets() {
		this.props.refreshWidgets();
	}

	render() {

		return <div>
			<h1>List of Widgets</h1>
			<ul>
				{this.props.widgets.map(w => <li key={w.id}>{w.name}</li>)}
			</ul>
			<button type="button" onClick={this.refreshWidgets}>Refresh</button>
		</div>;

	}

}


function mapStateToProps(state) {

	return {
		widgets: state.widgets
	};

}

function mapDispatchToProps(dispatch) {
	return {
		refreshWidgets: function() {
			dispatch(refreshAction());
		}
	};
}

const WidgetTableContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetTable);

// ReactDOM.render(<Provider store={store}>
// 	<WidgetTableContainer />
// </Provider>, document.querySelector('main'));

ReactDOM.render(<WidgetTableContainer store={store} />, document.querySelector('main'));


store.dispatch(refreshAction());

console.log('fetching widgets...');
