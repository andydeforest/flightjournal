import React, { Component } from 'react'
import Table from './Table'
import Api from '../utils/API'
import ViewFlightModal from '../flight/ViewFlightModal'

export default class Logbook extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			flights: [],
			unfiltered: [],
			viewFlight: {
				open: false,
				id: null
			}
		}
	}

	componentWillMount() {
		Api.Flight.all().then(response => {
			if(response.data.success) {
				this.setState({ flights: response.data.flights, unfiltered: response.data.flights });
			} else {
				throw new Error(response.data.message);
			}
		}).then(() => this.setState({ loading: false }));
	}

	updateFlight = flight => {
		let flights = this.state.flights;
		flights[flights.findIndex((o => o.id === flight.id))] = flight;
		this.setState({ flights: flights });
	}

	handleSearchChange = (e, { value }) => {
		if(value.length === 0) {
			this.setState({ flights: this.state.unfiltered });
		} else {
			this.setState({ flights: [] });
			// filter the
			let results = this.state.flights.filter(obj => {
				return obj.departure.toLowerCase().includes(value.toLowerCase()) ||
					obj.arrival.toLowerCase().includes(value.toLowerCase()) ||
					obj.aircraft.registration.toLowerCase().includes(value.toLowerCase()) ||
					obj.aircraft.icao.toLowerCase().includes(value.toLowerCase()) ||
					obj.aircraft.category.toLowerCase().includes(value.toLowerCase())
			});
			this.setState({ flights: results });
		}
	}

	showFlight = id => {
		this.setState({ viewFlight: { open: true, id: id }});
	}

	render() {
		return (
			<div>
				<ViewFlightModal updateFlight={this.updateFlight} id={this.state.viewFlight.id} open={this.state.viewFlight.open} handleClose={() => this.setState({ viewFlight: { open: false, id: null } })} />
				<Table {...this.state} handleSearchChange={this.handleSearchChange} showFlight={this.showFlight} />
			</div>
		)
	}
}
