import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import { asyncLocalStorage } from '../../services/asyncData';
import { singleReport } from '../../store/actions/userReportAction';
import Loading from '../home/Loading';
import Image from 'react-bootstrap/Image'
import { dateFromData } from '../../services/dateFromData';
import PostComment from '../../services/postComment';
import { upvote, downvote } from '../../services/votes';
import { getVotes } from '../../services/getVotes';


class ReportDetails extends Component {
	constructor(props){
		super(props);
		this.state = {
			singleReport: '',
			upvotes: '',
			downvotes: '',
			comment: '',
			commentValid: false,
			upvote: false,
			downvote: false
		}
	}
	componentDidMount(){
		const { match: { params } } = this.props;
		const {userReports} = this.props;
		const data = JSON.parse(localStorage.getItem('response'));
		if( data.user != undefined && userReports){
			const singleData = userReports.filter(data => {
				return data.id == params.id
			})
			asyncLocalStorage.setItem('singleData', singleData[0]);
		}
		setTimeout(() => {
			this.props.singleReport();
		}, 1000);
		if(data.user !== undefined){
			const getLocalStorage = JSON.parse(localStorage.getItem('response'));
			const user_id = getLocalStorage.user.id;
			getVotes(params.id)
			.then(res => {
				this.setState({
					upvote: res.upvoted.includes(user_id),
					downvote: res.downvoted.includes(user_id),
					upvotes: res.upvoted.length,
					downvotes: res.downvoted.length
				})
			});
		}
		
	}

	handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		this.setState({
				[name]: value
		}, () => {
				this.validateContent(name, value)
		})
  }
  validateContent = (fieldName, value) => {
		const commentValid = this.state.commentValid;
		if (fieldName === 'comment'){
				commentValid = value.length > 2;
		}
		this.setState({commentValid})
  }
  handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
				comment: ''
		})
		const id = this.props.match.params.id;
		PostComment(id, this.state.comment)
		.then((res) => console.log(res));
	}
	upvote = () => {
		const id = this.props.match.params.id;
		upvote(id);
		getVotes(id)
		.then(res => {
			this.setState({
				upvotes: res.upvoted.length,
				downvotes: res.downvoted.length,
				upvote: true,
				downvote: false
			})
		})
	}
	downvote = () => {
		const id = this.props.match.params.id;
		downvote(id);
		getVotes(id)
		.then(res => {
			this.setState({
				downvotes: res.downvoted.length,
				upvotes: res.upvoted.length,
				upvote: false,
				downvote: true
			})
		})
	}
	render() {
		const {oneReport} = this.props;
		const data = JSON.parse(localStorage.getItem('response'));
		if(data.user == undefined ) {return <Redirect to='/' />}
		if(oneReport && oneReport.id == this.props.match.params.id){
			const date = dateFromData(oneReport);
			return (
				<div className='container singleReport-body'>
					<div class='singleReport'>
						<h1>{oneReport.title}</h1>
						<figure className='inside-flex'>
							<Image 
								src={
									(oneReport.media_url.images) ? 
									oneReport.media_url.images : 
									"https://i1.wp.com/ilikeweb.co.za/wp-content/uploads/2019/07/placeholder.png?ssl=1"
								}
								fluid
							/>
							<figcaption>{oneReport.title}</figcaption>
						</figure>
						{
							oneReport.media_url.videos ? 
							<video id="video1" width="420" autoplay>
								<source src={oneReport.media_url.videos}/>
								Your browser does not support HTML video.
							</video>
							:''
						}
						<p className='time'>Reported on {date.days[date.day]}, 
							{" " + date.date} - 
							{date.months[date.month]} - 
							{date.year + " "} at
							{" " + date.hours}: 
							{date.minutes + " "} 
							hours
						</p>
						<p className='authorName'>By {oneReport.user.first_name + " " + oneReport.user.last_name}</p>
						<p>{oneReport.description}</p>
						<p>Location: {oneReport.address}</p>
						<p>State: {oneReport.state}</p>
						<div className='votes'>
							{
								this.state.upvote ? 
								<i
									onClick={this.upvote}
									style={{color: '#4287f5'}} 
									className='material-icons'>
										thumb_up
								</i> :
								<i
									onClick={this.upvote}
									className='material-icons'>
										thumb_up
								</i>
							}
							<span> {this.state.upvotes} </span>
							{
								this.state.downvote ? 
								<i
									onClick={this.downvote}
									style={{color: '#4287f5'}} 
									className='material-icons'>
										thumb_down
								</i> :
								<i
									onClick={this.downvote}
									className='material-icons'>
										thumb_down
								</i>
							}
							<span> {this.state.downvotes} </span>
							</div>
						<hr/>
						<div className='commentReport'>
							<form onSubmit={this.handleSubmit}>
								<label>Comments</label>
								<textarea
									placeholder='Add your comments here'
									name='comments' 
									cols="30" 
									rows="10" 
									className="textarea" 
									onChange={this.handleChange}>
								</textarea>
								<button className="btn btn-primary">Add Comment</button>
							</form>
						</div>
					</div>
				</div>
			)
		}
		else{
			return(
				<Loading />
			)
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		singleReport: (param) => {
			dispatch(singleReport(param))
		}
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return{
		response: state.auth.response,
		oneReport: state.singleReport.singleReport,
		userReports: state.userReports.userReports.data,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails)