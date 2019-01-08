import React, { Component } from 'react'
import { Modal, Button, Loader, Grid, Dimmer, Card, Icon } from 'semantic-ui-react'
import moment from 'moment'
import Api from '../utils/API'
import Map from '../flight/Map'
import Details from '../flight/Details'
import Times from '../flight/Times'

export default class ViewFlightModal extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			flight: {},
		}
	}

	loadFlight = () => {
		if(this.props.id !== null) {
			this.setState({ loading: true });
			Api.Flight.get(this.props.id).then(response => {
				if(response.data.success) {
					this.setState({ flight: response.data.flight })
				}
			}).then(() => this.setState({ loading: false }));
		}
	}


	render() {
		// Workaround for issue w semantic css and loader in modal
		const loader = <Dimmer active inverted><Loader active inverted inline="centered" /></Dimmer>;
		const { flight } = this.state;

		// process the map
		let map, title, times, details;

		if(flight.departure && flight.arrival && flight.departure.latitude && flight.departure.longitude && flight.arrival.latitude && flight.arrival.longitude) {
			map = <Map departure={flight.departure} arrival={flight.arrival} loading={this.state.loading} />;
			title = flight.departure.icao + ' - ' + flight.arrival.icao;
		} else {
			map = null;
			title = flight.departure + ' - ' + flight.arrival;
		}
		title += ' (' + moment(flight.date).format('LL') + ')';

		// process the details table

		if(this.state.loading) {
			map = loader;
			details = loader;
			times = loader;
			title = 'Loading...';
		} else {
			details = <Card fluid><Card.Content><Details flight={flight} updateFlight={this.props.updateFlight} /></Card.Content></Card>;
			times = <Times flight={flight} updateFlight={this.props.updateFlight} />;
		}





		return (
			<Modal onMount={this.loadFlight} open={this.props.open} size="large" centered={false} onClose={this.props.handleClose} closeOnEscape={true} closeOnDimmerClick={true} closeOnEscape={true} closeIcon>
				<Modal.Header>{title}</Modal.Header>
          		<Modal.Content>
					<Grid stackable>
						<Grid.Row columns={1}>
							<Grid.Column width={8}>
								{map}
							</Grid.Column>
							<Grid.Column width={8}>
								{details}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={1}>
							<Grid.Column width={16}>
								{times}
							</Grid.Column>
						</Grid.Row>
					</Grid>
         		</Modal.Content>
         		<Modal.Actions>
           			<Button onClick={this.props.handleClose}>Close</Button>
				</Modal.Actions>
			</Modal>
		)
	}
}
