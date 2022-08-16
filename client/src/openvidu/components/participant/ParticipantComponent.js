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
    this.partsSortChange = this.partsSortChange.bind(this);
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

    console.log('쌤:', this.props.teacher);
    console.log('학생:', this.props.students);
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

  partsSortChange(e) {
    console.log(e.target.value);
    this.props.partsSortChange(e.target.value);
  }

  // render: 렌더링을 담당하는 함수
  render() {
    const participants = this.props.subscribers;
    participants.push(this.props.user);
    const joinParts = participants.sort(
      (a, b) => a.attendanceTime - b.attendanceTime,
    );
    const pongpongParts = participants.sort((a, b) => b.point - a.point);
    const numberParts = participants.sort((a, b) => a.point - b.point);
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
          {/* 자신 */}
          <div className="my-box">
            <SingleParticipantPanel
              whoami={this.props.whoami}
              user={this.props.user}
              isMyself={true}
              // myinfo={this.props.user.nickname}
              // point={this.props.user.point}
              // attendenceTime={this.props.user.attendenceTime}
              // isVideoOn={this.props.user.videoActive}
              // isAudioOn={this.props.user.audioActive}
              // upPoint={this.props.user.upPoint}
              // downPoint={this.props.user.downPoint}
            />
          </div>
          {/* 디스플레이 요소 체크박스 */}
          <div className="display-box">
            <select value={this.props.type} onChange={this.partsSortChange}>
              <option value="all">전체보기</option>
              <option value="attend">출석자보기</option>
              <option value="absent">결석자보기</option>
              <option value="join">접속순보기</option>
              <option value="pongpong">퐁퐁순보기</option>
              <option value="number">번호순보기</option>
            </select>
          </div>
          {/* 수업 참여 여부 */}
          {/* 참여자 */}
          <div className="participants-wrap" ref={this.participantScroll}>
            <div className="attendence-students">
              <h3>출석명단</h3>
              <SingleParticipantPanel
                whoami={this.props.whoami}
                user={this.props.user}
                isMyself={true}
                // myinfo={this.props.user.nickname}
                // point={this.props.user.point}
                // attendenceTime={this.props.user.attendenceTime}
                // isVideoOn={this.props.user.videoActive}
                // isAudioOn={this.props.user.audioActive}
                // upPoint={this.props.user.upPoint}
                // downPoint={this.props.user.downPoint}
              />
              {this.props.subscribers.map((sub, i) => (
                <SingleParticipantPanel
                  key={i}
                  whoami={this.props.whoami}
                  user={sub}
                  isMyself={false}
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
            <div className="absent-students">
              <h3>결석명단</h3>
              {this.props.absentStudents.map((elem, i) => (
                <p key={i}>{elem}</p>
              ))}
            </div>
            <div className="test">
              {/* <p>{this.props.teacher.nickname}</p>
              {this.props.students.map((elem, i) => (
                <p key={i}>{elem.nickname}</p>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
