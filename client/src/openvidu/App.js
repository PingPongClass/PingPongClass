import { useEffect, useState } from 'react';
import SetupComponent from './components/SetupComponent';
import VideoRoomComponent from './components/VideoRoomComponent';
import ResultComponent from './components/ResultComponent';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';
import whoru from '@utils/whoru';
import InterceptedAxios from '@utils/iAxios';
import levelFunction from '@utils/levelFunction';

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
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  // 통계를 내기 위한 자료
  const [myData, setMyData] = useState([]);
  const [othersData, setOthersData] = useState([]);
  const [absentData, setAbsentData] = useState([]);
  const [teacherData, setTeacherData] = useState();
  // 학생리스트
  const [studentList, setStudentList] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  // 내 레벨 확인
  const [levelPng, setLevelPng] = useState('/levels/rainbow.png');
  // 더블퐁퐁권 확인
  const [canUseDoublePongpong, setCanUseDoublePongpong] = useState(false);
  const [isUsedDoublePongpong, setIsUsedDoublePongpong] = useState(false);

  // 라우팅용
  const navigate = useNavigate();

  // 입장코드
  const { code } = useParams();
  const { state } = useLocation();

  const memberStore = useAppSelector((state) => state.member);
  const whoami = whoru(memberStore.userId);

  // 더블퐁퐁권 사용 가능 여부 판단
  useEffect(() => {
    const getUserItems = async () => {
      const result = await InterceptedAxios.get(`/items/${memberStore.userId}`);
      if (result.data.filter((elem) => elem.itemId === 4)[0].cnt > 0)
        setCanUseDoublePongpong(true);
    };
    if (whoami !== 'teacher') getUserItems();
  });

  // 학생셋 만들기
  useEffect(() => {
    const getMyLevel = async () => {
      console.log(memberStore.userId);
      const myPoint = await InterceptedAxios.get(
        `/items/totalsticker/${memberStore.userId}`,
      );
      console.log(myPoint.data);
      const pngUrl = levelFunction(myPoint.data);
      setLevelPng(pngUrl);
    };
    const getStudentList = async () => {
      const classStudents = await InterceptedAxios.get(
        `/classes/student/${state.classId}`,
      );
      const nameList = classStudents.data.participantsList.map(
        (elem) => elem.studentNickname,
      );
      const studentSets = {};
      classStudents.data.participantsList.forEach((elem) => {
        studentSets[elem.studentNickname] = elem.studentid;
      });
      setStudentList(nameList);
      setStudentInfo(studentSets);
    };
    if (whoami !== 'teacher') getMyLevel();
    getStudentList();
    return () => {
      console.log('오픈비두 종료');
    };
  }, []);

  // 만약 state 없이 한번에 url에 접근하려고 했다면
  if (!state) window.location.href = '/';

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
          whoami={whoami}
          canUseDoublePongpong={canUseDoublePongpong}
          isUsedDoublePongpong={isUsedDoublePongpong}
          setIsUsedDoublePongpong={setIsUsedDoublePongpong}
          userId={memberStore.userId}
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
          userId={memberStore.userId}
          grade={memberStore.grade}
          classNum={memberStore.classNum}
          studentNum={memberStore.studentNum}
          studentList={studentList}
          levelPng={levelPng}
          setAbsentData={setAbsentData}
          setTeacherData={setTeacherData}
          isUsedDoublePongpong={isUsedDoublePongpong}
        />
      )}
      {tap === 'result' && (
        <ResultComponent
          whoami={whoami}
          myData={myData}
          othersData={othersData}
          teacherName={state.teacherName}
          classTitle={state.classTitle}
          classId={state.classId}
          studentList={studentList}
          studentInfo={studentInfo}
          absentData={absentData}
          teacherData={teacherData}
        />
      )}
    </>
  );
};

export default App;
