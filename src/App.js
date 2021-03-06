import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import ReporterDashboard from './components/reporter/ReporterDashboard';
import ReportDetails from './components/reports/ReportDetails';
import SearchedReports from './components/home/SearchedReports';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import AllReports from './components/home/AllReports';
import Voices from './components/home/Voices';

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
			signUpDisplay: true
		})
  }
  signUpDisappear = () => {
    this.setState({
      signUpDisplay: false
    })
  }
  loginDisappear = () => {
    this.setState({
      loginDisplay: false
    })
  }
  handleLoginDisplay = () => {
		this.setState({
			loginDisplay: true
		})
	}

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar 
            handleSignUpDisplay={this.handleSignUpDisplay}
            handleLoginDisplay={this.handleLoginDisplay}
            loginDisappear={this.loginDisappear}
            signUpDisappear={this.signUpDisappear}
            />
          <Switch>
            <Route
              exact path='/'
              component={() => 
                <Home 
                  handleLoginDisplay={this.handleLoginDisplay}
                  handleDisplayState={this.state}
                  handleSignUpDisplay={this.handleSignUpDisplay}
                  loginDisappear={this.loginDisappear}
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
              path='/login'
              component={() => 
                //when the when loginDisplay is set to true, it remains true even when you logout
                /* passing this props will ensure the loginDisplay returns false a s a the reporter
                dashbord loads*/
                <Login 
                  handleLoginDisplay={this.handleLoginDisplay}
                  handleDisplayState={this.state}
                  handleSignUpDisplay={this.handleSignUpDisplay}
                  loginDisappear={this.loginDisappear}/>
              }
            />
            <Route
              path='/sign-up'
              component={() => 
                //when the when loginDisplay is set to true, it remains true even when you logout
                /* passing this props will ensure the loginDisplay returns false a s a the reporter
                dashbord loads*/
                <SignUp 
                  handleLoginDisplay={this.handleLoginDisplay}
                  handleDisplayState={this.state}
                  handleSignUpDisplay={this.handleSignUpDisplay}
                  loginDisappear={this.loginDisappear}
                  signUpDisappear={this.signUpDisappear}
                  />
              }
            />
            <Route path="/report/:id" component={ReportDetails} />
            <Route 
              path="/all_searched_reports" 
              component={ () => 
                <SearchedReports handleLoginDisplay={this.handleLoginDisplay} />
              } 
            />
            <Route
              path='/voices'
              component={() => 
                <Voices/>
              }
            />
            <Route 
              path="/all_reports" 
              component={ () => 
                <AllReports />
              } 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
