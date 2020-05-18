import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class InstitutionSignedInLinks extends Component {

	logout = () => {
		localStorage.clear();
		this.props.loginDisappear();
		window.location.reload(true)
	}
	
	render() {
		return (
			<Nav className="ml-auto">
				<Nav.Link href="#home">
					<Link className="links" to='/'>View Institution Report</Link>
				</Nav.Link>
				<Nav.Link href="#link">
					<Link className="links" to='/' onClick={this.logout}>Logout</Link>
				</Nav.Link>
			</Nav>
		)
	}
}
