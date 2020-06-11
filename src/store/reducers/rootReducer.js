import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReportReducer from './postReportReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    reportPost: postReportReducer
})

export default rootReducer;