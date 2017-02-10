import React, { Component } from 'react'
import './index.css';
import ReactHighchart from 'react-highcharts'


export default class TimesheetContainer extends Component {

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
		let newEntry = Object.assign({}, this.state.currentEntry)
		newEntry[key] = value
		this.setState({currentEntry: newEntry})
	}

	handleAddButtonclick = (e) => {
		e.preventDefault()
		this.setState({
			entries: this.state.entries.concat(this.state.currentEntry),
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
    	<Timesheet onAddButtonClick={this.handleAddButtonclick} entries={entries}
    						 projectChartData={this.generateChartData("projectCode")}
								 activityChartData={this.generateChartData("activity")}
								 formChangeHandler={this.onFormChange}
								 currentEntry={currentEntry} />
    )
  }
}

class Timesheet extends Component {
  render() {
  	/* -Use className instead of class attributes
			 -React custom components begin with a capital letter like <AddEntryForm>
  	*/
		const { onAddButtonClick, entries, projectChartData, activityChartData, formChangeHandler, currentEntry } = this.props
    return (
      <div className="row">
	      <div className="col-md-12">
	      	<AddEntryForm onAddButtonClick={onAddButtonClick}
												onChange={(key, value) => formChangeHandler(key, value)}
												currentEntry={currentEntry} />
	      </div>
				<div className="col-md-10 col-md-offset-1">
	      	<Chart chartData={activityChartData} title="By Activity"/>
	      	<Chart chartData={projectChartData} title="By Project"/>
	      </div>
				<div className="col-md-8 col-md-offset-2">
	      	<Entries entries={entries}/>
	      </div>
	    </div>
    );
  }
}

class AddEntryForm extends Component {

	//to validate the datatypes of props
	static propTypes = {
    onAddButtonClick: React.PropTypes.func,
  }

	render() {
		const { onAddButtonClick, onChange, currentEntry } = this.props
		const projectCodes = ["Hiway", "Idera", "Next-IT", "Frrole", "MOM", "TrackMe"]
		const activityTypes = ["Dev", "Meeting", "E-mail", "Testing", "Debug", "Learning"]
		return (
		<div className="add-entry-form col-md-offset-2">
		<form onSubmit={(e) => onAddButtonClick(e)}>
			<div className="col-md-3">
				<select value={currentEntry.projectCode} onChange={(e) => onChange("projectCode",e.target.value)}
				 				required id="project-code" className="form-control" >
					<option value="" disabled >Select Project Code</option>
					{projectCodes.map((code,index) =>
						<option key={index} value={code}>{code}</option>
					)}
				</select>
			</div>
			<div className="col-md-3">
				<select value={currentEntry.activity} onChange={(e) => onChange("activity",e.target.value)}
				 				required id="activity" className="form-control">
					<option value="" disabled>Select Activity</option>
					{activityTypes.map((activity,index) =>
						<option key={index} value={activity}>{activity}</option>
					)}
				</select>
			</div>
			<div className="col-md-3">
				<input value={currentEntry.hours} onChange={(event) => onChange("hours", event.target.value)}
				 			 required id="hours" className="form-control" type="number" placeholder="Hours"/>
			</div>
			<div className="col-md-3">
				<input required className="btn" type="submit" value="ADD"/>
			</div>
		</form>
		</div>
			)
	}
}


class Entries extends Component {
	//to validate the datatypes of props
	static propTypes = {
    onAddButtonClick: React.PropTypes.array,
  }

	shouldComponentUpdate = (nextProps) => {
		return (nextProps.entries.length !== this.props.entries.length)
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

class Chart extends Component {

	shouldComponentUpdate(nextProps) {
		return (nextProps.chartData.length !== this.props.chartData.length)
	}

	render() {
		const { chartData, title} = this.props
		let temp = {};

    /* This is a helper function to manipulate chartData. Let it be here as it is */

    chartData.map((data, index) => {
      if(!temp[data.name]) {
    		temp[data.name] = data
      }
      else {
    		temp[data.name].y += data.y
      }
      return null
    })

    let processedChartData = [];
    for (let prop in temp) {
    	if(!temp.hasOwnProperty(prop)) {
    		continue;
    	}
      processedChartData.push(temp[prop])
    }

		const chartConfig = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 350,
        },
        title: {
            text: title
        },
        series: [{
            name: title,
            colorByPoint: true,
            data: processedChartData
        }]
    }

		return (
		<div className="reports col-md-4 col-md-offset-1">
			<ReactHighchart config={chartConfig}/>
		</div>
			)
	}
}
