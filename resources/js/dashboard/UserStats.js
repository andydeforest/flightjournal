import React, { Component } from 'react'
import { Statistic, Loader, Header } from 'semantic-ui-react'
import Api from '../utils/API'

export default class UserStats extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			times: []
		}
	}

	componentDidMount() {
		Api.User.time().then(request => {
			if(request.data.success) {
				this.setState({loading: false, times: request.data.times});
			} else {
				throw new Error(request.data.message);
			}

		});
	}

	render() {
		if(this.state.loading) {
			return <Loader active inline="centered" />;
		} else {
			return (
				<Statistic.Group widths="five" color="teal">
					<Statistic>
						<Statistic.Value>{this.state.times.total_time}</Statistic.Value>
						<Statistic.Label>Total Time</Statistic.Label>
					</Statistic>
					<Statistic>
						<Statistic.Value>{this.state.times.pic}</Statistic.Value>
						<Statistic.Label>PIC Time</Statistic.Label>
					</Statistic>
					<Statistic>
						<Statistic.Value>{this.state.times.AMEL}</Statistic.Value>
						<Statistic.Label>AMEL</Statistic.Label>
					</Statistic>
					<Statistic>
						<Statistic.Value>{this.state.times.ASEL}</Statistic.Value>
						<Statistic.Label>ASEL</Statistic.Label>
					</Statistic>
					<Statistic>
						<Statistic.Value>{this.state.times.cross_country}</Statistic.Value>
						<Statistic.Label>Cross Country</Statistic.Label>
					</Statistic>
				</Statistic.Group>
			)
		}
	}
}
