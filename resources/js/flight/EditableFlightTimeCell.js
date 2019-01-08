import React, { Component } from 'react'
import { Table, Dimmer, Loader, Input } from 'semantic-ui-react'
import Api from '../utils/API'

export default class EditableFlightTimeCell extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			editing: false,
			input: this.props.time
		}
	}

	formatTime = time => {
		return Number.parseFloat(time).toFixed(1);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	save = e => {
		this.setState({ loading: true });
		let obj = {id: this.props.flight.id, [this.state.input.key]: this.state.input.value};
		
		Api.Flight.update(obj).then(response => {
			if(response.data.success) {
				this.props.updateFlight(response.data.flight);
			} else {
				throw new Error(response.data.message);
			}
		}).then(() => this.setState({ editing: false, loading: false }));

		
	}

	render() {


		let content;
		if(this.state.editing) {
			content = <Input fluid value={this.state.input.value} loading={this.state.loading} onChange={this.inputChangeHandler} onKeyPress={e => e.key === 'Enter' ? this.save(e) : null} />;
		} else {
			content = <span>{this.formatTime(this.props.time.value)}</span>;
		}

		return (
			<Table.Cell style={{ ...this.props.time.style }} onDoubleClick={() => this.setState({ editing: true })}>
				{content}
			</Table.Cell>
		)
	}
}
