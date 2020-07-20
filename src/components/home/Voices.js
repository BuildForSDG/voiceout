import {Redirect, Link} from 'react-router-dom';
import BackgroundVideo from '../../images/BriberyVideo.mp4';
import BackgroundImage from '../../images/bribery-act-1.jpg';
import Loading from './Loading';
import React, { Component } from 'react';
import '../../style/voices.css';


class Voices extends Component {
  constructor(){
    super();

    this.state = {
      voices: '',
      loading: true,
      toHome: false
    }
  }
  
  componentDidMount(){
    fetch('https://voiceout-api.herokuapp.com/api/voices')
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this.setState({
        voices: response,
        loading: false
      })
    })
  }

  toHome = () => {
    this.setState({
      toHome: true
    })
  }

  render() {
    if(this.state.toHome){ return <Redirect to='/' /> }
    return (
      <div>
        <video 
          id='bgvideo' autoPlay loop muted 
          poster={BackgroundImage} 
          class="fullscreen-bg__video">
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
        {(this.state.loading) 
          ? <Loading />: ''
        }
        <div id="id01" className="modal">
          <div className="modal-content-voices animate">
            <div class="contain">
              <span onClick={this.toHome} className="close" title="Close Modal">&times;</span>
              <h2 className='text-center' style={{padding: '10px'}}>Voices</h2>
              <table>
                <caption className='text-center'>
                  These are information of <b>Voices</b> you can post your <b>Report</b> to.
                </caption>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>About</th>
                  </tr>        
                </thead>
                <tbody>
                  {
                    this.state.voices && 
                    this.state.voices.map( (data, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.address}</td>
                          <td>{data.email}</td>
                          <td>{data.description}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Voices;
