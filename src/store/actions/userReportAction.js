
import {asyncLocalStorage} from '../../services/asyncData'

export const dispatchUserReports = (data) => {
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


export const dispatchAllUsersReports = (data) => {
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