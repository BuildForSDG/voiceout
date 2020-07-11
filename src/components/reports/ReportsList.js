import React, { Component } from 'react'
import {connect} from 'react-redux';
import ReportsSummary from './ReportsSummary';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { asyncLocalStorage } from '../../services/asyncData';


class ReportsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			reports: '',
			canRedirect: false,
			sortByDate: false,
			sortByVotes: false,
			fromStorage: '',
			userReports: ''
		}
	}
	componentDidMount(){
		this.setState({
			fromStorage: JSON.parse(localStorage.getItem('sorts')),
			reports: this.props.reports,
		})
	}
	handleUserNotLoggedIn = () => {
		localStorage.setItem('notLoggedInMessage', 'Not Logged In');
		this.setState({
			canRedirect: true,
		});
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
	//--------------------------------------//
	//these functions were create so that one function can execute after the other.
	sortByVotesCallFunction = () => {
		const returnedReports = this.props.userReports.userReports;
		console.log(returnedReports)
		returnedReports.data.sort((a, b) => {
			return (b.upvoted.length - a.upvoted.length)
		})
		return this.setItemSortFunction(returnedReports);
	}
	sortByDateCallFunction = () => {
		const returnedReports = this.props.userReports.userReports;
		returnedReports.data.sort(this.compareSort);
		return this.setItemSortFunction(returnedReports);
	}
	setItemSortFunction = (param) => {
		asyncLocalStorage.setItem('sorts', param);
		return this.getItemSortFunction();
	}
	getItemSortFunction = () => {
		return asyncLocalStorage.getItem('sorts');
	}

	//--------------------------------------------//
	sortByDate = () => {
		let res = this.sortByDateCallFunction()
		this.setState({
			sortByDate: true,
			sortByVotes: false,
			fromStorage: res
		})
  }
  sortByVotes = () => {
		let res = this.sortByVotesCallFunction()
		this.setState({
			sortByDate: false,
			sortByVotes: true,
			fromStorage: res
		})
		setTimeout(() => {
			console.log(this.state.fromStorage)
		}, 10000)
  }
	render() {
		if (this.state.canRedirect) {return <Redirect to='/' />}
		//Just imagine sort was able to modify userReports even when i didnt 
		//call the fuction on it.
		const { userReports: {userReports} } = this.props;
		let returnedReports = userReports;
		let reports4rmLocal = localStorage.getItem('sorts') ?
													JSON.parse(localStorage.getItem('sorts')) :
													returnedReports;
		if(this.state.sortByDate){
			reports4rmLocal.data.sort(this.compareSort);
			localStorage.setItem('sorts', JSON.stringify(reports4rmLocal))
			//asyncLocalStorage.setItem('sorts', reports4rmLocal);
		}
		if(this.state.sortByVotes){
			reports4rmLocal.data.sort((a, b) => {
				return (b.upvoted.length - a.upvoted.length)
			})
			localStorage.setItem('sorts', JSON.stringify(reports4rmLocal))
			//asyncLocalStorage.setItem('sorts', reports4rmLocal);
		}
		console.log(this.state.fromStorage);
		return (
			<div>
				<div className=' btn-group-small' >
					<Button
						className='btn-sm'
						onClick={this.sortByDate} 
						style={{margin: '10px'}}
					>
						Sort By Date
					</Button>
					<Button
						className='btn-sm'
						onClick={this.sortByVotes} 
						style={{margin: '10px'}}
					>
						Sort By Upvotes
					</Button>
				</div>

				{/*mapping reports from props*/}
				{	
					reports4rmLocal && reports4rmLocal.data.map((data, i) => {
						return (
							<Link key={i} className="links" to={'/report/' + data.id}>
								<ReportsSummary anonymous={this.props.anonymous} data={data}/>	
							</Link>
						)
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
			userReports: state.userReports,
	}
}

export default connect(mapStateToProps, null)(ReportsList)