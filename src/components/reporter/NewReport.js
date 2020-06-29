import React, { Component } from 'react';
import '../../style/Form.css';
import FormErrors from './FormError';
import { nigerianStates } from './nigerianStates';
import { postReport } from '../../store/actions/reportPostAction';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';


class NewReport extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: '',
			institution: '',
			report: '',
			sector_id: [],
			address: '',
			state: '',
			image: '',
			video: '',
			anonymous: false,
			addressValid: false,
			titleValid: false,
			institutionValid: false,
			reportValid: false,
			sectorValid: false,
			stateValid: false,
			imageValid: false,
			videoValid: false,
			formValid: false,
			submitError: '',
			reportFormError: {
				title: '',
				institution: '',
				report: '',
				sector_id: '',
				state: '',
				image: '',
				address: ''
			}
		}
	}

	componentDidMount(){
		this.setState({
			anonymous: this.props.anonymous
		})
	}

	validateMedia = (fieldName, value) => {
		let imageValid = this.state.imageValid;
		let videoValid = this.state.videoValid;
		let reportFormError = this.state.reportFormError; 

		switch(fieldName){
			case 'image':
				imageValid = value !== '';
				break;
			case 'video':
				videoValid = value !== '';
				break;	
			default:
				break;
		}
		reportFormError.image = imageValid || videoValid ?
			'': 'You need to choose an image or a video to continue';
		
			this.setState({
				imageValid,
				videoValid,
				reportFormError
			}, this.validatePost)
	}

	validateCheckbox = (sector_id) => {
		let sectorValid = this.state.sectorValid;
		let reportFormError = this.state.reportFormError;
		sectorValid = sector_id.length > 0;
		reportFormError.sector_id = sectorValid ? '': 'You must check a sector';
		this.setState({
			sectorValid: sectorValid,
			reportFormError: reportFormError
		}, this.validatePost) 
	}

	validateInput = (fieldName, value) => {
		let titleValid = this.state.titleValid;
		let institutionValid = this.state.institutionValid;
		let reportValid = this.state.reportValid;
		let addressValid = this.state.addressValid;
		let stateValid = this.state.stateValid;
		let imageValid = this.state.imageValid;
		let videoValid = this.state.videoValid;
		let reportFormError = this.state.reportFormError;
		
		switch (fieldName) {
			case 'title':
				titleValid = value.length > 2;
				reportFormError.title = titleValid ? '': 'The Title must be more than 2 characters';
				break;
			case 'institution':
				institutionValid = value.length > 2;
				reportFormError.institution = institutionValid ?
					'': 'Name of Company or Institution must be more than 2 characters';
				break;
			case 'state':
				stateValid = value.length !== '';
				reportFormError.state = stateValid ?
					'': 'You must select a state';
				break;
			case 'report':
				reportValid = value.length > 20;
				reportFormError.report = reportValid ? 
					'': 'Your Report must be more than 20 characters';
				break;
			case 'address':
				addressValid = value.length > 20;
				reportFormError.address = addressValid ? 
					'': 'The Institution address must be more than 20 characters';
				break;	
			default:
				break;
		}
	
		this.setState({
			titleValid,
			institutionValid,
			reportValid,
			addressValid,
			stateValid,
			imageValid,
			videoValid,
			reportFormError
		}, this.validatePost)
	}

	validatePost = () => {
		this.setState({
			formValid: this.state.titleValid
				&& this.state.institutionValid
				&& this.state.reportValid
				&& this.state.addressValid
				&& this.state.stateValid
				&& this.state.sectorValid
				&& (this.state.imageValid || this.state.videoValid)
		})
	}

	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		}, () => {
			this.validateInput(name, value);
		})
	}

	handleMediaChange = (e) => {
		let name = e.target.name;
		let value = e.target.files[0];
		this.setState({
			[name]: value
		}, () => {
			this.validateMedia(name, value)
		})
	}
	
	handleCheckbox = (e) => {
		let sector_id = this.state.sector_id;
		let index;
		if(e.target.checked){
			let toNumber = Number(e.target.value);
			sector_id.push(toNumber);
		}
		else{
			let toNumber = Number(e.target.value);
			index = sector_id.indexOf(toNumber);
      sector_id.splice(index, 1);
		}
		this.setState({
			sector_id: sector_id
		}, () => {
			this.validateCheckbox(sector_id);
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(!this.state.formValid) {
      this.setState({
        submitError: 'You need to enter all empty space to submit the form'
      })
    }else{
			this.setState({
				submitError: ''
			})
			setTimeout(() => {
				window.location.reload(true);
			}, 3000)
			console.log(this.state);
			this.props.postReport(this.state);
		}
	}

	render() {
		const { reportPost } = this.props;
		if (reportPost){ return <Redirect to='/reporter' />}
		return (
			<div>
				<div id="id01" class="modal">
					<form onSubmit={this.handleSubmit} class="modal-content-newReport animate">
						<span onClick={this.props.handleShowReportForm} class="close" title="Close Modal">&times;</span>
						<h4 className="text-center reportFormHeader">Report a Case</h4>

						<div className='error-text'>
							<p className='submit-error text-center'>{this.state.submitError}</p>
              <FormErrors formErrors={this.state.reportFormError} />                    
						</div>
						
						<div class="contain">
							<label for="title">Title of Your Report
								<span className="required">*</span>
							</label>
							<input
								type="text"
								placeholder="Enter Title"
								name="title"
								onChange={this.handleChange}
								required
							/>
				
							<label for="institutionToReport">Institution
								<span className="required">*</span>
							</label>
							<input
								type="text"
								placeholder="Enter Name of Institution you want to report"
								name="institution"
								onChange={this.handleChange}
								required
							/>
							<label for="address">Address
								<span className="required">*</span>
							</label>
							<input
								type="text"
								placeholder="Enter Address of Institution you want to report"
								name="address"
								onChange={this.handleChange}
								required
							/>
							<label for="report">Report
								<span className="required">*</span>
							</label>
							<textarea 
								value={this.state.report} 
								onChange={this.handleChange} 
								rows="5" 
								placeholder="Your report goes here" 
								name="report"
								required
							/>
							<label for="sector">Select a Sector
								<span className="required">*</span>
							</label>
							<div class='sector-flex-container'>
								{
									this.props.sectors.map((data, i) => {
										return (
											<div key={i} class='sector-content'>
												<input type='checkbox' 
													name={data.name}
													onChange={this.handleCheckbox} 
													value={data.id} 
												/>
												<label for={data.name}> {data.name}</label><br />
											</div>
										)
									})
								}
							</div>
							<label for="state">Select a State
								<span className="required">*</span>
							</label>
							<select required name="state" value={this.state.state} onChange={this.handleChange}>
								<option value='' >Select a State</option>
								
								{
									nigerianStates.map((data, i) => {
										return (
											<option key={i} value={data}>{data.toUpperCase()}</option>
										)
									})									
								}
							</select>
							<label for="img">Select Image to Upload 
								<span className="required">*</span>
							</label>
							<input required type="file" name="image" onChange={this.handleMediaChange} accept="image/*" />
							<label for="img">Select Video to Upload</label>
  						<input type="file" onChange={this.handleMediaChange} name="video" accept="video/*" />

							<button className="login">Submit</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		postReport: (params) => {
			dispatch(postReport(params))
		}
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return{
		reportPost: state.reportPost.response
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReport)