import React, { Component } from 'react'
import FlightSearch from './FlightSearch'

export default class Toolbar extends Component {
	render() {
		return (			
			<div>
				<div style={{ float: 'right' }}>
					<FlightSearch handleSearchChange={this.props.handleSearchChange} />
				</div>
			</div>
		)
	}
}
