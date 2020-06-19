import React, { Component } from 'react'
import ReportsList from '../reports/ReportsList';
import { dispatchAllUsersReports } from '../../store/actions/userReportAction';
import {connect} from 'react-redux';
import Loading from './Loading';

class SearchedReports extends Component {


  componentDidMount(){
    this.props.dispatchAllUsersReports()
  }
  render() {
    const {userReportsState} = this.props;
    console.log(userReportsState);
    if(userReportsState.userReports){
      return (
        <div>
          <div className='container text-center searched-reports-div'>
            <h1>All Reports
              {
                (userReportsState.hasOwnProperty(userReportsState)) ?
                " By " + userReportsState.userReportsState.state + " State" :
                ""
              }
            </h1>
            <div >
              <ReportsList />
              <h3>
                {
                  (userReportsState.userReports.data.length === 0) ? 
                  "No Results Found !!!" : 
                  ""
                }
              </h3>
            </div>
          </div>
        </div>
      )
    }
    else{
      return (
        <Loading />
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => {
	return{
		dispatchAllUsersReports: (params) => {
			dispatch(dispatchAllUsersReports(params))
		}
	}
}


const mapStateToProps = (state) => {
	console.log(state);
	return{
    userReportsState: state.userReports,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedReports)