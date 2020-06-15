import React, { Component } from 'react'
import ReportDetails from './ReportDetails'
import Image from 'react-bootstrap/Image'
import '../../style/Home.css'

export default class ReportsSummary extends Component {
	render() {
		const { data } = this.props;
		const date = new Date(data.created_at).getDate();
		const day = new Date(data.created_at).getDay();
		const month = new Date(data.created_at).getMonth();
		const year = new Date(data.created_at).getFullYear();
		const hour = new Date(data.created_at).getHours();
		const minute = new Date(data.created_at).getMinutes();
		const days = [
			'Sunday', 
			'Monday', 
			'Tuesday', 
			'Wednesday', 
			'Thursday',
			'Friday',
			'Saturday'
		];
		const hours = (hour < 10) ? `0${hour}`: hour;
		const minutes = (minute < 10) ? `0${minute}`: minute;
		return (
			<div className='container report-summary'>
				<figure className='inside-flex'>
					<Image 
						src={
							(data.media_url.images) ? 
							data.media_url.images : 
							"https://i1.wp.com/ilikeweb.co.za/wp-content/uploads/2019/07/placeholder.png?ssl=1"
						}
						fluid 
						
					/>
					<figcaption>{data.title}</figcaption>
				</figure>
				<p className='time'>Reported on {days[day]}, {date}-{month}-{year} at {hours}:{minutes}hours</p>
				<p className='authorName'>By {data.user.first_name + " " + data.user.last_name}</p>
			</div>
		)
	}
}
