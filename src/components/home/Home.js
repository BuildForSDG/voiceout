import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import Login from '../auth/Login';
import NewReport from '../reporter/NewReport';
import Loading from './Loading';
import {connect} from 'react-redux';


class Home extends Component {
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
		const { response } = this.props;
		console.log(this.state.loading);
		const data = JSON.parse(localStorage.getItem('response'));
		if(response.user){
			//const localResponse = JSON.parse(localStorage.getItem('response'));
			const reporter = response.user.role == 'user';
			const voice = response.user.role == 'voice';
			const institution = response.user.role == 'institution';
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
			if (reporter && localStorageNotUndefined) return <Redirect to='/reporter' />
			if (voice && localStorageNotUndefined) return <Redirect to='/voice' />
			if (institution && localStorageNotUndefined) return <Redirect to='/institution' />
		}
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
const mapStateToProps = (state) => {
	//console.log(state);
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, null)(Home)