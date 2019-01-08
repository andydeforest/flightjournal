import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import NavHeader from './NavHeader'
import Footer from './Footer'

export default class AppLayout extends Component {
	render() {
		return (
			<div>
				<NavHeader />
				<Container className="app-container" fluid style={{ marginTop: '7em', minHeight: '80vh' }}>
					{this.props.children}
				</Container>
				<Footer />
			</div>
		)
	}
}
