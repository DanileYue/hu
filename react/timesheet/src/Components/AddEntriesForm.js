import React, { Component } from 'react'


export default class AddEntriesForm extends Component {

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
