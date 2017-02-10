import React, { Component } from 'react'
import AddEntriesForm from './AddEntriesForm'
import Chart from './Chart'
import Entries from './Entries'


class MainComponent extends Component {
  render() {
  	/* -Use className instead of class attributes
			 -React custom components begin with a capital letter like <AddEntryForm>
  	*/
		const {	onAddButtonClick,
					  entries,
					  projectChartData,
					  activityChartData,
					  formChangeHandler,
					  currentEntry
					} = this.props
    
    return (
      <div classsName="row">
	      <div className="col-md-12">
	      	<AddEntriesForm onAddButtonClick={onAddButtonClick}
												  onChange={(key, value) => formChangeHandler(key, value)}
												  currentEntry={currentEntry} />
	      </div>
				<div className="col-md-10 col-md-10md-offset-1">
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
