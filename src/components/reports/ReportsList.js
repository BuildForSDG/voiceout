import React, { Component } from 'react'
import {connect} from 'react-redux';
import ReportsSummary from './ReportsSummary';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
//import { asyncLocalStorage } from '../../services/asyncData';


class ReportsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			reports: '',
			canRedirect: false,
			sortByDate: true,
      sortByVotes: false
		}
	}
	componentDidMount(){
		this.setState({
			reports: this.props.reports
		})
	}
	handleUserNotLoggedIn = () => {
		localStorage.setItem('notLoggedInMessage', 'Not Logged In');
		this.setState({
			canRedirect: true,
		});
		console.log("object")
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
	sortByDate = () => {
    this.setState({
      sortByDate: true,
      sortByVotes: false
    })
  }
  sortByVotes = () => {
    this.setState({
      sortByDate: false,
      sortByVotes: true
    })
  }
	render() {
		if (this.state.canRedirect) {return <Redirect to='/' />}
		const { userReports: {userReports} } = this.props;
		//Just imagine sort was able to modify userReports even when i didnt 
		//call the fuction on it.
		let returnedReports = userReports;
		console.log(userReports);
		if(this.state.sortByVotes){
			returnedReports.data.sort((a, b) => {
				return (b.upvoted.length - a.upvoted.length)
			})
			console.log(returnedReports);
			console.log(userReports)
		}
		if(this.state.sortByDate){
			returnedReports.data.sort(this.compareSort)
			console.log(userReports)
		}
		const storageData = JSON.parse(localStorage.getItem('response'));
		return (
			<div>
				<div >
					<Button onClick={this.sortByDate} style={{margin: '10px'}}>Sort By Date</Button>
					<Button onClick={this.sortByVotes} style={{margin: '10px'}}>Sort By Upvotes</Button>
				</div>
				
				{/*mapping reports from props*/}
				{	
					returnedReports && returnedReports.data.map((data, i) => {
						return (
							storageData && storageData.user  ? 
							<Link key={i} className="links" to={'/report/' + data.id}>
								<ReportsSummary anonymous={this.props.anonymous} data={data}/>	
							</Link>
							:
							<Link key={i} onClick={this.handleUserNotLoggedIn}>
								<ReportsSummary data={data}/>	
							</Link>
						)
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	//console.log(state.userReports.userReports.data);
	return{
			userReports: state.userReports,
	}
}

export default connect(mapStateToProps, null)(ReportsList)