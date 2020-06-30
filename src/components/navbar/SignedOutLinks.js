import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export default class SignedOutLinks extends Component {
	render() {
		return (
			<Nav className="ml-auto">
				<Nav.Link href="#home">
					<Link onClick={this.props.handleSignUpDisplay} to='/sign-up' className="links">Sign Up</Link>
				</Nav.Link>
				<Nav.Link href="#link">
					<Link onClick={this.props.handleLoginDisplay} to="/login" className="links">Login</Link>
				</Nav.Link>
			</Nav>
		)
	}
}
