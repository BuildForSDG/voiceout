import React, { Component } from 'react'
import ReportsSummary from './ReportsSummary';

export default class ReportsList extends Component {
	constructor(props){
		super(props);

	}

	render() {
		return (
			<div>
				{/*mapping reports from props*/}
				<ReportsSummary />
			</div>
		)
	}
}
