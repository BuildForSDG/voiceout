import React, { Component } from 'react'
import ReportDetails from './ReportDetails'
import Image from 'react-bootstrap/Image'

export default class ReportsSummary extends Component {
	render() {
		return (
			<div className='container report-summary'>
				<figure className='inside-flex'>
					<Image 
						src="https://i1.wp.com/ilikeweb.co.za/wp-content/uploads/2019/07/placeholder.png?ssl=1" 
						fluid 
					/>
					<figcaption>About the image</figcaption>
				</figure>
			</div>
		)
	}
}
