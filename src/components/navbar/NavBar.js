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
				let demo = 1;
				switch (demo) {
						case 1:
								link = <SignedOutLinks 
														handleLoginDisplay={this.props.handleLoginDisplay}
												/>
								break;
						case 2:
								link = <InstitutionSignedInLinks />
								break;
						case 3:
								link = <ReporterSignedInLinks />
								break;
						case 4:
								link = <VoiceSignedInLinks />
								break;
						default:
								break;
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

export default NavBar;