import React, { Component } from 'react'

import TimesheetForm from './TimesheetForm'
import Chart from './Chart'
import TimesheetEntries from './TimesheetEntries'



export default class TimesheetApp extends Component {

	constructor(props) {
		super(props)
		this.state = {
			entries: []
		}
	}

	/*
		-ES6 way of writing a function
		-This function is passed as a prop to the AddEntryForm component to get form componentschanges in state
	*/

	// Adds a new entry to the state
	onEntryAddition = (newEntry) => {
		let entries = JSON.parse(JSON.stringify(this.state.entries))
		newEntry = JSON.parse(JSON.stringify(newEntry))
		
		this.setState({
			entries: entries.concat(newEntry)
		})
	}

	generateChartData = (entryKey) => {
		let chartData = []
		this.state.entries.map(entry =>
			chartData.push({name: entry[entryKey], y: parseInt(entry.hours,10)})
		)
		return chartData
	}

	render() {
  	const { entries } = this.state
  	return (
    	<Timesheet 
    		entryAdditionHandler={this.onEntryAddition}
    		projectChartData={this.generateChartData("projectCode")}
				activityChartData={this.generateChartData("activity")}
				entries={entries}
			/>
    )
  }
}


class Timesheet extends Component {

  //to validate the datatypes of props
  static propTypes = {
    entryAdditionHandler: React.PropTypes.func,
    entries: React.PropTypes.array,
    projectChartData: React.PropTypes.array,
    activityChartData: React.PropTypes.array
  }

  render() {

		const {	
      entryAdditionHandler,
		  entries,
		  projectChartData,
		  activityChartData,
		} = this.props

    return (
      <div className="row">
	      <div className="col-md-12">
	      	<TimesheetForm entryAdditionHandler={entryAdditionHandler} />
	      </div>
				<div className="col-md-8 col-md-offset-2">
	      	<TimesheetEntries entries={entries} />
	      </div>
        <div className="col-md-10 col-md-offset-2">
          <Chart chartData={activityChartData} title="By Activity" />
          <Chart chartData={projectChartData} title="By Project" />
        </div>
	    </div>
    );
  }
}
