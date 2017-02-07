import React, { Component } from 'react';
window.React = React;
import logo from './logo.svg';
import Button from './WrappedButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <Button />
        </p>
      </div>
    );
  }
}

export default App;
