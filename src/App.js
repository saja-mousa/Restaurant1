import React, { Component } from 'react';
import './App.css';
import Container from './Container/Container'
import {BrowserRouter} from 'react-router-dom'

class App extends Component {
  render() { 
    return (
      <BrowserRouter>
      <div className="App">
        <Container />
      </div>
      </BrowserRouter>


    );
  }
}

export default App;