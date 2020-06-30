import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export default class ReporterSignedInLinks extends Component {
	constructor(props){
		super(props);
		this.state = {
			toHome: false
		}
	}
	logout = () => {
		localStorage.clear();
		this.props.loginDisappear();
		this.props.signUpDisappear();
		window.location.reload(true);
		this.setState({
			toHome: true
		})
	}
	render() {
		if(this.state.toHome) { return <Redirect to='/' />}
		return (
			<Nav className="ml-auto">
				<Nav.Link href="">
					<Link className="links" to='/all_reports'>All Reports</Link>
				</Nav.Link>
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
