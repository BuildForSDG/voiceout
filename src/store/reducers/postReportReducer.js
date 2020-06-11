const initState = {
  response: '',
  authErr: null
}

const postReportReducer = (state = initState, action) => {
	switch(action.type){
		case 'POST_SUCCESS':
			return{
				...state,
        response: action.response,
        authError: null
			}
		case 'POST_ERROR':
			return{
				...state,
				authErr: action.err,
				response: ''
			}
		default:
			return state
	}
}

export default postReportReducer;