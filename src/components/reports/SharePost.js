import React, { Component } from 'react'

export default class SharePost extends Component {
  constructor(props){
    super(props);

    this.state = {
      voiceValid: false,
      voice_id: [],
      formErrorMessage: ''
    }
  }

  validateCheckbox = (voice_id) => {
		let voiceValid = this.state.voiceValid;
		voiceValid = voice_id.length > 0;
		this.setState({
			voiceValid: voiceValid
		}) 
	}

  handleCheckbox = (e) => {
		let voice_id = this.state.voice_id;
		let index;
		if(e.target.checked){
			let toNumber = Number(e.target.value);
			voice_id.push(toNumber);
		}
		else{
			let toNumber = Number(e.target.value);
			index = voice_id.indexOf(toNumber);
      voice_id.splice(index, 1);
		}
		this.setState({
			voice_id: voice_id
		}, () => {
			this.validateCheckbox(voice_id);
		});
	}

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    if(!this.state.voiceValid){
      this.setState({
        formErrorMessage: 'You need to check at least one box'
      })
    }

  }
  render() {
    return (
      <div>
        <div id="id01" className="modal">
          <form onSubmit={this.handleSubmit} className="modal-content animate">
    {/*<input type="hidden" name="_token" value={token} />*/}
            <div class="contain">
              <span onClick={this.props.handleShowSharePage} className="close" title="Close Modal">&times;</span>
              <div className='error-text'>
                <p className='submit-error text-center'>
                  {
                    this.state.formErrorMessage
                  }
                </p>
              </div>
              <label for="sector">Select a Sector
								<span className="required">*</span>
							</label>
							<div class='sector-flex-container'>
								{
									this.props.voices.map((data, i) => {
										return (
											<div key={i} class='sector-content'>
												<input type='checkbox' 
													name={data.name}
													onChange={this.handleCheckbox} 
													value={data.id} 
												/>{" "}
												<label for={data.name}> {data.name}</label><br />
											</div>
										)
									})
								}
							</div>
    
              <button className="login">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
