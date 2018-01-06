// @flow
import React, { Component } from 'react';

type Props = {}

type State = {
  isOpen: boolean
}

class Tiling extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  render() {
    console.log(this.state.isOpen);
    return (
      <div>
        hi
      </div>
    );
  }
}

export default Tiling;
