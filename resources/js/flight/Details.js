import React, { Component } from 'react'
import { Grid, List } from 'semantic-ui-react'
import moment from 'moment'

export default class Details extends Component {
	
	render() {

		const flight = this.props.flight;
		const aircraft = flight.aircraft;

		return (
			<Grid columns={2} divided="vertically" padded>
				<Grid.Row>
					<Grid.Column><strong>Date</strong></Grid.Column>
					<Grid.Column>{moment(flight.date).format('LL')}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column><strong>Departure</strong></Grid.Column>
					<Grid.Column>{flight.departure.name + ' (' + flight.departure.icao + ')'}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column><strong>Arrival</strong></Grid.Column>
					<Grid.Column>{flight.arrival.name + ' (' + flight.arrival.icao + ')'}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column><strong>Aircraft</strong></Grid.Column>
					<Grid.Column>{aircraft.manufacturer + ' ' + aircraft.model + ' (' + aircraft.registration + ')'}</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column><strong>Distance</strong></Grid.Column>
					<Grid.Column>{Number.parseFloat(flight.distance).toFixed(1)} nm</Grid.Column>
				</Grid.Row>
				{flight.approaches.length > 0 &&
					<Grid.Row>
						<Grid.Column><strong>Approaches</strong></Grid.Column>
						<Grid.Column>
							<List bulleted>
								{flight.approaches.map((app, i) => {
									return <List.Item key={i}>{app.count + ' ' + app.type.toUpperCase() + ' approach' + (app.count > 1 ? 'es' : '')}</List.Item>
								})}
							</List>
						</Grid.Column>
					</Grid.Row>
				}
			</Grid>
		)
	}
}
