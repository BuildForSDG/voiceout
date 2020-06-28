import React, { Component } from 'react';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css';
import '../../style/Anonymous.css';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import NewReport from '../reporter/NewReport';
import { getSectors } from '../../services/getSector';
import {asyncLocalStorage} from '../../services/asyncData';
import { getUserReports } from '../../services/getReports';
import Loading from '../home/Loading';
import { dispatchUserReports } from '../../store/actions/userReportAction';
import NoReport from './NoReport';


class ReporterDashboard extends Component {
	constructor(props){
		super(props);

		this.state = {
			showReportForm: false,
			sectorFromBackEnd: '',
			loading: false,
			reports: '',
			anonymous: false
			//localStorageData: ''
		}

	}

	filterFunction = (data) => {
		const getLocalStorage = JSON.parse(localStorage.getItem('response'));
		return data.user.id === getLocalStorage.user.id
	}
	compareSort = (a, b) => {
		const A = new Date(a.created_at).getTime();
		const B = new Date(b.created_at).getTime();

		let comparison = 0;
		if(A > B){
			comparison = -1;
		}else if(A < B){
			comparison = 1;
		}
		return comparison;
	}
	componentDidMount(){
		if(this.state.sectorFromBackEnd === ''){
			this.setState({
				loading: true
			})
		}else{
			this.setState({
				loading: false
			})
		};
		if(localStorage.getItem('response')){
			getSectors()
			.then(data => {
				console.log(data);
				this.setState({
					sectorFromBackEnd: data,
					loading: false
				});
			});
		}
		if(this.state.reports === ''){
			this.setState({
				loading: true
			})
		}
		//const getLocalStorage = JSON.parse(localStorage.getItem('response'));
		if(localStorage.getItem('response')){
			getUserReports()
			.then( data => {
				const res = {
					data: data.filter(this.filterFunction).sort(this.compareSort)
				};
				asyncLocalStorage.setItem('userReports', res);
			})
			.then(() => {
				this.props.dispatchUserReports();
			})
		}
	}
	
	handleAnonymousToggle = () => {
		this.setState({
			anonymous: !this.state.anonymous
		})
	}
	
	handleShowReportForm = () => {
		this.setState({
			showReportForm: !this.state.showReportForm
		})
	}

	render() {
		const getLocalStorage = JSON.parse(localStorage.getItem('response'));
		console.log(getLocalStorage);
		if(localStorage.getItem('response') == undefined) {return <Redirect to='/' />}
		const { userReports } = this.props;    
		if(localStorage.getItem('response') != undefined){
			//console.log(JSON.parse(localStorage.getItem('response')));
			const storage = JSON.parse(localStorage.getItem('response'));
			return (
				<div className={
					this.state.anonymous ?
					'anonymous text-center':
					'text-center'
				}>
					<header className='reporter-header text-center'>
						<Button 
							className={
								this.state.anonymous?
								'anonymous-yellow':
								''
							} 
							onClick={this.handleAnonymousToggle}>
							{
								this.state.anonymous ?
								'Go Visible':
								'Go Anonymous'
							}
						</Button>
						<h1>Welcome 
							<span 
								className={
									this.state.anonymous?
									'anonymous-yellow name':
									'name'
								}
							>
								{storage ? " " + storage.user.first_name + " " + storage.user.last_name : ''}
							</span>
						</h1>
						<h2>
						“The rights of every man are diminished when the rights of one man are threatened 
						</h2>
						<Button
							className={
								this.state.anonymous?
								'anonymous-yellow':
								''
							} 
							onClick={this.handleShowReportForm}>Make a Report</Button>
					</header>
					{(this.state.showReportForm)
						? <NewReport
								anonymous={this.state.anonymous}
								sectors={this.state.sectorFromBackEnd} 
								handleShowReportForm={this.handleShowReportForm} 
							/>: ''
					}
					{(this.state.loading) 
						? <Loading />: ''
					}
					<h3 
						className={
							this.state.anonymous?
							'yellow text-center':
							'text-center reportHeader'
						}
					>My Reports</h3>
					{/*pass in results from api calls as props to ReportsList comp*/}
					{(!this.state.loading)
						? <ReportsList anonymous={this.state.anonymous} /> : ''
					}
					{
						userReports.userReports && userReports.userReports.data.length == 0 ?
						<NoReport anonymous={this.state.anonymous}/> : ''
					}
				</div>
			)
		}
		//console.log(this.state.localStorageData);
		//console.log(this.props.handleDisplayState.loginDisplay)
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		dispatchUserReports: (params) => {
			dispatch(dispatchUserReports(params))
		}
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return{
			response: state.auth.response,
			reportPost: state.reportPost.response,
			userReports: state.userReports,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReporterDashboard);