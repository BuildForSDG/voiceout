import PostData from '../../services/PostData';
import {asyncLocalStorage} from '../../services/asyncData'

export const login = (data) => {
	return (dispatch) => {
		dispatch({type: 'USER_LOADING'});

		return PostData('login', data)
		.then((response) => {
			asyncLocalStorage.setItem('response', response);
		})
		.then(() => {
			return asyncLocalStorage.getItem('response');
		})
		.then((response) => {
			dispatch({
				type: 'LOGIN_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'LOGIN_ERROR', err: err})
		})
	}
}


export const signUp = (data) => {
	return (dispatch, getState) => {
		dispatch({type: 'USER_LOADING'});

		return PostData('register', data)
		.then((response) => {
			if(response.user){
				return PostData('login', data)
			}
			else{
				return 'Email Already in use';
			}
		})
		.then((response) => {
			asyncLocalStorage.setItem('response', response);
		})
		.then(() => {
			return asyncLocalStorage.getItem('response');
		})
		.then((response) => {
			dispatch({
				type: 'LOGIN_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'LOGIN_ERROR', err: err})
		})
	}
}