import React, { Component } from 'react'
import { Map as LMap, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import AirportMapMarker from './AirportMapMarker'


export default class Map extends Component {
	render() {
		const dep = this.props.departure;
		const dep_coords = [dep.latitude, dep.longitude];
		const arr = this.props.arrival;
		const arr_coords = [arr.latitude, arr.longitude];
		const polyline = [dep_coords, arr_coords];

		
		return (
			<div className="leaflet-container">
				<LMap bounds={[dep_coords, arr_coords]} style={{ width: '100%', height: '400px', margin: '0 auto' }}>
					<TileLayer
						url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
						attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot; target=&quot;_blank&quot;>OpenStreetMap</a> &copy; <a href=&quot;https://carto.com/attributions&quot; target=&quot;_blank&quot;>CARTO</a>"
					/>
					<Polyline color="#00b5ad" positions={polyline} />
					<AirportMapMarker airport={dep} />
					<AirportMapMarker airport={arr} />
				</LMap>
			</div>
		)
	}
}
