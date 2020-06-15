import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { asyncLocalStorage } from '../../services/asyncData';

export default class SignedOutLinks extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<Nav className="ml-auto">
				<Nav.Link href="#home">
					<Link onClick={this.props.handleSignUpDisplay} className="links">Sign Up</Link>
				</Nav.Link>
				<Nav.Link href="#link">
					<Link onClick={this.props.handleLoginDisplay} className="links">Login</Link>
				</Nav.Link>
			</Nav>
		)
	}
}
