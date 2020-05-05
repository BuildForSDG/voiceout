import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';

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
  
  handleLoginDisplay = () => {
		this.setState({
			loginDisplay: !this.state.loginDisplay
		})
	}

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar handleLoginDisplay={this.handleLoginDisplay}/>
          <Home 
            handleLoginDisplay={this.handleLoginDisplay} 
            handleDisplayState={this.state} 
          />
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;
