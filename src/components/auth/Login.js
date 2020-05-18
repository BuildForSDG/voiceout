import React, { Component } from 'react';
import '../../style/Form.css';
import { login } from '../../store/actions/authAction';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			isLoading: false,
			isValid: false,
			redirect: false
		}

	}

	handleChange = (e) => {
		this.setState({
				[e.target.name] : e.target.value
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.login(this.state);
		//this.props.handleLoginDisplay();
		this.props.loadingClick();

		if(this.props.response.user === undefined){
			this.setState({
				isLoading: true
			})
		}
	}

	render() {
		//console.log(this.state.isLoading)
		const { response } = this.props;
		if(response.user){
			const reporter = response.user.role == 'user';
			const voice = response.user.role == 'voice';
			const institution = response.user.role == 'institution';
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
			if (reporter && localStorageNotUndefined) return <Redirect to='/reporter' />
			if (voice && localStorageNotUndefined) return <Redirect to='/voice' />
			if (institution && localStorageNotUndefined) return <Redirect to='/institution' />
		}
		return (
			<div>
				<div id="id01" class="modal">
					<form onSubmit={this.handleSubmit} class="modal-content animate">
		{/*<input type="hidden" name="_token" value={token} />*/}
						<div class="contain">
							<span onClick={this.props.handleLoginDisplay} class="close" title="Close Modal">&times;</span>
							<label for="email">Email</label>
							<input
								type="email"
								placeholder="Enter Email"
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
		
							<button className="login" disabled={this.state.isLoading}>Login</button>
						</div>
				
						<div class="contain cancel-div">
							<button type="button"
								class="cancelbtn">
								Cancel
							</button>
							<span class="psw">Forgot <a href="#">password?</a></span>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		login: (params) => {
			dispatch(login(params))
		}
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)