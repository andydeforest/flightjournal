import React, { Component } from 'react'
import {Container, Menu, Image } from 'semantic-ui-react'
import UserDropDown from '../layouts/UserDropDown'

export default class NavHeader extends Component {
	render() {
		return (
			<Menu fixed="top" inverted>
				<Container>
					<Menu.Item as="a" href="/app" header>
						<Image src="/images/logo-white.png" size="small" />
					</Menu.Item>
					<Menu.Item as="a" href="/app">Dashboard</Menu.Item>
					<Menu.Item as="a" href="/app/logbook">Logbook</Menu.Item>
					<Menu.Item as="a" href="/app/aircraft">Aircraft</Menu.Item>
					<Menu.Menu position="right">
						<UserDropDown />
					</Menu.Menu>
				</Container>
			</Menu>
		)
	}
}
