import React from 'react';
import ReactDOM from 'react-dom';

import keyMirror from 'key-mirror';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';

const actionTypes = keyMirror({
	'REFRESH_REQUEST': null,
	'REFRESH': null
});

const widgetsReducer = (state = [], action) => {

	switch(action.type) {
		case actionTypes.REFRESH_REQUEST:
			return [];
		case actionTypes.REFRESH:
			return action.widgets;
		default:
			return state;
	}

};

const statusReducer = (state = 'loading', action) => {

	switch(action.type) {
		case actionTypes.REFRESH_REQUEST:
			return 'requesting';
		case actionTypes.REFRESH:
			return 'refresh';
		default:
			return state;
	}

};

const logger = ({ dispatch, getState }) => {
	return (next) => {
		return (action) => {
			console.log(action);
			const result = next(action);
			console.log('result', JSON.stringify(result));
			return result;
		};
	};
};

const store = createStore(combineReducers({
	widgets: widgetsReducer,
	status: statusReducer
}), applyMiddleware(logger, thunk));

const refreshWidgets = () => {

	return dispatch => {

		dispatch({
			type: actionTypes.REFRESH_REQUEST
		});

		fetch('http://localhost:3010/widgets')
			.then(res => res.json())
			.then(widgets => {
				dispatch({
					type: actionTypes.REFRESH,
					widgets
				});
			});

	};

};

class WidgetList extends React.Component {

	static propTypes = {
		refreshWidgets: React.PropTypes.func,
		widgets: React.PropTypes.array,
		status: React.PropTypes.string,
		header: React.PropTypes.string
	}

	constructor(props) {
		super(props);

		this.refreshWidgets = this.refreshWidgets.bind(this);
	}

	componentDidMount() {
		this.props.refreshWidgets();
	}

	refreshWidgets() {
		this.props.refreshWidgets();
	}

	render() {
		return <div>
			<h1>{this.props.header}</h1>
			<span>Status: {this.props.status}</span>
			<ul>
				{this.props.widgets.map(w => <li key={w.id}>{w.name}</li>)}
			</ul>
			<button type="button" onClick={this.refreshWidgets}>Refresh</button>
		</div>;
	}
 
}

const mapStateToProps = (state, ownProps) => {

	// ownProps are passed in props from outside

	return {
		widgets: state.widgets,
		status: state.status
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {

	// ownProps are passed in props from outside

	return {
		refreshWidgets: () => {
			dispatch(refreshWidgets());
		}
	};

};

const mergeProps = (stateProps, dispatchProps, ownProps) => {

	console.dir(stateProps);
	console.dir(dispatchProps);
	console.dir(ownProps);

	return Object.assign({}, ownProps, stateProps, dispatchProps);
};

const WidgetListContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(WidgetList);

ReactDOM.render(<Provider store={store}>
	<WidgetListContainer header={'Widget List'} />
</Provider>, document.querySelector('main'));








