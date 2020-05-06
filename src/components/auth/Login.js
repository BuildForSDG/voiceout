import React, { Component } from 'react';
import '../../style/Login.css';

export default class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		}

	}

	handleChange = (e) => {
		this.setState({
				[e.target.name] : e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state)
	}

	render() {
		return (
			<div>
				<div id="id01" class="modal">
					<form onSubmit={this.handleSubmit} class="modal-content animate">
						<span onClick={this.props.handleLoginDisplay} class="close" title="Close Modal">&times;</span>
						<div class="contain">
							<label for="uname">Username</label>
							<input
								type="email"
								placeholder="Enter Username"
								name="email"
								onChange={this.handleChange}
								required
							/>
				
							<label for="psw">Password</label>
							<input
								type="password"
								placeholder="Enter Password"
								name="password"
								onChange={this.handleChange}
								required
							/>
		
							<button className="login">Login</button>
						</div>
				
						<div class="contain cancel-div">
							<button type="button" onClick={this.props.handleLoginDisplay} class="cancelbtn">Cancel</button>
							<span class="psw">Forgot <a href="#">password?</a></span>
						</div>
					</form>
				</div>
			</div>
		)
	}
}