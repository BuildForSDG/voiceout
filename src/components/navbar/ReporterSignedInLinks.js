import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default class ReporterSignedInLinks extends Component {
    render() {
        return (
            <Nav className="ml-auto">
                <Nav.Link href="">
                    <Link className="links" to='/'>New Report</Link>
                </Nav.Link>
                <Nav.Link href="">
                    <Link className="links" to='/'>My Reports</Link>
                </Nav.Link>
                <Nav.Link href="">
                    <Link className="links" to='/'>Logout</Link>
                </Nav.Link>
            </Nav>
        )
    }
}
