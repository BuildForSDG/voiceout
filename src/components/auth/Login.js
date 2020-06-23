import React, { Component } from 'react';
import '../../style/Form.css';
import { login } from '../../store/actions/authAction';
import {Redirect} from 'react-router-dom';
import BackgroundVideo from '../../images/BriberyVideo.mp4';
import BackgroundImage from '../../images/bribery-act-1.jpg';
import { connect } from 'react-redux';
import Loading from '../home/Loading';

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
			validLogin: true,
			cancle: false,
			reupdate: true
		}
	}

	componentDidMount(){
		const {response} = this.props;
		let invalidResponse = response.message;
		if(response !== ''){
			this.setState({
				isLoading: false
			});
		}
		
		const getLocalStorage = JSON.parse(localStorage.getItem('response'));
		if(getLocalStorage && !getLocalStorage.hasOwnProperty('user')){
			//localStorage.clear();
		}
	}
	componentDidUpdate(){
		if(this.props.response.message && this.state.reupdate){
			this.setState({
				isLoading: false,
				reupdate: false
			})
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
		//this.props.loadingClick();
		this.setState({
			isLoading: true
		})
	}
	toHome = () => {
		this.setState({
			cancel: true
		})
	}

	render() {
		const { response } = this.props;
		if(this.state.cancel){ return <Redirect to='/' /> }
		//if(response !== '') {this.props.notLoading()};
		if(response.user && this.state.validLogin){
			const localStorageNotUndefined = localStorage.getItem('response') != undefined;
			if (localStorageNotUndefined){ return <Redirect to='/reporter' />}
		}
		return (
			<div>
				<video 
					id='bgvideo' autoPlay loop muted 
					poster={BackgroundImage} 
					class="fullscreen-bg__video">
					<source src={BackgroundVideo} type="video/mp4" />
				</video>
				{(this.state.isLoading) 
					? <Loading />: ''
				}
				<div id="id01" className="modal">
					<form onSubmit={this.handleSubmit} className="modal-content animate">
		{/*<input type="hidden" name="_token" value={token} />*/}
						<div class="contain">
							<span onClick={this.toHome} className="close" title="Close Modal">&times;</span>
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