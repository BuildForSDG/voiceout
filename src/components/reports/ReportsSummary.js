import React, { Component } from 'react'
import ReportDetails from './ReportDetails'
import Image from 'react-bootstrap/Image'
import '../../style/Home.css';
import { dateFromData } from '../../services/dateFromData';


export default class ReportsSummary extends Component {
	render() {
		const { data } = this.props;
		const date = dateFromData(data);
		return (
			<div className='report-summary'>
				<figure className='inside-flex summary-flex'>
					<Image
						className='summary-image'
						src={
							(data.media_url.images) ? 
							data.media_url.images : 
							"https://i1.wp.com/ilikeweb.co.za/wp-content/uploads/2019/07/placeholder.png?ssl=1"
						}
						fluid
					/>
					<figcaption>{data.title}</figcaption>
				</figure>
				<br />
				<p className='time'>Reported on {date.days[date.day]}, 
					{" " + date.date} - 
					{date.months[date.month]} - 
					{date.year + " "} at
					{" " + date.hours}: 
					{date.minutes + " "} 
					hours
				</p>				
				<p className={
					this.props.anonymous ?
					'anonymous-yellow': 
					'authorName'
				}
				>By
					{
						data.anonymous === 1 ?
						' Anonymous' :
						" " + data.user.first_name + " " + data.user.last_name
					}
				</p>
			</div>
		)
	}
}
