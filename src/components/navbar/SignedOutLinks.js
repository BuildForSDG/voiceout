import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class SignedOutLinks extends Component {
    render() {
        return (
            <Nav className="ml-auto">
                <Nav.Link href="#home">
                    <Link className="links" to='/'>Sign Up</Link>
                </Nav.Link>
                <Nav.Link href="#link">
                    <Link onClick={this.props.handleLoginDisplay} className="links" to='/'>Login</Link>
                </Nav.Link>
            </Nav>
        )
    }
}
