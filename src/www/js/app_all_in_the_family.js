import React from 'react';
import ReactDOM from 'react-dom';
import { BaseComponent } from './components/base-component';
import { ColorList } from './components/color-list';
import { ColorForm } from './components/color-form';
import { EventEmitter } from 'events';

const global = window || global;

global.app = {
	name: 'MyApp',
	events: new EventEmitter()
}

global.appEvents = new EventEmitter();

global.appEvents.on('saveAll', function() {

});

global.appEvents.emit('saveAll', { appData: '' });

class Events

class BrotherKidComponent extends React.Component {

	constructor(props) {
		super(props);

		props.saveAll(this.saveAllClick);
	}

	saveAllClick() {
		this.props.saveKid(this.state.newKid);
	}


}

class BrotherComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			kids: props.kids
		};

		this.saveAllHandlers = [];
	}

	saveAll() {
		this.saveAllHandlers.forEach(fn => fn());
	}

	registerSaveAllHandler(fn) {
		this.saveAllHandlers.push(fn);
	}

	saveKid() {

	}

	render() {
		return <div><ul>
			{this.state.kids.map(kid => <BrotherKidComponent kid={kid} saveAll={this.registerSaveAllHandler} save={this.saveKid} />)}
		</ul>
		<button click={this.saveAll}>Save All</button>
		</div>;
	}

}

class SisterComponent extends React.Component {

	render() {
		return <button click={this.saveAll}>Save All</button>;
	}

}


class ParentComponent extends React.Component {

	render() {

		return <div>
			<BrotherComponent />
			<SisterComponent />
		</div>;
	}




}

ReactDOM.render(<ParentComponent app={app} />, document.querySelector('main'))