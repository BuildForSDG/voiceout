
import {asyncLocalStorage} from '../../services/asyncData'

export const dispatchUserReports = () => {
	return (dispatch, getState) => {

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
	return (dispatch, getState) => {

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
	return (dispatch, getState) => {

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