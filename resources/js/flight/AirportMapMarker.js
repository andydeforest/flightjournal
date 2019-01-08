import React, { Component } from 'react'
import { CircleMarker, Popup } from 'react-leaflet'

export default class AirportMapMarker extends Component {
	
	render() {
		return (
			<CircleMarker radius={4} center={[this.props.airport.latitude, this.props.airport.longitude]} fillColor="#00b5ad" fillOpacity="1" stroke={true} color="#14504f" weight={1}>
				<Popup style={{ textAlign: 'center' }}>
					<h4>{this.props.airport.name} ({this.props.airport.identifier})</h4>
					<hr />
					<small>{Number.parseFloat(this.props.airport.latitude).toFixed(5)} / {Number.parseFloat(this.props.airport.longitude).toFixed(5)}</small>
				</Popup>
			</CircleMarker>
		)
	}
}
