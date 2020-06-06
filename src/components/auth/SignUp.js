import React, { Component } from 'react';
import '../../style/Form.css';
import { login, signUp } from '../../store/actions/authAction';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
      password: '',
      first_name: '',
      last_name: '',
      confirm_password: '',
      validPassword: false,
      validEmail: false,
      validFirstName: false,
      validLastName: false,
      validConfirmPassword: false,
      submitError: '',
      formValid: false,
			reportFormError: {
				email: '',
        password: '',
        first_name: '',
        last_name: '',
        confirm_password: '',
			},
			isLoading: false,
			isValid: false,
			redirect: false,
			validLogin: true
		}

	}
  
  validateInput = (fieldName, value) => {
		let validEmail = this.state.validEmail;
		let validPassword = this.state.validPassword;
		let validFirstName = this.state.validFirstName;
		let validLastName = this.state.validLastName;
		let validConfirmPassword = this.state.validConfirmPassword;
		let reportFormError = this.state.reportFormError;
		
		switch (fieldName) {
			case 'email':
				validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
				reportFormError.email = validEmail ? '': 'The Email is invalid(must be in the format abc@def.com)';
				break;
			case 'password':
				validPassword = value.length >= 6;
				reportFormError.password = validPassword ?
					'': 'password must be 6 or more characters';
				break;
			case 'first_name':
				validFirstName = value.length > 2;
				reportFormError.first_name = validFirstName ?
					'': 'First Name must be more than 3 characters';
				break;
        case 'last_name':
          validLastName = value.length > 2;
          reportFormError.last_name = validLastName ?
            '': 'last Name must be more than 3 characters';
				break;
			case 'confirm_password':
				validConfirmPassword = value === this.state.password;
				reportFormError.confirm_password = validConfirmPassword ? 
					'': 'Passwords do not match';
				break;	
			default:
				break;
		}
	
		this.setState({
			validPassword,
      validEmail,
      validFirstName,
      validLastName,
      validConfirmPassword,
			reportFormError
		}, this.validatePost)
	}

	validatePost = () => {
		this.setState({
			formValid: this.state.validEmail
				&& this.state.validFirstName
				&& this.state.validLastName
				&& this.state.validPassword
				&& this.state.validConfirmPassword
		})
	}
  
  handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		}, () => {
			this.validateInput(name, value);
		})
	}
	
	handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.formValid){
      this.props.signUp(this.state)
    }
		
		this.props.loadingClick();
	}

	render() {
		//console.log(this.state.isLoading)
		const { response } = this.props;
		if(response.user && this.state.validLogin){
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
			if (localStorageNotUndefined) return <Redirect to='/reporter' />
		}
		return (
			<div>
				<div id="id01" class="modal">
					<form onSubmit={this.handleSubmit} class="modal-content animate">
		{/*<input type="hidden" name="_token" value={token} />*/}
						<div class="contain">
							<span onClick={this.props.handleSignUpDisplay} class="close" title="Close Modal">&times;</span>
							<div className='error-text'>
								<p className='submit-error text-center'>
									{(this.state.validLogin) ? '' : 'Invalid Login details'}
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
              
              <label for="first_name">First Name</label>
							<input
								type="text"
								placeholder="Enter First Name"
								name="first_name"
								onChange={this.handleChange}
								required
              />
              
              <label for="last_name">Last Name</label>
							<input
								type="text"
								placeholder="Enter Last Name"
								name="last_name"
								onChange={this.handleChange}
								required
							/>
				
							<label for="password">Password</label>
							<input
								type="password"
								placeholder="Enter Password"
								name="password"
								onChange={this.handleChange}
								required
							/>

              <label for="confirm_password">Comfirm Password</label>
							<input
								type="password"
								placeholder="Enter Password again"
								name="confirm_password"
								onChange={this.handleChange}
								required
							/>

							<button className="login" disabled={this.state.isLoading}>Sign Up</button>
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
		signUp: (params) => {
			dispatch(signUp(params))
		}
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return{
			response: state.auth.response
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)