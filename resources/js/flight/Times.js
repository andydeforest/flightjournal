import React, { Component } from 'react'
import { Table, Form, Input } from 'semantic-ui-react'
import EditableFlightTimeCell from './EditableFlightTimeCell'

export default class Times extends Component {

	constructor(props) {
		super(props);
		this.state = {
			values: [
				{key: 'cross_country', name: 'X-C', value: this.props.flight.cross_country},
				{key: 'night', name: 'Night', value: this.props.flight.night},
				{key: 'simulated_instrument', name: 'Sim. Inst', value: this.props.flight.simulated_instrument},
				{key: 'actual_instrument', name: 'IMC', value: this.props.flight.actual_instrument},
				{key: 'simulator', name: 'Grd. Sim', value: this.props.flight.simulator},
				{key: 'solo', name: 'Solo', value: this.props.flight.solo},
				{key: 'dual_received', name: 'Dual', value: this.props.flight.dual_received},
				{key: 'dual_given', name: 'CFI', value: this.props.flight.dual_given},
				{key: 'sic', name: 'SIC', value: this.props.flight.sic},
				{key: 'pic', name: 'PIC', value: this.props.flight.pic},
				{key: 'total_time', name: 'Total', value: this.props.flight.total_time, style: {color: 'teal'}}
			]
		}
	}

	componentWillMount() {
		let settings = JSON.parse(localStorage.getItem('settings'));

		console.log(settings);
		let { values } = this.state;
		values.forEach((obj, i) => {
			if(settings['display_' + obj.key] !== true) {
				values.splice(i, 1);
			}
		});
		this.setState({ values: values });
	}

	render() {

		const { editing } = this.props

		return (
			<div>
				<Table celled columns={11}>
					<Table.Header>
						<Table.Row>
							{this.state.values.map((obj, i) =>{
								return <Table.HeaderCell key={i} style={{...obj.style}}>{obj.name}</Table.HeaderCell>
							})}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							{this.state.values.map((obj, i) => {
								return <EditableFlightTimeCell updateFlight={this.props.updateFlight} key={i} time={obj} flight={this.props.flight} />
							})}
						</Table.Row>
					</Table.Body>
				</Table>
				<small>Hint: Double click to edit. Press enter to save.</small>
			</div>
		)
	}
}
