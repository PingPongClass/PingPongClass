import React, { Component } from 'react';
import * as faceApi from 'face-api.js';
import LoadingBar from './components/items/LoadingBar';
import Smile from './assets/images/giphy_smile.gif';

export default class FaceDetection extends Component {
  video = React.createRef();

  state = {
    expressions: 0,
    face: 0,
    smile: 0,
    normal: 0,
    autoPlay: false,
    camera: true,
  };

  componentDidMount() {
    this.run();
  }

  componentDidUpdate() {
    if (this.state.autoPlay !== this.props.autoPlay) {
      this.setState({
        autoPlay: this.props.autoPlay,
        face: 0,
        smile: 0,
        normal: 0,
      });
    }
    if (this.state.camera !== this.props.camera) {
      this.setState({
        camera: this.props.camera,
        face: 0,
        smile: 0,
        normal: 0,
      });
    }
  }

  log = (...args) => {
    console.log(...args);
  };

  run = async () => {
    this.log('run started');
    try {
      await faceApi.nets.tinyFaceDetector.load('/models');
      await faceApi.loadFaceExpressionModel(`/models`);
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });

      this.video.current.srcObject = this.mediaStream;
    } catch (e) {
      this.log(e.name, e.message, e.stack);
    }
  };

  onPlay = async () => {
    if (
      !this.state.autoPlay ||
      this.state.camera ||
      this.video.current.paused ||
      this.video.current.ended ||
      !faceApi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => this.onPlay());
      return;
    }

    const options = new faceApi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5,
    });

    const result = await faceApi
      .detectSingleFace(this.video.current, options)
      .withFaceExpressions();

    if (result) {
      const happy = result.expressions.happy;
      let normal = this.state.normal;
      let smile = this.state.smile;
      this.setState(() => ({ expressions: happy, face: 0 }));

      if (happy > 0.8) {
        normal = 0;
        smile += 1;
        if (smile === 3) {
          this.props.smile(true);
        }
      } else {
        smile = 0;
        normal += 1;
        if (normal === 3) {
          this.props.smile(false);
        }
      }
      this.props.outAngle(false);
      this.setState(() => ({ smile: smile, normal: normal }));
    } else {
      const lv = this.state.face + 1;
      this.props.smile(false);
      this.setState(() => ({ smile: 0, normal: 0, expressions: 0, face: lv }));
      if (lv === 6) {
        this.props.outAngle(true);
      }
    }
    setTimeout(() => this.onPlay(), 1000);
  };

  render() {
    return (
      <div
        className="FaceDetection"
        style={{ position: 'relative', height: '95%', width: '98%' }}
      >
        {!this.props.camera || this.state.autoPlay ? (
          <>
            <h1
              style={{
                position: 'absolute',
                top: '5%',
                right: '2.5%',
                fontSize: '500%',
              }}
            >
              {this.state.smile < 1 ? null : this.state.smile > 3 ? (
                <img
                  style={{
                    position: 'absolute',
                    minWidth: '8rem',
                    width: '20%',
                    minHeight: '8rem',
                    height: '20%',
                    top: '5%',
                    right: '2.5%',
                  }}
                  src={Smile}
                  alt={'HI'}
                ></img>
              ) : (
                <LoadingBar msg={'😁 3초후 이모지 사용'} />
              )}
            </h1>
            <h1
              style={{
                position: 'absolute',
                top: '5%',
                right: '2.5%',
                fontSize: '500%',
              }}
            >
              {this.state.face < 3 ? null : this.state.face > 5 ? (
                <p
                  style={{
                    width: '10%',
                    height: '10%',
                  }}
                >
                  🚫
                </p>
              ) : (
                <LoadingBar msg={'🚫 3초후 자리비움 설정'} />
              )}
            </h1>
            <div style={{ width: '0px', height: '0px' }}>
              <video ref={this.video} autoPlay muted onPlay={this.onPlay} />
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
