import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@mui/icons-material/MicOff';
import VideocamOff from '@mui/icons-material/VideocamOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOff from '@mui/icons-material/VolumeOff';
import IconButton from '@mui/material/IconButton';

// StreamComponent: 스트림된 요소들을 컨트롤하는 요소들을 담은 컴포넌트
export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      frameColor: this.props.user.getFrameColor(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    };
    this.handlePressKey = this.handlePressKey.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  // toggleSound: 사운드를 뮤트하거나 풀 수 있는 토글 버튼 함수
  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  // handlePressKey: 키를 눌렀을 때 동작하는 이벤트핸들러
  // 수정 필요 - 수정을 하지 않아도 edit이 추가되는 문제 발생
  handlePressKey(event) {
    if (event.key === 'Enter') {
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname);
        this.setState({ isFormValid: true });
      } else {
        this.setState({ isFormValid: false });
      }
    }
  }

  // name: 한준수
  // date: 2022/07/27
  // desc: VideoRoomComponent 에서 넘겨주는 Props에 변경이 발생할 때마다 호출되는 함수
  // Todo: 호출 시 frameColor 값이 변화가 있는지 확인하고, 변화가 있으면 state에 반영한다.
  componentDidUpdate(prevProps) {
    if (this.state.frameColor !== prevProps.user.frameColor) {
      let tempColor = this.props.user.frameColor;
      this.setState({ frameColor: tempColor });
    }
  }

  // render: 렌더링 담당 함수
  render() {
    return (
      <div className="OT_widget-container" style={this.state.frameColor.value}>
        {this.props.user !== undefined && this.props.user.emoji ? (
          <img
            className="reaction-img"
            src={'../reactions/' + this.props.user.emoji + '.gif'}
          />
        ) : null}
        {/* 닉네임창 */}
        <div className="nickname">
          <div>
            <span id="nickname">{this.props.user.getNickname()}</span>
          </div>
        </div>
        {/* 영상 출력 부분 */}
        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
              currentSpeakerDeviceId={this.props.currentSpeakerDeviceId}
            />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null}
            </div>
            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOff color="secondary" />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
