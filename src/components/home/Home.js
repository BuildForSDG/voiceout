import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import Login from '../auth/Login';
import NewReport from '../reporter/NewReport';
import { getSectors } from '../../services/getSector';
import { getReports } from '../../services/getReports';
import { nigerianStates } from '../reporter/nigerianStates';
import Loading from './Loading';
import {connect} from 'react-redux';
import SignUp from '../auth/SignUp';
//import { firstRow, secondRow, thirdRow } from '../reporter/selectSectorData';


class Home extends Component {
	constructor(props){
		super(props);

		this.state = {
			showAnonymousReportForm: false,
			loading: false,
			sectorFromBackEnd: '',
			sector_id: [],
			state: '',
			reports: ''
		}

	}
	
	componentDidMount(){
		const data = JSON.parse(localStorage.getItem('response'));
		if( data ){
			this.setState({
				loading: false
			})
		}

		if(this.state.sectorFromBackEnd === ''){
			this.setState({
				loading: true
			})
		}else{
			this.setState({
				loading: false
			})
		};
		if(true){
			return getSectors()
			.then(data => {
				this.setState({
					sectorFromBackEnd: data,
					loading: false
				});
			});
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
	}

	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		})
	}

	handleCheckbox = (e) => {
		let sector_id = this.state.sector_id;
		let index;
		if(e.target.checked){
			sector_id.push(e.target.value);
		}
		else{
			index = sector_id.indexOf(e.target.value);
      sector_id.splice(index, 1);
		}
		this.setState({
			sector_id: sector_id
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		console.log(this.state);
		return getReports(this.state)
		.then(data => {
			this.setState({
				reports: data,
				loading: false
			});
		}, setTimeout(() => {
			console.log(this.state);
		}, 10000));
	}

	render() {
		const { response } = this.props;
		const data = JSON.parse(localStorage.getItem('response'));
		if(response.user){
			//const localResponse = JSON.parse(localStorage.getItem('response'));
			const reporter = response.user.role == 'user';
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
			if (reporter && localStorageNotUndefined) return <Redirect to='/reporter' />
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
					{/*
						<Button onClick={this.handleShowReportForm}>Make a Report</Button>*/
					}
				</header>
				{(this.props.handleDisplayState.loginDisplay) 
					? <Login 
						loadingClick={this.loading}
						handleLoginDisplay={this.props.handleLoginDisplay} />: ''
				}
				{(this.props.handleDisplayState.signUpDisplay) 
					? <SignUp
						loadingClick={this.loading}
						handleSignUpDisplay={this.props.handleSignUpDisplay} />: ''
				}
				{(this.state.loading) 
					? <Loading />: ''
				}
				{(this.state.showAnonymousReportForm)
					? <NewReport handleShowReportForm={this.handleShowReportForm} />: ''
				}
				<div className="checkbox">
					<form onSubmit={this.handleSubmit} className="home_checkbox">
							<label for="sector">Select a Sector
								<span className="required">*</span>
							</label>
							<div class='sector-flex-container'>
								{	this.state.sectorFromBackEnd &&
									this.state.sectorFromBackEnd.map((data, i) => {
										return (
											<div key={i} class='sector-content'>
												<input type='checkbox' 
													name={data.name}
													onChange={this.handleCheckbox} 
													value={data.id} 
												/>
												<label for={data.name}> {data.name}</label><br />
											</div>
										)
									})
								}
							</div>
							<label for="state">Select a State
								<span className="required">*</span>
							</label>
							<select required name="state" value={this.state.state} onChange={this.handleChange}>
								<option value='' >Select a State</option>
								
								{
									nigerianStates.map((data, i) => {
										return (
											<option key={i} value={data}>{data.toUpperCase()}</option>
										)
									})									
								}
							</select>
						<div className="text-center">
							<Button onClick={this.handleSubmit} className="sector_submit">Submit</Button>
						</div>
					</form>
				</div>
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