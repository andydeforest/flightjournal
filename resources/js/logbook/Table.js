import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Toolbar from './Toolbar'
import Options from './Options'

export default class Table extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filterValue: '',
			settings: JSON.parse(localStorage.getItem('settings')) || {}
		}
	}

	formatTime = time => {
		return Number.parseFloat(time).toFixed(1);
	}

	calculateFooter = (table, key, float = true) => {
		if(table) {
			const data = table.getResolvedState().sortedData;
			const page = table.state.page;
			const pageSize = table.state.pageSize;
			const startIndex = page * pageSize;
			let sum = 0;
			data.slice(startIndex, startIndex + pageSize).map((obj) => sum += Number.parseFloat(obj._original[key]));
			if(!float) {
				return <strong>{Number.parseInt(sum)}</strong>
			}
			return <strong>{sum.toFixed(1)}</strong>;
		}
		return <strong>0</strong>;
	}

	render() {

		const font = 16;

		let columns = [
			{
				id: "date",
				accessor: o => o.date,
				Header: "Date",
				width: font * 8
			},
			{
				id: "registration",
				Header: "Registration",
				Cell: row => row.original.aircraft.registration,
				width: font * 7
			},
			{
				id: "type",
				Header: "Type",
				Cell: row => row.original.aircraft.icao,
				width: font * 5
			},
			{
				id: "category",
				Header: "Cat",
				Cell: row => row.original.aircraft.category,
				width: font * 5
			},
			{
				id: "departure",
				Header: "Departure",
				accessor: o => o.departure,
				width: font * 6
			},
			{
				id: "arrival",
				Header: "Arrival",
				accessor: o => o.arrival,
				width: font * 6
			},
			{
				id: "landings",
				Header: "Ldgs.",
				accessor: o => o.landings,
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'landings', false)
			},
			{
				id: "approach_count",
				Header: "Apps.",
				accessor: o => o.approach_count,
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'approach_count', false)
			},
			{
				id: "holds",
				Header: "Holds",
				accessor: o => o.holds,
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'holds', false)
			},
			{
				id: "cross_country",
				Header: "X-C",
				Cell: row => this.formatTime(row.original.cross_country),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'cross_country')
			},
			{
				id: "night",
				Header: "Night",
				Cell: row => this.formatTime(row.original.night),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'night')
			},
			{
				id: "simulated_instrument",
				Header: "Sim Inst.",
				Cell: row => this.formatTime(row.original.simulated_instrument),
				width: font * 5,
				Footer: () => this.calculateFooter(this.table, 'simulated_instrument')
			},
			{
				id: "actual_instrument",
				Header: "IMC",
				Cell: row => this.formatTime(row.original.actual_instrument),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'actual_instrument')
			},
			{
				id: "simulator",
				Header: "Grd. Sim",
				Cell: row => this.formatTime(row.original.simulator),
				width: font * 5,
				Footer: () => this.calculateFooter(this.table, 'simulator')
			},
			{
				id: "solo",
				Header: "Solo",
				Cell: row => this.formatTime(row.original.solo),
				width: font * 5,
				Footer: () => this.calculateFooter(this.table, 'solo')
			},
			{
				id: "dual_received",
				Header: "Dual",
				Cell: row => this.formatTime(row.original.dual_received),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'dual_received')

			},
			{
				id: "dual_given",
				Header: "CFI",
				Cell: row => this.formatTime(row.original.dual_given),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'dual_given')
			},
			{
				id: "sic",
				Header: "SIC",
				Cell: row => this.formatTime(row.original.sic),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'sic')
			},
			{
				id: "pic",
				Header: "PIC",
				Cell: row => this.formatTime(row.original.pic),
				width: font * 4,
				Footer: () => this.calculateFooter(this.table, 'pic')

			},
			{
				id: "total_time",
				Header: "Total",
				Cell: row => <strong>{this.formatTime(row.original.total_time)}</strong>,
				width: font * 5,
				Footer: () => this.calculateFooter(this.table, 'total_time')
			},
			{
				id: "options",
				Header: "Options",
				Cell: row => <Options flight={row.original} showFlight={this.props.showFlight} />
			}
		];
		

		let { settings } = this.state;

		// columns to ignore display preferences
		let ignore = ['options'];		

		let display = [];

		// filter columns based on user preferences
		if(!this.props.loading) {
			columns.forEach((obj, i) => {
				/*
				if(ignore.filter(o => o === obj.id).length === 0 && settings['display_' + obj.id] !== true) {
					//console.log('hiding ' + obj.id)
					columns.splice(columns.findIndex(x => x.id === obj.id), 1);
				}
				*/
				if(settings['display_' + obj.id] === true || ignore.filter(o => o === obj.id).length > 0) {
					display.push(obj);
				}
			});
		}


		return (
				<Grid columns={1}>
					<Grid.Row>
						<Grid.Column>
							<Toolbar handleSearchChange={this.props.handleSearchChange} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<ReactTable
								ref={r => {this.table = r}}
								loading={this.props.loading}
								data={this.props.flights}
								className="-striped -highlight"
								defaultSorted={[
									{
										id: "id",
										desc: false
									}
								]}
								loadingText="Loading Flights"
								noDataText="No flights yet"
								columns={display}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
		)
	}
}
