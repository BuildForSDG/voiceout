
import {asyncLocalStorage} from '../../services/asyncData'

export const dispatchUserReports = () => {
	return (dispatch) => {

		asyncLocalStorage.getItem('userReports')
		.then((response) => {
			dispatch({
				type: 'REPORT_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'REPORT_ERROR', err: err})
		})
	}
}


export const dispatchAllUsersReports = () => {
	return (dispatch) => {

		asyncLocalStorage.getItem('allUsersReports')
		.then((response) => {
			dispatch({
				type: 'REPORT_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'REPORT_ERROR', err: err})
		})
	}
}

export const singleReport = () => {
	return (dispatch) => {

		asyncLocalStorage.getItem('singleData')
		.then((response) => {
			dispatch({
				type: 'SINGLE_REPORT_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'SINGLE_REPORT_ERROR', err: err})
		})
	}
}
