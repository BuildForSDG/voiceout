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
			errorMessage: '',
			isLoading: false,
			isValid: false,
			redirect: false,
			validLogin: true
		}

	}
	componentDidMount(){
		const {response} = this.props;
		let invalidResponse = response.message;
		if(response !== ''){
			this.props.notLoading();
			console.log(response);
			localStorage.clear();
			this.setState({
				validLogin: false,
				errorMessage: "Email or Password Incorrect",
				isLoading: false
			});
		}
		
		const getLocalStorage = JSON.parse(localStorage.getItem('response'));
		if(getLocalStorage && !getLocalStorage.hasOwnProperty('user')){
			localStorage.clear();
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
	}

	render() {
		const { response } = this.props;
		if(response !== '') {this.props.notLoading()};
		if(response.user && this.state.validLogin){
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
			if (localStorageNotUndefined){ return <Redirect to='/reporter' />}
		}
		return (
			<div>
				<div id="id01" class="modal">
					<form onSubmit={this.handleSubmit} class="modal-content animate">
		{/*<input type="hidden" name="_token" value={token} />*/}
						<div class="contain">
							<span onClick={this.props.loginDisappear} class="close" title="Close Modal">&times;</span>
							<div className='error-text'>
								<p className='submit-error text-center'>
									{(response.message) ? 'Invalid Login' : ''}
								</p>
							</div>
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