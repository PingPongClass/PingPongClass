import React, { Component } from "react";
import CloseBtn from "@material-ui/icons/Close";
import SingleParticipantPanel from "./SingleParticipantPanel";

import "./ParticipantComponent.css";

// ParticipantComponent: 참가자 정보 관련 컴포넌트
export default class ParticipantComponent extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.participantScroll = React.createRef();
  }

  // close: 무언가를 닫는 함수
  close() {
    this.props.close(undefined);
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
          {/* 참여자 */}
          <div className="participants-wrap" ref={this.participantScroll}>
            <div>
              <SingleParticipantPanel
                myinfo={this.props.myinfo.nickname}
                point={this.props.myinfo.point}
                attendenceTime={this.props.myinfo.attendenceTime}
                isVideoOn={this.props.myinfo.videoActive}
                isAudioOn={this.props.myinfo.audioActive}
              />
            </div>
            {this.props.subscribers.map((sub, i) => (
              <SingleParticipantPanel
                myinfo={sub.nickname}
                point={this.props.myinfo.point}
                attendenceTime={sub.attendenceTime}
                isVideoOn={sub.videoActive}
                isAudioOn={sub.audioActive}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
