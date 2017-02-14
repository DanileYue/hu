import React, { Component } from 'react'


export default class TimesheetEntries extends Component {
	//to validate the datatypes of props
	static propTypes = {
    onAddButtonClick: React.PropTypes.array,
  }

	render() {

		const { entries } = this.props
		const rows = entries.map((entry, index) =>
			<tr key={index}>
				<th>{index+1}</th>
				<td>{entry.projectCode}</td>
				<td>{entry.activity}</td>
				<td>{entry.hours}</td>
			</tr>
		)

		return (
		<div className="timesheet-table">
			<table className="table">
			  <thead>
			    <tr>
			      <th>#</th>
			      <th>Project Code</th>
			      <th>Activity</th>
			      <th>Hours</th>
			    </tr>
			  </thead>
			  <tbody>
			  	{(entries.length !== 0)?rows: <tr><th style={{textAlign: 'center'}}
					 																		 colSpan="4">No Entries Entered</th></tr>}
			  </tbody>
			</table>
		</div>
			)
	}
}

