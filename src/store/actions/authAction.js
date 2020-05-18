import PostData from '../../services/PostData';
import {asyncLocalStorage} from '../../services/asyncData'

export const login = (data) => {
	return (dispatch, getState) => {
		dispatch({type: 'USER_LOADING'});

		return PostData('login', data)
		.then((response) => {
			asyncLocalStorage.setItem('response', response);
			//localStorage.setItem('response', JSON.stringify(response));
			//let x = JSON.parse(localStorage.getItem('response'));
			//console.log(x);
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