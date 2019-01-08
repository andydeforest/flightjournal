import React, { Component } from 'react'
import { Grid, Card } from 'semantic-ui-react'
import UserStats from './UserStats'
import HistoryMap from './HistoryMap'

export default class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			times: [],
			loading: true,
		}
	}

	render() {
		return (
			<div>
				<Grid columns={1}>
					<Grid.Row>
						<Grid.Column width={16}>
							<Card fluid>
								<Card.Content>
									<UserStats />
								</Card.Content>
							</Card>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column computer={8} tablet={12} mobile={16}>
						<Card fluid>
							<Card.Content>
								<Card.Header>Your Flight Map</Card.Header>
							</Card.Content>
							<Card.Content>
								<HistoryMap />
							</Card.Content>
						</Card>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}
