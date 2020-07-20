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
	sortByDate = () => {
		this.setState({
			sortByDate: true,
			sortByVotes: false,
		})
  }
  sortByVotes = () => {
		this.setState({
			sortByDate: false,
			sortByVotes: true,
		})
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
		}
		if(this.state.sortByVotes){
			reports4rmLocal.data.sort((a, b) => {
				return (b.upvoted.length - a.upvoted.length)
			})
			localStorage.setItem('sorts', JSON.stringify(reports4rmLocal))
		}
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