import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import './Options.css'

export default class Options extends Component {
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<Icon name="search" className="link" onClick={() => this.props.showFlight(this.props.flight.id)} />
				<Icon name="edit" className="link" />
				<Icon name="delete" className="link" />
			</div>
		)
	}
}
