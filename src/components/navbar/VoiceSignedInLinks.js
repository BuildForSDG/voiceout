import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class VoiceSignedInLinks extends Component {

	logout = () => {
		localStorage.clear();
		this.props.loginDisappear();
		window.location.reload(true)
	}
	render() {
		return (
			<Nav className="ml-auto">
				<Nav.Link href="">
					<Link className="links" to='/'>View Top 10 Reports</Link>
				</Nav.Link>
				<Nav.Link href="">
					<Link className="links" to='/'>View Reports By Institution</Link>
				</Nav.Link>
				<Nav.Link href="">
					<Link className="links" to='/' onClick={this.logout}>Logout</Link>
				</Nav.Link>
			</Nav>
		)
	}
}
