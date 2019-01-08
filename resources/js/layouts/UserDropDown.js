import React, { Component } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import Api from '../utils/API'

export default class UserDropDown extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {first_name: '', last_name: ''}
		}
	}

	componentWillMount() {
		this.getUser();
	}

	getUser = () => {
		Api.User.get().then(response => {
			if(response.data.success) {
				this.setState({ user: response.data.user });
				if(response.data.user.id === response.data.user.settings.user_id) {
					localStorage.setItem('settings', JSON.stringify(response.data.user.settings));
				}

			} else {
				throw new Error(request.data.message);
			}
		});
	}

	render() {
		return (
			<Dropdown text={this.state.user.first_name + ' ' + this.state.user.last_name} pointing className="link item">
				<Dropdown.Menu>
					<Dropdown.Item as="a" href="/app/profile"><Icon name="user circle" />Profile</Dropdown.Item>
					<Dropdown.Item as="a" href="/app/preferences"><Icon name="cog" />Preferences</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item as="a" href="/logout"><Icon name="sign-out" />Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		)
	}
}
