import React, { Component } from 'react';
import ReportsList from '../reports/ReportsList';
import '../../style/Home.css'
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import Login from '../auth/Login';


export default class Home extends Component {
	constructor(props){
		super(props);

	}

	componentDidMount(){
		//make api calls here
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
					<Button>Make a Report</Button>
				</header>
				{(this.props.handleDisplayState.loginDisplay) 
						? <Login handleLoginDisplay={this.props.handleLoginDisplay} />: ''}
				{/*pass in results from api calls as props to ReportsList comp*/}
				<ReportsList />
			</div>
		)
	}
}
