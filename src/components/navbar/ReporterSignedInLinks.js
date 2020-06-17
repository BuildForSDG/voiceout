import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class ReporterSignedInLinks extends Component {
	constructor(props){
		super(props);
	}
	logout = () => {
		localStorage.clear();
		this.props.loginDisappear();
		this.props.signUpDisappear();
		window.location.reload(true);
	}
	render() {
		
		return (
			<Nav className="ml-auto">
				<Nav.Link href="">
					<Link className="links" to='/reporter'>My Reports</Link>
				</Nav.Link>
				<Nav.Link href="">
					<Link className="links" to='/' onClick={this.logout}>Logout</Link>
				</Nav.Link>
			</Nav>
		)
	}
}
