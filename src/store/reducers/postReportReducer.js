import {asyncLocalStorage} from '../../services/asyncData'

const initState = {
  response: '',
  authErr: null
}

export const postReportReducer = (state = initState, action) => {
	switch(action.type){
		case 'POST_SUCCESS':
			return{
				...state,
        response: action.reportResponse,
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
const reportState = {
	userReports: '',
	err: ''
}
export const userReportsReducer = (state = reportState, action) => {
	switch (action.type) {
		case 'REPORT_SUCCESS':
			return {
				...state,
				userReports: action.response
			}
		case 'REPORT_ERROR':
			return{
				...state,
				err: action.err,
				userReports: ''
			}
		default:
			return state
	}

}

const allReportState = {
	singleReport: '',
	err: ''
}
export const singleReportReducer = (state = allReportState, action) => {
	switch (action.type) {
		case 'SINGLE_REPORT_SUCCESS':
			return {
				...state,
				singleReport: action.response
			}
		case 'SINGLE_REPORT_ERROR':
			return{
				...state,
				err: action.err,
				singleReport: ''
			}
		default:
			return state
	}

}
