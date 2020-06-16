import { combineReducers } from 'redux';
import authReducer from './authReducer';
import {postReportReducer, 
    userReportsReducer, 
    allUsersReportsReducer
} from './postReportReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    reportPost: postReportReducer,
    userReports: userReportsReducer,
    allUsersReports: allUsersReportsReducer
})

export default rootReducer;