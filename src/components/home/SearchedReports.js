import React, { Component } from 'react'
import ReportsList from '../reports/ReportsList';
import { dispatchAllUsersReports } from '../../store/actions/userReportAction';
import {connect} from 'react-redux';

class SearchedReports extends Component {


  componentDidMount(){
    this.props.dispatchAllUsersReports()
  }
  render() {
    const {userReportsState} = this.props;
    return (
      <div>
        <div className='container text-center searched-reports-div'>
          <h1>All Reports
            {
              (userReportsState) ?
              " By " + userReportsState + " State" :
              ""
            }
          </h1>
          <div >
            <ReportsList handleLoginDisplay={this.props.handleLoginDisplay}/>
          </div>
        </div>
      </div>
    )
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
    userReportsState: state.userReports.userReports.state,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchedReports)