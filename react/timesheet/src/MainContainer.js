import React, { Component } from 'react'
import './index.css';
import MainComponent from '../Components/MainComponent'



export default class MainContainer extends Component {

	constructor(props) {
		super(props)
		this.state = {
			entries: [],
			currentEntry: {"projectCode": "", "activity": "", hours: 0}
		}
	}

	/*	-ES6 way of writing a function
			-This function is passed as a prop to the AddEntryForm component to get form componentschanges in state
	*/
	onFormChange = (key, value) => {
		let newEntry = JSON.parse(JSON.stringify(this.state.currentEntry))
		newEntry[key] = value
		this.setState({currentEntry: newEntry})
	}

	handleAddButtonclick = (e) => {
		e.preventDefault()
		let entries = JSON.parse(JSON.stringify(this.state.entries))
		let currentEntry = JSON.parse(JSON.stringify(this.state.currentEntry))
		
		this.setState({
			entries: entries.concat(currentEntry),
			currentEntry: {"projectCode": "", "activity": "", hours: 0}
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
  	const { entries, currentEntry } = this.state
  	return (
    	<MainComponent onAddButtonClick={this.handleAddButtonclick} entries={entries}
    						 		 projectChartData={this.generateChartData("projectCode")}
								 		 activityChartData={this.generateChartData("activity")}
								 	 	 formChangeHandler={this.onFormChange}
								 		 currentEntry={currentEntry} />
    )
  }
}




