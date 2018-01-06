// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tiling from './components/Tiling';

type Props = {
  email: String
}

class App extends Component<Props> {
  static defaultProps = {
    email: 'hi@hi.com'
  }

  square = (n: ?number) => {
    console.log(n);
  }

  render() {
    this.square(3);
    console.log(this.props.email);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Tiling />
      </div>
    );
  }
}

export default App;
