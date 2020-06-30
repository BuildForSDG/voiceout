import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap'
import SignedOutLinks from './SignedOutLinks'
import ReporterSignedInLinks from './ReporterSignedInLinks';

class NavBar extends Component {
	constructor(props){
		super(props);
	}
		
	render() {
		let link = '';
		let data = JSON.parse(localStorage.getItem('response'));
		let dataIsAvailable = data && !data.hasOwnProperty('user');
		if ( data == undefined || dataIsAvailable ){
			link = <SignedOutLinks 
				handleLoginDisplay={this.props.handleLoginDisplay}
				handleSignUpDisplay={this.props.handleSignUpDisplay}
			/>
		}
		if(localStorage.getItem('response') != undefined ){
			let data = JSON.parse(localStorage.getItem('response'));
			if(data.user){
				link = <ReporterSignedInLinks
					loginDisappear={this.props.loginDisappear}
					signUpDisappear={this.props.signUpDisappear}

				/>
			}
			
		}		
		return (
			<header className='nav-header'>
				<Container>
					<Navbar className="color-nav" bg='' expand="lg">
						<Navbar.Brand href="">
							<Link
								className="links brandName" 
								to='/'>
									VoiceOut
							</Link>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							{link}
						</Navbar.Collapse>
					</Navbar>
				</Container>
			</header>
		)
	}
}

const mapStateToProps = (state) => {
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, null)(NavBar)
