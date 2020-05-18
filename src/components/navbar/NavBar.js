import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'
import SignedOutLinks from './SignedOutLinks'
import InstitutionSignedInLinks from './InstitutionSignedInLinks';
import ReporterSignedInLinks from './ReporterSignedInLinks';
import VoiceSignedInLinks from './VoiceSignedInLinks';

class NavBar extends Component {
	constructor(props){
			super(props);
	}
		
	render() {
		let link = '';
		if (localStorage.getItem('response') == undefined){
			link = <SignedOutLinks 
				handleLoginDisplay={this.props.handleLoginDisplay}
			/>
		}
		if(localStorage.getItem('response') != undefined){
			let userRole= JSON.parse(localStorage.getItem('response')).user.role;
			switch (userRole) {
				case 'institution':
					link = <InstitutionSignedInLinks 
						loginDisappear={this.props.loginDisappear}
					/>
					break;
				case 'user':
					link = <ReporterSignedInLinks
						loginDisappear={this.props.loginDisappear}
					/>
					break;
				case 'voice':
					link = <VoiceSignedInLinks
						loginDisappear={this.props.loginDisappear}
					/>
					break;
				default:
					break;
			}
		}		
		return (
			<header className='nav-header'>
				<Container>
					<Navbar className="color-nav" bg='' expand="lg">
						<Navbar.Brand href="">
							<Link className="links brandName" to='/'>VoiceOut</Link>
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
