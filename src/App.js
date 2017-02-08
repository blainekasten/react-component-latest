import React, { Component } from 'react';
window.React = React;
import logo from './logo.svg';
import './App.css';

import Uniform from './modules/Uniform204';
const Button = Uniform.Button;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">

          <Button />
        </div>
      </div>
    );
  }
}

export default App;
