import React, { Component } from 'react'
import {connect} from 'react-redux';
import ReportsSummary from './ReportsSummary';
import { Link, Redirect } from 'react-router-dom';
import { asyncLocalStorage } from '../../services/asyncData';


class ReportsList extends Component {
	constructor(props){
		super(props);

		this.state = {
			reports: '',
			canRedirect: false
		}
	}
	componentDidMount(){
		this.setState({
			reports: this.props.reports
		})
	}
	handleUserNotLoggedIn = () => {
		localStorage.setItem('notLoggedInMessage', 'Not Logged In');
		this.setState({
			canRedirect: true,
		});
		console.log("object")
	}

	render() {
		if (this.state.canRedirect) {return <Redirect to='/' />}
		const { userReports } = this.props;
		const storageData = JSON.parse(localStorage.getItem('response'));
		return (
			<div>
				{/*mapping reports from props*/}
				
				{	
					userReports.userReports && userReports.userReports.data.map((data, i) => {
						return (
							storageData && storageData.user  ? 
							<Link key={i} className="links" to={'/report/' + data.id}>
								<ReportsSummary data={data}/>	
							</Link>
							:
							<Link key={i} onClick={this.handleUserNotLoggedIn}>
								<ReportsSummary data={data}/>	
							</Link>
						)
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	//console.log(state.userReports.userReports.data);
	return{
			userReports: state.userReports,
	}
}

export default connect(mapStateToProps, null)(ReportsList)