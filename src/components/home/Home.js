import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import BackgroundVideo from '../../images/BriberyVideo.mp4';
import BackgroundImage from '../../images/bribery-act-1.jpg';
import '../../style/Home.css';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import NewReport from '../reporter/NewReport';
import { getSectors } from '../../services/getSector';
import { getReports } from '../../services/getReports';
import { nigerianStates } from '../reporter/nigerianStates';
import Loading from './Loading';
import {asyncLocalStorage} from '../../services/asyncData';
import {connect} from 'react-redux';
import { dispatchAllUsersReports } from '../../store/actions/userReportAction';
//import { firstRow, secondRow, thirdRow } from '../reporter/selectSectorData';


class Home extends Component {
	constructor(props){
		super(props);

		this.state = {
			canRedirect: false,
			showAnonymousReportForm: false,
			loading: false,
			sectorFromBackEnd: '',
			sector_id: '',
			state: '',
			reports: '',
			reload: false
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
		}
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
		if( data == undefined || data.message){
			this.setState({
				loading: true
			})
		}
	}
	notLoading = () => {
		this.setState({
			loading: false
		})
	}

	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		})
	}

	handleCheckbox = (e) => {
		/*let sector_id = this.state.sector_id;
		let index;
		if(e.target.checked){
			sector_id.push(e.target.value);
		}
		else{
			index = sector_id.indexOf(e.target.value);
      sector_id.splice(index, 1);
		}*/
		this.setState({
			sector_id: e.target.value
		});
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		console.log(this.state);
		return getReports(this.state)
		.then(data => {
			const res = {
				data: data.sort(this.compareSort),
				state: this.state.state
			}
			asyncLocalStorage.setItem('allUsersReports', res);
		})
		.then(() => {
			this.props.dispatchAllUsersReports()
		})
		.then(() => {
			this.setState({
				loading: false,
				canRedirect: true
			})
		});
	}

	render() {
		if (this.state.canRedirect) {return <Redirect to='/all_searched_reports' />}
		const { response } = this.props;
		const data = JSON.parse(localStorage.getItem('response'));
		if(response.user){
			//const localResponse = JSON.parse(localStorage.getItem('response'));
			const reporter = response.user.role == 'user';
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
		}
		return (
			<div className='homeContainer container'>
				<video 
					id='bgvideo' autoPlay loop muted 
					poster={BackgroundImage} 
					class="fullscreen-bg__video">
					<source src={BackgroundVideo} type="video/mp4" />
				</video>
				
				<header className='home-header text-center'>
					<div className='error-text'>
						<p className='submit-error text-center'>
							{
								localStorage.getItem('notLoggedInMessage') !== null ? 
								"You must login to view reports in details" : 
								""
							}
						</p>
					</div>
					<Button><a className='search' href='#search'> Search Report </a></Button>
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
					<div id='aboutList'>
						<p>Are you being <b>Oppressed</b> in one way or the other?</p>
						<p>Do you have any picture or video evidence?</p>
						<p>Login to make a <b>Report today</b></p>
					</div>
				</header>
				{/*(this.props.handleDisplayState.loginDisplay) 
					? <Login 
						notLoading={this.notLoading}
						loadingClick={this.loading}
						handleLoginDisplay={this.props.handleLoginDisplay}
						loginDisappear={this.props.loginDisappear} />: ''
				}
				{(this.props.handleDisplayState.signUpDisplay) 
					? <SignUp
						notLoading={this.notLoading}
						loadingClick={this.loading}
						handleSignUpDisplay={this.props.handleSignUpDisplay} />: ''*/
				}
				{(this.state.loading) 
					? <Loading />: ''
				}
				{(this.state.showAnonymousReportForm)
					? <NewReport handleShowReportForm={this.handleShowReportForm} />: ''
				}
				<div id='search' className="checkbox">
					<form onSubmit={this.handleSubmit} className="home_checkbox">
						<h4>Use the filter below to search for Reports by Sector and by State</h4>
						
						<label 
							style={{fontSize: '20px'}} 
							className='labelHome' 
							for="sector">Select a Sector
							<span className="required">*</span>
						</label>
						<div class='sector-flex-container'>
							<div class='sector-content'>
								<input type='radio' 
									name='sector_id'
									onChange={this.handleCheckbox} 
									value='' 
								/>{" "}
								<label 
									className='inputLabelHome'
									for='all'> All </label><br />
							</div>
							{	this.state.sectorFromBackEnd &&
								this.state.sectorFromBackEnd.map((data, i) => {
									return (
										<div key={i} class='sector-content'>
											<input type='radio' 
												name='sector_id'
												onChange={this.handleCheckbox} 
												value={data.id} 
											/>{" "}
											<label 
												className='inputLabelHome'
												for={data.name}> {data.name}</label><br />
										</div>
									)
								})
							}
						</div>
						<label 
							style={{fontSize: '20px'}} 
							className='labelHome'
							for="state">Select a State
							<span className="required">*</span>
						</label>
						<select required name="state" value={this.state.state} onChange={this.handleChange}>
							<option value=''> All States</option>
							
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

const mapDispatchToProps = (dispatch) => {
	return{
		dispatchAllUsersReports: (params) => {
			dispatch(dispatchAllUsersReports(params))
		}
	}
}


const mapStateToProps = (state) => {
	console.log(state);
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)