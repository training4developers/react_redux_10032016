import React from 'react';
import ReactDOM from 'react-dom';

import '../css/styles.scss';

class FormDemo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			inputText: '',
			inputNumber: 0,
			inputColor: '#000000',
			inputRange: 0,
			inputEmail: '',
			inputDate: '2016-10-04',
			inputTime: '',
			inputCheckbox: true,
			inputRadio: 'one',
			textarea: '',
			selectDropdown: '',
			selectListbox: '',
			selectMultiple: ['one', 'three']
		};

		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {

		const newState = {};

		switch (e.target.type) {
			case 'number':
				newState[e.target.name] = parseInt(e.target.value,10);
				break;
			case 'checkbox':
				newState[e.target.name] = e.target.checked;
				break;
			default:
				if (e.target.multiple) {
					newState[e.target.name] = Array.from(e.target.options)
						.filter(option => option.selected)
						.map(option => option.value);
				} else {
					newState[e.target.name] = e.target.value;
				}
				break;
		}

		this.setState(newState);
	}

	render() {

		return <form>
			<div>
				<label htmlFor="input-text">Input Text:</label>
				<input type="text" id="input-text" name="inputText"
					value={this.state.inputText} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputText}</span>
			</div>
			<div>
				<label htmlFor="input-number">Input Number:</label>
				<input type="number" id="input-number" name="inputNumber"
					value={this.state.inputNumber} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputNumber + ':' + (typeof this.state.inputNumber)}</span>
			</div>
			<div>
				<label htmlFor="input-color">Input Color:</label>
				<input type="color" id="input-color" name="inputColor"
					value={this.state.inputColor} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputColor}</span>
			</div>
			<div>
				<label htmlFor="input-range">Input Range:</label>
				<input type="range" id="input-range" name="inputRange"
					value={this.state.inputRange} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputRange}</span>
			</div>
			<div>
				<label htmlFor="input-email">Input Email:</label>
				<input type="email" id="input-email" name="inputEmail"
					value={this.state.inputEmail} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputEmail}</span>
			</div>
			<div>
				<label htmlFor="input-date">Input Date:</label>
				<input type="date" id="input-date" name="inputDate"
					value={this.state.inputDate} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputDate}</span>
			</div>
			<div>
				<label htmlFor="input-time">Input Time:</label>
				<input type="time" id="input-time" name="inputTime"
					value={this.state.inputTime} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputTime}</span>
			</div>
			<div>
				<label htmlFor="input-checkbox">Input Checkbox:</label>
				<input type="checkbox" id="input-checkbox" name="inputCheckbox"
					checked={this.state.inputCheckbox} onChange={this.onChange} />
				<br /><span>Output: {this.state.inputCheckbox ? 'true' : 'false'}</span>
			</div>
			<fieldset>
				<legend>Select A Value</legend>
				<div>
					<label htmlFor="input-radio-one">Input Radio One:</label>
					<input type="radio" id="input-radio-one" name="inputRadio"
						value="one"
						checked={this.state.inputRadio === 'one'} onChange={this.onChange} />
				</div>
				<div>
					<label htmlFor="input-radio-two">Input Radio Two:</label>
					<input type="radio" id="input-radio-two" name="inputRadio"
						value="two"
						checked={this.state.inputRadio === 'two'} onChange={this.onChange} />
				</div>
				<div>
					<label htmlFor="input-radio-three">Input Radio Three:</label>
					<input type="radio" id="input-radio-three" name="inputRadio"
						value="three"
						checked={this.state.inputRadio === 'three'} onChange={this.onChange} />
				</div>
				<br /><span>Output: {this.state.inputRadio}</span>

			</fieldset>
			<div>
				<label htmlFor="textarea">Textarea:</label>
				<textarea id="textarea" name="textarea"
					value={this.state.textarea} onChange={this.onChange} />
				<br /><span>Output: {this.state.textarea}</span>
			</div>

			<div>
				<label htmlFor="select-dropdown">Select DropDown:</label>
				<select id="select-dropdown" name="selectDropdown"
					value={this.state.selectDropdown} onChange={this.onChange}>
					<option value=''>Select One...</option>
					<option value='one'>One</option>
					<option value='two'>Two</option>
					<option value='three'>Three</option>
				</select>
				<br /><span>Output: {this.state.selectDropdown}</span>
			</div>
			<div>
				<label htmlFor="select-listbox">Select ListBox:</label>
				<select id="select-listbox" name="selectListbox" size="5"
					value={this.state.selectListbox} onChange={this.onChange}>
					<option value=''>Select One...</option>
					<option value='one'>One</option>
					<option value='two'>Two</option>
					<option value='three'>Three</option>
				</select>
				<br /><span>Output: {this.state.selectListbox}</span>
			</div>
			<div>
				<label htmlFor="select-multiple">Select Multiple:</label>
				<select id="select-multiple" name="selectMultiple" size="5" multiple
					value={this.state.selectMultiple} onChange={this.onChange}>
					<option value='one'>One</option>
					<option value='two'>Two</option>
					<option value='three'>Three</option>
					<option value='four'>Four</option>
					<option value='five'>Five</option>
				</select>
				<br /><span>Output: {this.state.selectMultiple}</span>
			</div>
		</form>;


	}



}

ReactDOM.render(<FormDemo />, document.querySelector('main'));