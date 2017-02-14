import React, { Component, PropTypes } from 'react'
import ReactHighchart from 'react-highcharts'

export default class Chart extends Component {

  //to validate the datatypes of props
  static propTypes = {
    chart: PropTypes.array,
    title: PropTypes.string
  }

	render() {
    const { chartData, title} = this.props
	  let temp = {}

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
  		<div className="reports col-md-4">
  			<ReactHighchart config={chartConfig} />
  		</div>
		)
	}
}
