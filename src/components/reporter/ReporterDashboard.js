import React, { Component } from 'react';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import NewReport from '../reporter/NewReport';


class ReporterDashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			showReportForm: false,
			//localStorageData: ''
		}

	}
	
	
	handleShowReportForm = () => {
		this.setState({
			showReportForm: !this.state.showReportForm
		})
	}

	render() {
		if(localStorage.getItem('response') == undefined) return <Redirect to='/' />
        const { response } = this.props;
		if(localStorage.getItem('response') != undefined){
			console.log(JSON.parse(localStorage.getItem('response')));
			const storage = JSON.parse(localStorage.getItem('response'));
			return (
				<div className='container'>
					<header className='home-header text-center'> 
						<h1>Welcome 
							<span className="name">
								{storage ? " " + storage.user.first_name + " " + storage.user.last_name : ''}
							</span>
						</h1>
						<h2>
						“The rights of every man are diminished when the rights of one man are threatened 
						</h2>
						<Button onClick={this.handleShowReportForm}>Make a Report</Button>
					</header>
					{(this.state.showReportForm)
						? <NewReport handleShowReportForm={this.handleShowReportForm} />: ''
					}
					<h3 className='text-center'>Top Reports</h3>
					{/*pass in results from api calls as props to ReportsList comp*/}
					<ReportsList />
				</div>
			)
		}
		//console.log(this.state.localStorageData);
		//console.log(this.props.handleDisplayState.loginDisplay)
		
	}
}

const mapStateToProps = (state) => {
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, null)(ReporterDashboard)