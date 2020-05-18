import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import Login from '../auth/Login';
import NewReport from '../reporter/NewReport';
import Loading from './Loading';


export default class Home extends Component {
	constructor(props){
		super(props);

		this.state = {
			showAnonymousReportForm: false,
			loading: false
		}

	}
	componentDidMount(){
		const data = JSON.parse(localStorage.getItem('response'));
		if( data ){
			this.setState({
				loading: false
			})
		}
	}
	handleShowReportForm = () => {
		this.setState({
			showAnonymousReportForm: !this.state.showAnonymousReportForm
		})
	}
	loading = () => {
		const data = JSON.parse(localStorage.getItem('response'));
		if( data == undefined){
			this.setState({
				loading: true
			})
		}
		console.log('loading......');
		console.log(this.state.loading);
	}

	render() {
		console.log(this.state.loading);
		const data = JSON.parse(localStorage.getItem('response'));
		if( data && data.user.role == 'user') return <Redirect to='/reporter' />;
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
					? <Login 
						loadingClick={this.loading}
						handleLoginDisplay={this.props.handleLoginDisplay} />: ''
				}
				{(this.state.loading) 
					? <Loading />: ''
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
