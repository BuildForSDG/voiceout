import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'

class ReportDetails extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const { match: { params } } = this.props;

		console.log(params);
		console.log("object")
	}
	render() {
		if(localStorage.getItem('response') == undefined) return <Redirect to='/' />
		return (
			<div>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
					<h1>Hello </h1>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return{
			response: state.auth.response,
			reportPost: state.reportPost.response
	}
}

export default connect(mapStateToProps, null)(ReportDetails)