import React, { Component } from 'react';
import {connect} from 'react-redux';
import { asyncLocalStorage } from '../../services/asyncData';
import { singleReport } from '../../store/actions/userReportAction';
import { getSingleReport } from '../../services/getReports'
import Loading from '../home/Loading';
import Image from 'react-bootstrap/Image';
import { dateFromData } from '../../services/dateFromData';
import {PostComment, GetComments} from '../../services/postComment';
import { upvote, downvote } from '../../services/votes';
import { getVotes } from '../../services/getVotes';
import SharePost from './SharePost';
import { getVoices } from '../../services/getVoices';
import Votes from './Votes';
import Comments from './Comments';


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
			downvote: false,
			returnedComments: '',
			getSingleReport: '',
			showSharePage: false,
			voices: ''
		}
	}
	async componentDidMount(){
		const { match: { params } } = this.props;
		
		let get = await GetComments(params.id)
		.then(res => res)
		this.setState({
			returnedComments: get
		})

		getVoices()
		.then(res => {
			this.setState({
				voices: res
			})
		});

		//work with facebook share button
		const urlAddress = "https://voiceout.netlify.app/report/" + params.id
		const url = document.createElement("meta");
		const description = document.createElement("meta");
		const image = document.createElement("meta");
		
		

		getSingleReport(params.id)
		.then(data => {
			//facebook share
			url.setAttribute("property", "og:url");
			url.setAttribute("content", urlAddress);
			document.head.appendChild(url);
			description.setAttribute("property", "og:description");
			description.setAttribute("content", data.title);
			document.head.appendChild(description);
			image.setAttribute("property", "og:image");
			image.setAttribute("content", data.media_url.images[0]);
			document.head.appendChild(image);
			this.setState({
				getSingleReport: data
			})
		})	
		

		const {userReports} = this.props;
		const data = JSON.parse(localStorage.getItem('response'));
		if( data && data.user !== undefined && userReports){
			const singleData = userReports.filter(data => {
				return data.id === params.id
			})
			asyncLocalStorage.setItem('singleData', singleData[0]);
		}
		setTimeout(() => {
			this.props.singleReport();
		}, 1000);
		if(data && data.user !== undefined){
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
		let commentValid = this.state.commentValid;
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
		.then((res) => {
			this.setState({
				returnedComments: res
			})
		});
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

	handleShowSharePage = () => {
    this.setState({
			showSharePage: !this.state.showSharePage
		})
	}
	
	render() {
		//const oneReport = this.props.oneReport || this.state.getSingleReport;
		let oneReport;
		const data = JSON.parse(localStorage.getItem('response'));
		const localStorageUser = data && data.user ? data.user : '';
		if(data && !data.hasOwnProperty('user') ) {
			oneReport = this.props.oneReport.id === this.props.match.params.id ?
									this.props.oneReport :
									this.state.getSingleReport
		}
		oneReport = this.state.getSingleReport;
		console.log(oneReport);
		if(oneReport && oneReport.id == this.props.match.params.id){
			const date = dateFromData(oneReport);
			return (
				<div className='container singleReport-body'>
					{
						this.state.showSharePage ?
						<SharePost
							id={this.props.match.params.id}
							voices={this.state.voices}
							handleShowSharePage={this.handleShowSharePage} /> : ''
					}
					<div class='singleReport'>
						<h1>{oneReport.title}</h1>
						<div className='media-parent'>
							<div className='media'>
								<figure className='detail-flex'>
									<Image
										className='detail-image'
										src={
											(oneReport.media_url.images) ? 
											oneReport.media_url.images : 
											"https://i1.wp.com/ilikeweb.co.za/wp-content/uploads/2019/07/placeholder.png?ssl=1"
										}
										fluid
									/>
									<figcaption>{oneReport.title}</figcaption>
								</figure>
							</div>
							<div className='media'>
								{
									oneReport.media_url.videos ? 
									<video id="video1" height="300" controls>
										<source src={oneReport.media_url.videos}/>
										Your browser does not support HTML video.
									</video>
									:''
								}
							</div>
						</div>
						<p className='time small-letter'>Reported on {date.days[date.day]}, 
							{" " + date.date} - 
							{date.months[date.month]} - 
							{date.year + " "} at
							{" " + date.hours}: 
							{date.minutes + " "} 
							hours
						</p>
						<p className='small-letter authorName'>By 
							{
								oneReport.anonymous === 1 ?
								' Anonymous' :
								" " + oneReport.user.first_name + " " + oneReport.user.last_name
							}
						</p>
						<p>{oneReport.description}</p>
						<p className='small-letter'><b>Category:</b> {
							oneReport.sector.map((data, i) => {
								return (
									<span key={i}> {" " + data.name}, </span>
								)
							})
						}</p>
						<p className='small-letter'><b>Voices Shared with:</b> {
							oneReport  && oneReport.voices.length > 0 ?
							oneReport.voices.map((data, i) => {
								return(
									<span key={i}> {" " + data.name}, </span>
								)
							}): 'Report has not been Shared with any voice'
						}</p>
						<p className='small-letter'><b>Location:</b> {oneReport.address}</p>
						<p className='small-letter'><b>State:</b> {oneReport.state}</p>
						{
							localStorageUser ?
							<div>
								<Votes
									id={this.props.match.params.id}
									handleShowSharePage={this.handleShowSharePage}
									oneReport={oneReport}
									stateUpvote={this.state.upvote}
									stateUpvotes={this.state.upvotes}
									upvoteFunction={this.upvote}
									stateDownvote={this.state.downvote}
									stateDownvotes={this.state.downvotes}
									downvoteFunction={this.downvote}
									/>
								<hr/>
								<Comments 
									returnedComments={this.state.returnedComments}
									handleSubmit={this.handleSubmit}
									handleChange={this.handleChange}
									comment={this.state.comment}
								/>
							</div> : 
							<div style={{color: '#f46'}}>
								<p>You can Upvote, Downvote and Comment on this Post when you Login</p>
							</div>
						}
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
	return{
		response: state.auth.response,
		oneReport: state.singleReport.singleReport,
		userReports: state.userReports.userReports.data,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails)