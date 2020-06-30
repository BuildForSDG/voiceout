import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {
    postReportReducer, 
    userReportsReducer, 
    singleReportReducer
} from './postReportReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    reportPost: postReportReducer,
    userReports: userReportsReducer,
    singleReport: singleReportReducer
})

export default rootReducer;