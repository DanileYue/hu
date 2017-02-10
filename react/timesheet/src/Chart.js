import React, { Component } from 'react'
import ReactHighchart from 'react-highcharts'
import shallowCompare from 'react-addons-shallow-compare'


export default class Chart extends Component {
	
	shouldComponentUpdate(nextProps) {
		if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
			return false
		}
		return true
	}

	render() {
		console.log('render')
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
		<div className="reports col-md-4 col-md-offset-1">
			<ReactHighchart config={chartConfig}/>
		</div>
			)
	}
}
