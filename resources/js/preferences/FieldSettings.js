import React, { Component } from 'react'
import { Grid, Checkbox, Button } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import Api from '../utils/API'

export default class FieldSettings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settings: [
				{key: 'date', label: 'Date', value: this.props.settings.display_date},
				{key: 'registration', label: 'A/C Registration', value: this.props.settings.display_registration},
				{key: 'type', label: 'A/C Type', value: this.props.settings.display_type},
				{key: 'category', label: 'A/C Category', value: this.props.settings.display_category},
				{key: 'departure', label: 'Departure', value: this.props.settings.display_departure},
				{key: 'arrival', label: 'Arrival', value: this.props.settings.display_arrival},
				{key: 'landings', label: 'Landings', value: this.props.settings.display_landings},
				{key: 'approach_count', label: 'Approaches', value: this.props.settings.display_approach_count},
				{key: 'holds', label: 'Holds', value: this.props.settings.display_holds},
			],
			saving: false
		}
	}

	updateSetting = setting => {
		setting.value = !setting.value;
		let settings = this.state.settings;
		settings[settings.findIndex((o => o.key === setting.key))] = setting;
		this.setState({ settings: settings });
	}

	render() {

		let { settings } = this.state;

		return (
			<div>
				<Grid>
					<Grid.Row divided={false}>
						<Grid.Column><h2>Properties</h2></Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid divided="vertically">
					<SemanticToastContainer position="bottom-center" />
					{settings.map((obj, i) => {
						return (
							<Grid.Row key={i}>
								<Grid.Column>
									<Checkbox label={obj.label} toggle checked={obj.value} onChange={() => this.updateSetting(obj)} />
								</Grid.Column>
							</Grid.Row>
						)
					})}
				</Grid>
			</div>
		)
	}
}
