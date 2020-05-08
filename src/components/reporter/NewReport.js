import React, { Component } from 'react';
import '../../style/Form.css';
import FormErrors from './FormError'

export default class NewReport extends Component {
	constructor(props){
		super(props);

		this.state = {
			title: '',
			institution: '',
			report: '',
			sector: '',
			image: '',
			video: '',
			titleValid: false,
			institutionValid: false,
			reportValid: false,
			sectorValid: false,
			imageValid: false,
			videoValid: false,
			formValid: false,
			submitError: '',
			reportFormError: {
				title: '',
				institution: '',
				report: '',
				sector: '',
				image: ''
			}
		}
	}

	validateInput = (fieldName, value) => {
		let titleValid = this.state.titleValid;
		let institutionValid = this.state.institutionValid;
		let reportValid = this.state.reportValid;
		let sectorValid = this.state.sectorValid;
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
			case 'report':
				reportValid = value.length > 20;
				reportFormError.report = reportValid ? 
					'': 'Your Report must be more than 20 characters';
				break;
			case 'sector':
				sectorValid = value !== '';
				reportFormError.sector = sectorValid ? 
					'': 'You must select a sector';
				break;
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
			titleValid: titleValid,
			institutionValid: institutionValid,
			reportValid: reportValid,
			sectorValid: sectorValid,
			imageValid: imageValid,
			videoValid: videoValid,
			reportFormError: reportFormError
		}, this.validatePost)
	}

	validatePost = () => {
		this.setState({
			formValid: this.state.titleValid
				&& this.state.institutionValid
				&& this.state.reportValid
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

	handleSubmit = (e) => {
		e.preventDefault();
		if(!this.state.formValid) {
      this.setState({
        submitError: 'You need to enter all empty space to submit the form'
      }, console.log(this.state.submitError))
    }else{
		console.log(this.state)
		}
	}

	render() {
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
							<select required name="sector" value={this.state.sector} onChange={this.handleChange}>
								<option value="">The Institution belong to what sector</option>
								<option value="finance">Finance</option>
								<option value="government">Government</option>
								<option value="science_and_tech">Science and Tech</option>
								<option value="agriculture">Agriculture</option>
								<option value="finance">Finance</option>
								<option value="others">Others</option>
							</select>
							<label for="img">Select Image to Upload 
								<span className="required">*</span>
							</label>
							<input required type="file" name="image" onChange={this.handleChange} accept="image/*" />
							<label for="img">Select Video to Upload</label>
  						<input type="file" onChange={this.handleChange} name="video" accept="video/*" />

							<button className="login">Submit</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
