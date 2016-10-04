import React from 'react';
import ReactDOM from 'react-dom';

class BaseForm extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		console.log(e.target.value);
		this.setState({
			[e.target.name]: e.target.type === 'checkbox'
				? e.target.checked
				: e.target.multiple
					? Array.from(e.target.options).filter(option => option.selected).map(option => option.value)
					:  e.target.value
		});
	}

}

class DemoForm extends BaseForm {

	constructor(props) {
		super(props);

		let d = new Date();
		let leftPad = (l,v) => ('0'.repeat(l) + String(v)).slice(String(v).length);

		this.state = {
			inputTextDemo: '',
			inputNumberDemo: 0,
			inputEmailDemo: '',
			inputDateDemo: `${d.getFullYear()}-${leftPad(2, d.getMonth()+1)}-${leftPad(2, d.getDate())}`,
			inputRangeDemo: 25,
			inputCheckBoxDemo: false,
			inputRadioDemo: 'OPTION-ONE',
			inputDropDownDemo: 'second',
			inputListBoxDemo: 'second',
			inputMultiSelectListBoxDemo: ['first','second'],
			inputTextAreaDemo: ''
		};
	}

	render() {

		return <form>
			<div>
				<label htmlFor="input-text-demo">Input Text Demo:</label>
				<input type="text" id="input-text-demo" name="inputTextDemo"
					value={this.state.inputTextDemo} onChange={this.onChange} />
				<br />Text Control Value: {this.state.inputTextDemo}
			</div>
			<div>
				<label htmlFor="input-number-demo">Input Number Demo:</label>
				<input type="number" id="input-number-demo" name="inputNumberDemo"
					value={this.state.inputNumberDemo} onChange={this.onChange} />
				<br />Number Control Value: {this.state.inputNumberDemo}
			</div>
			<div>
				<label htmlFor="input-email-demo">Input Email Demo:</label>
				<input type="email" id="input-email-demo" name="inputEmailDemo"
					value={this.state.inputEmailDemo} onChange={this.onChange} />
				<br />Email Control Value: {this.state.inputEmailDemo}
			</div>
			<div>
				<label htmlFor="input-date-demo">Input Date Demo:</label>
				<input type="date" id="input-date-demo" name="inputDateDemo"
					value={this.state.inputDateDemo} onChange={this.onChange} />
				<br />Date Control Value: {this.state.inputDateDemo}
			</div>
			<div>
				<label htmlFor="input-range-demo">Input Range Demo:</label>
				<input type="range" id="input-range-demo" name="inputRangeDemo"
					value={this.state.inputRangeDemo} onChange={this.onChange} />
				<br />Range Control Value: {this.state.inputRangeDemo}
			</div>
			<div>
				<label htmlFor="input-checkbox-demo">Input Checkbox Demo:</label>
				<input type="checkbox" id="input-checkbox-demo" name="inputCheckBoxDemo"
					checked={this.state.inputCheckBoxDemo} onChange={this.onChange} />
				<br />Checkbox Control Value: {this.state.inputCheckBoxDemo ? 'true' : 'false'}
			</div>
			<fieldset>
				<legend>Radio Buttons</legend>
				<div>
					<label htmlFor="input-radio-demo-option-one">Input Radio Demo - Option 1:</label>
					<input type="radio" id="input-radio-demo-option-one" name="inputRadioDemo"
						value="OPTION-ONE"
						checked={this.state.inputRadioDemo === 'OPTION-ONE'} onChange={this.onChange} />
				</div>
				<div>
					<label htmlFor="input-radio-demo-option-two">Input Radio Demo - Option 2:</label>
					<input type="radio" id="input-radio-demo-option-two" name="inputRadioDemo"
						value="OPTION-TWO"
						checked={this.state.inputRadioDemo === 'OPTION-TWO'} onChange={this.onChange} />
				</div>
				Radio Control Value: {this.state.inputRadioDemo}
			</fieldset>
			<div>
				<label htmlFor="select-dropdown-demo">Input DropDown Demo:</label>
				<select id="select-dropdown-demo" name="inputDropDownDemo"
					value={this.state.inputDropDownDemo} onChange={this.onChange}>
					<option value='first'>First</option>
					<option value='second'>Second</option>
					<option value='third'>Third</option>
				</select>
				<br />DropDown Control Value: {this.state.inputDropDownDemo}
			</div>
			<div>
				<label htmlFor="select-listbox-demo">Input ListBox Demo:</label>
				<select id="select-listbox-demo" name="inputListBoxDemo" size="5"
					value={this.state.inputListBoxDemo} onChange={this.onChange}>
					<option value='first'>First</option>
					<option value='second'>Second</option>
					<option value='third'>Third</option>
				</select>
				<br />ListBox Control Value: {this.state.inputListBoxDemo}
			</div>
			<div>
				<label htmlFor="select-multiselectlistbox-demo">Input MultiSelectListBox Demo:</label>
				<select id="select-multiselectlistbox-demo" name="inputMultiSelectListBoxDemo" size="5"
					value={this.state.inputMultiSelectListBoxDemo} onChange={this.onChange} multiple>
					<option value='first'>First</option>
					<option value='second'>Second</option>
					<option value='third'>Third</option>
				</select>
				<br />MultiSelectListBox Control Value: {this.state.inputMultiSelectListBoxDemo.join(',')}
			</div>
			<div>
				<label htmlFor="input-textarea-demo">Input TextArea Demo:</label>
				<textarea id="input-textarea-demo" name="inputTextAreaDemo"
					value={this.state.inputTextAreaDemo} onChange={this.onChange}></textarea>
				<br />TextArea Control Value: {this.state.inputTextAreaDemo}
			</div>
		</form>;

	}

}


ReactDOM.render(<DemoForm />, document.querySelector('main'));