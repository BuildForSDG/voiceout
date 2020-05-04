import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar/NavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
