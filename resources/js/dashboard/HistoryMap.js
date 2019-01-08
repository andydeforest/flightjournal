import React, { Component } from 'react'
import { Loader } from 'semantic-ui-react'
import { Map as LMap, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Api from '../utils/API'
import AirportMapMarker from '../flight/AirportMapMarker'

export default class HistoryMap extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			map_data: []
		}
	}

	componentDidMount() {
		Api.User.map_data().then(response => {
			if(response.data.success) {
				this.setState({ map_data: response.data.map_data });
			}
		}).then(() => this.setState({ loading: false }));
	}

	render() {
		let airports = [];
		let bounds = [];

		this.state.map_data.forEach((data, i) => {
			// Add airports without duplicates
			['departure', 'arrival'].forEach((val) => {
				if(airports.filter(a => a.id === data[val].id).length === 0) {
					airports.push(data[val]);
					bounds.push([Number.parseFloat(data[val].latitude), Number.parseFloat(data[val].longitude)]);
				}
			});
		});

		if(this.state.loading) {
			return <Loader active inline="centered" />;
		}

		return (
			<div className="leaflet-container" style={{ borderRadius: '15px' }}>
				<LMap bounds={bounds} style={{ width: '100%', height: '400px', margin: '0 auto' }}>
					<TileLayer
						url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
						attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot; target=&quot;_blank&quot;>OpenStreetMap</a> &copy; <a href=&quot;https://carto.com/attributions&quot; target=&quot;_blank&quot;>CARTO</a>"
					/>
					{this.state.map_data.map((flight, i) => {
						return <Polyline key={i} color="#00b5ad" weight={1} positions={[[flight.departure.latitude, flight.departure.longitude], [flight.arrival.latitude, flight.arrival.longitude]]} />;
					})}
					{airports.map((airport, i) => {
						return <AirportMapMarker key={i} airport={airport} />;
					})}

				</LMap>
			</div>
		)
	}
}
