import React, { Component } from 'react';
import CloseBtn from '@mui/icons-material/Close';
import SingleParticipantPanel from './SingleParticipantPanel';

import './ParticipantComponent.css';

// ParticipantComponent: 참가자 정보 관련 컴포넌트
export default class ParticipantComponent extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.upPointChanged = this.upPointChanged.bind(this);
    this.downPointChanged = this.downPointChanged.bind(this);
    this.participantScroll = React.createRef();
  }

  componentDidMount() {
    // point-up 이벤트를 여기서 감지
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:point-up', (event) => {
        this.upPointChanged();
      });

    // point-down 이벤트를 여기서 감지
    this.props.user
      .getStreamManager()
      .stream.session.on('signal:point-down', (event) => {
        this.downPointChanged();
      });
  }

  // close: 무언가를 닫는 함수
  close() {
    this.props.close(undefined);
  }

  upPointChanged() {
    this.props.upPointChanged();
  }

  downPointChanged() {
    this.props.downPointChanged();
  }

  // render: 렌더링을 담당하는 함수
  render() {
    return (
      <div id="participantContainer">
        <div id="participantComponent">
          {/* 툴바 */}
          <div id="participantToolbar">
            <span>참여자 목록</span>
            <CloseBtn
              id="closeButton"
              onClick={this.close}
              alt="참여자 목록 닫기"
            />
          </div>
          {/* 수업 참여 여부 */}
          {/* 참여자 */}
          <div className="participants-wrap" ref={this.participantScroll}>
            <div>
              <SingleParticipantPanel
                user={this.props.user}
                // myinfo={this.props.user.nickname}
                // point={this.props.user.point}
                // attendenceTime={this.props.user.attendenceTime}
                // isVideoOn={this.props.user.videoActive}
                // isAudioOn={this.props.user.audioActive}
                // upPoint={this.props.user.upPoint}
                // downPoint={this.props.user.downPoint}
              />
            </div>
            {this.props.subscribers.map((sub, i) => (
              <SingleParticipantPanel
                key={i}
                user={sub}
                // myinfo={sub.nickname}
                // point={sub.point}
                // attendenceTime={sub.attendenceTime}
                // isVideoOn={sub.videoActive}
                // isAudioOn={sub.audioActive}
                // upPoint={sub.upPoint}
                // downPoint={sub.downPoint}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
