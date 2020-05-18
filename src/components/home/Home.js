import React, { Component } from 'react';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import Login from '../auth/Login';
import NewReport from '../reporter/NewReport';


export default class Home extends Component {
	constructor(props){
		super(props);

		this.state = {
			showAnonymousReportForm: false
		}

	}


	componentDidMount(){
		//make api calls here
	}

	handleShowReportForm = () => {
		this.setState({
			showAnonymousReportForm: !this.state.showAnonymousReportForm
		})
	}

	render() {
		console.log(this.props.handleDisplayState.loginDisplay)
		return (
			<div className='container'>
				<header className='home-header text-center'> 
					<h2>
						“The ultimate tragedy is not 
						the oppression and cruelty by 
						the bad people but the silence over 
						that by the good people.” 
					</h2>
					<h3>Dr Martin Luther King Jr</h3>
					<Button onClick={this.handleShowReportForm}>Make a Report</Button>
				</header>
				{(this.props.handleDisplayState.loginDisplay) 
					? <Login handleLoginDisplay={this.props.handleLoginDisplay} />: ''
				}
				{(this.state.showAnonymousReportForm)
					? <NewReport handleShowReportForm={this.handleShowReportForm} />: ''
				}
				<h3 className='text-center'>Top Reports</h3>
				{/*pass in results from api calls as props to ReportsList comp*/}
				<ReportsList />
			</div>
		)
	}
}
