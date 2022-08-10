import { useState } from 'react';
import SetupComponent from './components/SetupComponent';
import VideoRoomComponent from './components/VideoRoomComponent';
import ResultComponent from './components/ResultComponent';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/store/hooks';
import whoru from '@utils/whoru';

const App = () => {
  const [tap, setTap] = useState('setup');
  // 배열 형태로 전달
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  // id값으로 전달
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedAudio, setSelectedAudio] = useState();
  const [selectedSpeaker, setSelectedSpeaker] = useState();
  // 트랙으로 전달
  const [selectedVideoTrack, setSelectedVideoTrack] = useState();
  const [selectedAudioTrack, setSelectedAudioTrack] = useState();
  // 비디오를 켜고 들어갈 것인지 끄고 들어갈 것인지
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  // 통계를 내기 위한 자료
  const [myData, setMyData] = useState(true);
  const [othersData, setOthersData] = useState(true);

  // 라우팅용
  const navigate = useNavigate();

  // 입장코드
  const { code } = useParams();
  const { state } = useLocation();
  console.log(state, typeof state);

  const memberStore = useAppSelector((state) => state.member);
  console.log(memberStore, '얘');
  const whoami = whoru(memberStore.userId);
  console.log(state.classTitle, state.teacherName);

  const setDevices = {
    videos,
    setVideos,
    audios,
    setAudios,
    speakers,
    setSpeakers,
    selectedVideo,
    setSelectedVideo,
    selectedAudio,
    setSelectedAudio,
    selectedSpeaker,
    setSelectedSpeaker,
    selectedVideoTrack,
    setSelectedVideoTrack,
    selectedAudioTrack,
    setSelectedAudioTrack,
    isVideoOn,
    setIsVideoOn,
    isAudioOn,
    setIsAudioOn,
  };

  return (
    <>
      {tap === 'setup' && (
        <SetupComponent
          teacherName={state.teacherName}
          classTitle={state.classTitle}
          setTap={setTap}
          setDevices={setDevices}
          code={code}
        />
      )}
      {tap === 'class' && (
        <VideoRoomComponent
          setDevices={setDevices}
          code={code}
          memberStore={memberStore}
          whoami={whoami}
          setTap={setTap}
          classId={state.classId}
          setMyData={setMyData}
          setOthersData={setOthersData}
          navigate={navigate}
          teacherName={state.teacherName}
          classTitle={state.classTitle}
        />
      )}
      {tap === 'result' && (
        <ResultComponent
          whoami={whoami}
          myData={myData}
          othersData={othersData}
          teacherName={state.teacherName}
          classTitle={state.classTitle}
        />
      )}
    </>
  );
};

export default App;
