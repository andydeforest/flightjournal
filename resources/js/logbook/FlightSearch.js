import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'

export default class FlightSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	render() {
		return (
			<div>
				<Search onSearchChange={this.props.handleSearchChange} />
			</div>
		)
	}
}
