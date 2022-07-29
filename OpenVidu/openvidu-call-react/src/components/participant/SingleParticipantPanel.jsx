import React from "react";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";

import "./SingleParticipantPanel.css";

// name: 오석호
// date: 2022/07/28
// desc: 한 명의 패널을 담당하는 컴포넌트
// Todo: 사용자의 이름과 같은 상태값들을 한명씩 출력해주는 컴포넌트
const SingleParticipantPanel = (props) => {
  const { myinfo, point, attendenceTime, isVideoOn, isAudioOn } = props;
  return (
    <div id="oneParticipant">
      <div className="right_side">{myinfo}</div>
      <div className="left_side">
        <span>상점 : {point}</span>
        <span>출석 : {attendenceTime}</span>
        {isVideoOn ? <Videocam /> : <VideocamOff color="secondary" />}
        {isAudioOn ? <Mic /> : <MicOff color="secondary" />}
      </div>
    </div>
  );
};

export default SingleParticipantPanel;
