import PostReportData from '../../services/PostReportData';
import {asyncLocalStorage} from '../../services/asyncData'

export const postReport = (data) => {
	return (dispatch, getState) => {

		const getLocalStorage = JSON.parse(localStorage.getItem('response'));
    const token = getLocalStorage.token;
    console.log('loadingg');
    return PostReportData('reports', data, token)
		/*.then((response) => {
      console.log("response");
      asyncLocalStorage.setItem('reportResponse', response);
      
		})*/
		.then((response) => {
			console.log(response);
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