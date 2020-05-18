const initState = {
	authErr: null,
	response: '',
	isAuthenticated: null,
	isLoading: false,
}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case 'LOGIN_ERROR':
		case 'AUTH_ERROR':
		case 'LOGOUT_SUCCESS':
		case 'SIGNUP_ERROR':
			return{
				...state,
				response: '',
				isAuthentication: null,
				token: null,
				isLoading: false,
				authErr: action.err
			}
		case 'LOGIN_SUCCESS':
			return{
				...state,
				isAuthenticated: true,
				isLoading: false,
				authErr: null,
				response: action.response
			}
		case 'SIGNUP_SUCCESS':
			console.log('Signed Up Success');
			return{
				...state,
				isAuthenticated: true,
				isLoading: false,
				authErr: null,
				response: action.response
			}
		default:
			return state
	}
}

export default authReducer;