// @flow
import React, { Component, type ElementRef } from 'react';
import './Tiling.css';

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

  getRealMimeType = (reader: any): string => {
    console.log(reader);
    const arr: Uint8Array = (new Uint8Array(reader.result)).subarray(0, 4);
    console.log(arr);
    let header: string = '';
    let realMimeType: string = '';
    let i: number = 0;
    const arrLength: number = arr.length;

    for (i; i < arrLength; i += 1) {
      header += arr[i].toString(16);
    }
    switch (header) {
      case '89504e47':
        realMimeType = 'image/png';
        break;
      case '47494638':
        realMimeType = 'image/gif';
        break;
      case 'ffd8ffDB':
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        realMimeType = 'image/jpeg';
        break;
      default:
        realMimeType = 'unknown'; // Or you can use the blob.type as fallback
        break;
    }

    console.log(realMimeType);
    return realMimeType;
  }

  handleFile = (ev: SyntheticInputEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      console.log('1');
      console.log(reader);
      console.log(reader.result);
      const result: any = reader.result || {};
      const realMimeType = this.getRealMimeType(reader);

      if (realMimeType !== 'unknown') {
        const arrayBufferView: Uint8Array = new Uint8Array(result);
        const blob: Blob = new Blob([arrayBufferView], { type: realMimeType });
        const urlCreator = window.URL || window.webkitURL || {}.createObjectURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        console.log(arrayBufferView);
        this.setState({
          ...this.state,
          file,
          imageUrl
        });
      } else {
        alert('Please upload a valid image file');
      }
    };

    reader.readAsArrayBuffer(file);
  }

  canvas: ?ElementRef<'canvas'>;

  resizeImage = (imageUrl: string) => {
    const canvas = this.canvas || {};
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    let ctx: any = null;

    if (canvas) {
      ctx = canvas.getContext('2d');
    }

    ctx.drawImage(imageUrl, 0, 0, 1024, 768);

    this.canvas = this.halfSize(canvas);
  }

  halfSize = (canvas: ElementRef<'canvas'>) => {
    const newCanvas = document.createElement('canvas');
    if (!(newCanvas instanceof HTMLCanvasElement)) {
      return;
    }

    let ctx: any = null;
    newCanvas.width = canvas.width / 2;
    newCanvas.height = canvas.height / 2;

    if (newCanvas) {
      ctx = newCanvas.getContext('2d');
    }

    ctx.drawImage(canvas.toBlob, 0, 0, newCanvas.width, newCanvas.height);

    return newCanvas;
  }

  render() {
    console.log(this.state.imageUrl);
    return (
      <div className="container">
        <input
          type="file"
          onChange={this.handleFile}
        />
        <div className="image_wrapper">
          <img src={this.state.imageUrl} alt="이미지" />
        </div>
        <div className="canvas_wrapper">
          <canvas ref={canvas => { this.canvas = canvas; }} />
        </div>
      </div>
    );
  }
}

export default Tiling;
