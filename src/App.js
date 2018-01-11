// @flow
import React, { Component } from 'react';
import './App.css';
import Tiling from './components/Tiling';
import Header from './components/Header';

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
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Tiling />
      </div>
    );
  }
}

export default App;
