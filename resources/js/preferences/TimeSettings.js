import React, { Component } from 'react'
import { Grid, Checkbox, Button } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import Api from '../utils/API'

export default class TimeSettings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			settings: [
				{key: 'display_cross_country', label: 'Cross-Country Time', value: this.props.settings.display_cross_country},
				{key: 'display_night', label: 'Night Time', value: this.props.settings.display_night},
				{key: 'display_simulated_instrument', label: 'Simulated Instrument Time', value: this.props.settings.display_simulated_instrument},
				{key: 'display_actual_instrument', label: 'IMC Time', value: this.props.settings.display_actual_instrument},
				{key: 'display_simulator', label: 'Ground Sim Time', value: this.props.settings.display_simulator},
				{key: 'display_solo', label: 'Solo Time', value: this.props.settings.display_solo},
				{key: 'display_dual_received', label: 'Dual Time', value: this.props.settings.display_dual_received},
				{key: 'display_dual_given', label: 'CFI (Dual Given) Time', value: this.props.settings.display_dual_given},
				{key: 'display_sic', label: 'Second-In-Command Time', value: this.props.settings.display_sic},
				{key: 'display_pic', label: 'Pilot-In-Command Time', value: this.props.settings.display_pic},
				{key: 'display_total_time', label: 'Total Time', value: this.props.settings.display_total_time},
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

	saveSettings = () => {
		this.setState({ saving: true, message: {visible: false} });
		let obj = {id: this.props.settings.id};
		this.state.settings.forEach((o, i) => {
			obj[o.key] = o.value;
		});
		Api.Settings.update(obj).then(response => {
			if(response.data.success) {
				// update our local storage
				localStorage.setItem('settings', JSON.stringify(response.data.settings));
				toast({
					type: 'success',
					icon: 'check',
					title: 'Success!',
					description: 'Your settings have been updated'
				});
			} else {
				toast({
					type: 'error',
					icon: 'exclamation triangle',
					title: 'Error!',
					description: response.data.message
				});
			}
		}).then(() => this.setState({ saving: false }));
	}


	render() {

		let { settings } = this.state;

		return (
			<div>
				<Grid>
					<Grid.Row divided={false}>
						<Grid.Column><h2>Times</h2></Grid.Column>
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
