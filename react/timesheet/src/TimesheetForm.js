import React, { Component } from 'react'

import { PROJECT_CODES, ACTIVITY_TYPES } from './constants'


export default class TimesheetForm extends Component {

	constructor() {
		super()
		this.state = {
			currentEntry: {"projectCode": "", "activity": "", hours: 0}
		}
	}

	// to validate the datatypes of props
	static propTypes = {
    entryAdditionHandler: React.PropTypes.func,
  }

	// Updates the current entry in the state
	handleOnChange = (key, value) => {
		let newEntry = JSON.parse(JSON.stringify(this.state.currentEntry))
		newEntry[key] = value
		this.setState({currentEntry: newEntry})
	}

	// Triggers entryAdditionHandler
	triggerEntryAddition = (e) => {
		e.preventDefault()
		this.props.entryAdditionHandler(this.state.currentEntry)
	}

	render() {

		const { currentEntry } = this.state

		return (
			<Form
				onChangeHandler={this.handleOnChange}
				triggerEntryAddition={this.triggerEntryAddition}
				currentEntry={currentEntry}
			/>
		)
	}
}


class Form extends Component {

  //to validate the datatypes of props
  static propTypes = {
    onAddButtonClick: React.PropTypes.func,
    onChangeHandler: React.PropTypes.func,
    entryAdditionHandler: React.PropTypes.func,
    currentEntry: React.PropTypes.object
  }

  render() {

    const { onChangeHandler, currentEntry, triggerEntryAddition } = this.props

    return (
      <div className="add-entry-form col-md-offset-2">
        <form onSubmit={triggerEntryAddition}>
          <div className="col-md-3">
          	<Select
          		value={currentEntry.projectCode}
          		onChangeHandler={(value)=>onChangeHandler("projectCode", value)}
          		options={PROJECT_CODES}
          		disabledOption='Select Project Code'
          	/>
          </div>
          <div className="col-md-3">
          	<Select
          		value={currentEntry.activity}
          		onChangeHandler={(value)=>onChangeHandler('activity', value)}
          		options={ACTIVITY_TYPES}
          		disabledOption='Select Activity'
          	/>
          </div>
          <div className="col-md-3">
            <input
              value={currentEntry.hours}
              onChange={(event) => onChangeHandler("hours", event.target.value)}
              id="hours"
              className="form-control"
              type="number"
              placeholder="Hours"
              required
            />
          </div>
          <div className="col-md-3">
            <input required className="btn" type="submit" value="ADD"/>
          </div>
        </form>
      </div>
    )
  }
}


class Select extends Component {
	render() {

		const { value, onChangeHandler, options, disabledOption } = this.props

		return(
		  <select
        value={value}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="form-control"
      >
        <option value="" disabled>{disabledOption}</option>
        {
          options.map((option, index) =>
          <option key={index} value={option}>{option}</option>
        )}
      </select>
		)
	}
}
