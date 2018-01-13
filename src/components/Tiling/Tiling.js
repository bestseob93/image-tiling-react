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
    const reader: FileReader = new FileReader();
    const image: Image = new Image();

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

        image.src = imageUrl;

        this.resizeImage(image);
      } else {
        alert('Please upload a valid image file');
      }
    };

    reader.readAsArrayBuffer(file);
  }

  canvas: ?ElementRef<'canvas'>;

  halfSize(canvas: ElementRef<'canvas'>): ?HTMLCanvasElement {
    const newCanvas = this.canvas || {};
    const image: Image = new Image();

    console.log(canvas.width);
    if (!(newCanvas instanceof HTMLCanvasElement)) {
      return undefined;
    }

    let ctx: any = null;
    newCanvas.width = canvas.width / 2;
    newCanvas.height = canvas.height / 2;

    if (newCanvas) {
      ctx = newCanvas.getContext('2d');
    }

    console.log('fuck');
    console.log(canvas.toBlob);
    canvas.toBlob((blob: Blob) => {
      const urlCreator = window.URL || window.webkitURL || {}.createObjectURL;
      const url = urlCreator.createObjectURL(blob);
      image.onload = () => {
        urlCreator.revokeObjectURL(url);
      };

      image.src = url;
    });

    console.log(newCanvas);
    console.log(newCanvas.width);
    ctx.drawImage(image, 0, 0, newCanvas.width, newCanvas.height);

    return newCanvas;
  }

  resizeImage = (image: Image) => {
    const canvas = document.createElement('canvas');

    console.log(canvas);
    console.log('hi');
    if (!(canvas instanceof HTMLCanvasElement)) {
      return;
    }

    let ctx: any = null;

    if (canvas) {
      ctx = canvas.getContext('2d');
    }

    ctx.drawImage(image, 0, 0, 1024, 768);


    console.log('hi');
    this.canvas = this.halfSize(canvas);
    console.log('hi');
  }

  render() {
    console.log(this.state.imageUrl);
    console.log(this.canvas);
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
          <canvas ref={canvas => { this.canvas = canvas; }} width="1024" height="768" />
        </div>
      </div>
    );
  }
}

export default Tiling;
