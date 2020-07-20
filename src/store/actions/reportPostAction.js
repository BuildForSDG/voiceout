import PostReportData from '../../services/PostReportData';

export const postReport = (data) => {
	return (dispatch) => {

		const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    return PostReportData('reports', data, token)
		.then((response) => {
			dispatch({
				type: 'POST_SUCCESS',
				reportResponse: response
      })
		})
		.catch((err) => {
			dispatch({type: 'POST_ERROR', err: err})
		})
	}
}