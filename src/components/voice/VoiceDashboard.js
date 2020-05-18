import React, { Component } from 'react';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import NewReport from '../reporter/NewReport';


class VoiceDashboard extends Component {
	constructor(props){
		super(props);
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
						<h1>Welcome <span className="name">{storage ? storage.user.name : ''}</span></h1>
						<h2>
							“Until justice rolls down like water and righteousness like a mighty stream.”
						</h2>
						<h3>― Martin Luther King Jr.</h3>
					</header>
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

export default connect(mapStateToProps, null)(VoiceDashboard)