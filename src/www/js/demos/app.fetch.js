import React from 'react';
import ReactDOM from 'react-dom';

import '../css/styles.scss';

fetch('http://localhost:3010/cars').then(res => res.json())
	.then(cars => ReactDOM.render(<CarApp cars={cars} />, document.querySelector('main')));

fetch('http://localhost:3010/widgets').then(res => res.json())
	.then(results => console.dir(results));

fetch(`http://localhost:3010/widgets/${encodeURIComponent(2)}`)
	.then(res => res.json())
	.then(results => console.dir(results))
	.catch(error => console.log(error));

fetch('http://localhost:3010/widgets', {
	method: 'POST',
	headers: new Headers({ 'Content-Type': 'application/json'}),
	body: JSON.stringify({
		name: 'New Widget',
		color:'red',
		size:'tiny',
		quantity: 2,
		description: 'test'
	})
}).then(res => res.json())
	.then(results => console.dir(results));


// ReactDOM.render(<StyleDemo />, document.querySelector('main'));