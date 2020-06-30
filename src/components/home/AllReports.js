import React, { Component } from 'react'
import ReportsList from '../reports/ReportsList';
import Loading from './Loading';
import { getReports } from '../../services/getReports';
import { asyncLocalStorage } from '../../services/asyncData';
import { dispatchAllUsersReports } from '../../store/actions/userReportAction';
import {connect} from 'react-redux';

class AllReports extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  compareSort = (a, b) => {
		const A = new Date(a.created_at).getTime();
		const B = new Date(b.created_at).getTime();

		let comparison = 0;
		if(A > B){
			comparison = -1;
		}else if(A < B){
			comparison = 1;
		}
		return comparison;
  }
  
  componentDidMount(){
    return getReports()
		.then(data => {
      data.sort(this.compareSort);
			const res = { data };
      asyncLocalStorage.setItem('allUsersReports', res);
		})
		.then(() => {
			this.props.dispatchAllUsersReports()
		})
		.then(() => {
      console.log(78)
			this.setState({
				loading: false,
			})
		});
  }
  render() {
    if(!this.state.loading){
      return (
        <div>
          <div className='container text-center searched-reports-div'>
            <h1>All Reports</h1>
            <div >
              <ReportsList />
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

export default connect(null, mapDispatchToProps)(AllReports)