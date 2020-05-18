import React, {Component} from 'react';
import { useLocation } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Axios from "axios";
import ReporterDashboard from './components/reporter/ReporterDashboard';
import VoiceDashboard from './components/voice/VoiceDashboard';
import InstitutionDashboard from './components/institution/InstitutionDashboard';

class App extends Component{
  constructor(props){
		super(props);

		this.state = {
			loginDisplay: false,
			signUpDisplay: false		
		}
  }
  handleSignUpDisplay = () => {
		this.setState({
			signUpDisplay: !this.state.signUpDisplay
		})
  }
  loginDisappear = () => {
    this.setState({
      loginDisplay: false
    })
  }
  handleLoginDisplay = () => {
		this.setState({
			loginDisplay: !this.state.loginDisplay
		})
	}

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar 
            handleLoginDisplay={this.handleLoginDisplay}
            loginDisappear={this.loginDisappear}
            />
          <Switch>
            <Route
              exact path='/'
              component={() => 
                <Home 
                  handleLoginDisplay={this.handleLoginDisplay} 
                  handleDisplayState={this.state} 
                />
              }
            />
            <Route
              path='/reporter'
              component={() => 
                //when the when loginDisplay is set to true, it remains true even when you logout
                /* passing this props will ensure the loginDisplay returns false a s a the reporter
                dashbord loads*/
                <ReporterDashboard loginDisappear={this.loginDisappear}/>
              }
            />
            <Route
              path='/voice'
              component={() => 
                //when the when loginDisplay is set to true, it remains true even when you logout
                /* passing this props will ensure the loginDisplay returns false a s a the reporter
                dashbord loads*/
                <VoiceDashboard loginDisappear={this.loginDisappear}/>
              }
            />
            <Route
              path='/institution'
              component={() => 
                //when the when loginDisplay is set to true, it remains true even when you logout
                /* passing this props will ensure the loginDisplay returns false a s a the reporter
                dashbord loads*/
                <InstitutionDashboard loginDisappear={this.loginDisappear}/>
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
