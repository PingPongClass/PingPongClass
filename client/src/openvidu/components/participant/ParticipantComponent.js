import React, { Component } from 'react';
import CloseBtn from '@mui/icons-material/Close';
import SingleParticipantPanel from './SingleParticipantPanel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
    this.props.partsSortChange(e.target.value);
  }

  // render: 렌더링을 담당하는 함수
  render() {
    const participants = this.props.subscribers.slice();
    participants.push(this.props.user);
    if (this.props.type === 'join')
      participants.sort((a, b) => {
        if (a.attendanceTime > b.attendanceTime) return 1;
        else return 0;
      });
    else if (this.props.type === 'pongpong')
      participants.sort((a, b) => b.point - a.point);
    else if (this.props.type === 'number')
      participants.sort((a, b) => {
        if (a.nickname > b.nickname) return 1;
        else return 0;
      });
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
              // attendanceTime={this.props.user.attendanceTime}
              // isVideoOn={this.props.user.videoActive}
              // isAudioOn={this.props.user.audioActive}
              // upPoint={this.props.user.upPoint}
              // downPoint={this.props.user.downPoint}
            />
          </div>
          {/* 디스플레이 요소 체크박스 */}
          <div className="display-box">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={this.props.type}
                onChange={this.partsSortChange}
                color="warning"
              >
                <MenuItem value="all">전체보기</MenuItem>
                <MenuItem value="attend">출석자보기</MenuItem>
                <MenuItem value="absent">결석자보기</MenuItem>
                <MenuItem value="join">접속순보기</MenuItem>
                <MenuItem value="pongpong">퐁퐁순보기</MenuItem>
                <MenuItem value="number">번호순보기</MenuItem>
              </Select>
            </FormControl>
            {/* <select value={this.props.type} onChange={this.partsSortChange}>
              <option value="all">전체보기</option>
              <option value="attend">출석자보기</option>
              <option value="absent">결석자보기</option>
              <option value="join">접속순보기</option>
              <option value="pongpong">퐁퐁순보기</option>
              <option value="number">번호순보기</option>
            </select> */}
          </div>
          {/* 수업 참여 여부 */}
          {/* 참여자 */}
          <div className="participants-wrap" ref={this.participantScroll}>
            <div className="attendance-students">
              {this.props.type !== 'absent' && (
                <>
                  {this.props.type === 'all' && (
                    <h3 className="chat-title-sub">출석명단</h3>
                  )}
                  {participants.map((sub, i) => (
                    <SingleParticipantPanel
                      key={i}
                      whoami={this.props.whoami}
                      user={sub}
                      isMyself={false}
                      // myinfo={sub.nickname}
                      // point={sub.point}
                      // attendanceTime={sub.attendanceTime}
                      // isVideoOn={sub.videoActive}
                      // isAudioOn={sub.audioActive}
                      // upPoint={sub.upPoint}
                      // downPoint={sub.downPoint}
                    />
                  ))}
                </>
              )}
            </div>
            {(this.props.type === 'all' || this.props.type === 'absent') && (
              <div className="absent-students">
                {this.props.type === 'all' && <h3>결석명단</h3>}
                {this.props.absentStudents.map((elem, i) => (
                  <p key={i}>{elem}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
