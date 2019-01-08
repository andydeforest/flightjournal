import React, { Component } from 'react'
import { Grid, Card, Loader, Button } from 'semantic-ui-react'
import TimeSettings from './TimeSettings'
import FieldSettings from './FieldSettings'
import Api from '../utils/API'

export default class Preferences extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			settings: [],
			saving: false
		}
	}

	componentDidMount() {
		Api.Settings.get().then(response => {
			if(response.data.success) {
				this.setState({ settings: response.data.settings });
			} else {
				throw new Error(response.data.message);
			}
		}).then(() => this.setState({ loading: false }));
	}

	updateSetting = setting => {
		setting.value = !setting.value;
		let settings = this.state.settings;
		settings[settings.findIndex((o => o.key === setting.key))] = setting;
		this.setState({ settings: settings });
	}

	save = () => {

	}

	render() {

		let timeSettings, fieldSettings;

		if(this.state.loading) {
			timeSettings = <Loader active inline="centered" />;
			fieldSettings = <Loader active inline="centered" />;
		} else {
			timeSettings = <TimeSettings settings={this.state.settings} />;
			fieldSettings = <FieldSettings settings={this.state.settings} />;
		}

		return (
			<div>
				<Grid columns={1}>
					<Grid.Row>
						<Grid.Column computer={6} tablet={10} mobile={16} >
							<Card fluid>
								<Card.Content>
									<Card.Header>Logbook Display Settings</Card.Header>
								</Card.Content>
								<Card.Content>
									<Grid columns={2}>
										<Grid.Row>
											<Grid.Column>
												{timeSettings}
											</Grid.Column>
											<Grid.Column>
												{fieldSettings}
											</Grid.Column>
										</Grid.Row>
										<Grid.Row>
											<Grid.Column width={16}>
												<Button primary fluid loading={this.state.saving} onClick={this.save}>Save</Button>
											</Grid.Column>
										</Grid.Row>
									</Grid>	
								</Card.Content>
							</Card>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		)
	}
}
