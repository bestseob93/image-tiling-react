// @flow
import React, { Component } from 'react';

type Props = {}

type State = {
  isOpen: boolean,
  file: ?Object,
  imageUrl: any,
}

class Tiling extends Component<Props, State> {
  state = {
    isOpen: false,
    file: null,
    imageUrl: null
  };

  handleFile = (ev: SyntheticInputEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    const file = ev.target.files[0];

    reader.onloadend = () => {
      const result = reader.result || {};
      console.log(typeof result);

      const arrayBufferView = new Uint8Array(result);
      console.log(arrayBufferView);
      // const blob = new Blob([arrayBufferView], {type: realMimeType});

      this.setState({
        file,
        imageUrl: reader.result
      });
    };
    console.log(this.state.file);

    reader.readAsArrayBuffer(file);
  }

  render() {
    console.log(this.state.isOpen);
    return (
      <div>
        <input
          type="file"
          onChange={this.handleFile}
        />
        <img src={this.state.imageUrl} alt="ㅎ" />
      </div>
    );
  }
}

export default Tiling;
