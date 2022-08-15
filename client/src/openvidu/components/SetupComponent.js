import React, { useState, useEffect, useRef } from 'react';
import Loading from './Loading';
import './SetupComponent.css';
import useUpdateStream from './utils/useUpdateStream';
import useUpdateSpeaker from './utils/useUpdateSpeaker';
import {
  createStream,
  getVideoTrack,
  getAudioTrack,
  getVideos,
  getAudios,
  getSpeakers,
  initStream,
} from './utils/customUseDevice';
import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
import Videocam from '@mui/icons-material/Videocam';
import VideocamOff from '@mui/icons-material/VideocamOff';

const SetupComponent = (props) => {
  const { teacherName, classTitle, setTap, setDevices } = props;
  const {
    videos,
    setVideos,
    audios,
    setAudios,
    speakers,
    setSpeakers,
    setSelectedVideo,
    selectedVideo,
    setSelectedAudio,
    selectedAudio,
    setSelectedSpeaker,
    selectedSpeaker,
    setSelectedVideoTrack,
    setSelectedAudioTrack,
    isVideoOn,
    setIsVideoOn,
    isAudioOn,
    setIsAudioOn,
  } = setDevices;

  const [isLoading, setIsLoading] = useState(true);
  const effectCnt = useRef(0); // 최초 마운트에 특정 useEffect가 동작하지 않게 하기 위한 트릭
  const previewFace = useRef();
  const [stream, setStream] = useState(new MediaStream());
  const [camLoading, setCamLoading] = useState(false);
  useUpdateStream(previewFace, stream);
  useUpdateSpeaker(previewFace, selectedSpeaker);

  useEffect(() => {
    return () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  useEffect(() => {
    const getMyDevices = async () => {
      const newVideos = await getVideos();
      const newAudios = await getAudios();
      const newSpeakers = await getSpeakers();
      setVideos(newVideos);
      setAudios(newAudios);
      setSpeakers(newSpeakers);
      if (newVideos.length) setSelectedVideo(newVideos[0].deviceId);
      if (newAudios.length) setSelectedAudio(newAudios[0].deviceId);
      if (newSpeakers.length) setSelectedSpeaker(newSpeakers[0].deviceId);
      setSelectedAudioTrack(newAudios[0]);
      setSelectedVideoTrack(newVideos[0]);
      const newStream = await createStream({
        audioTrack: newAudios[0],
        videoTrack: newVideos[0],
      });
      setStream(newStream);
    };
    getMyDevices().then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const changeStream = async () => {
      stream.getVideoTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      let videoTrack;
      if (selectedVideo) {
        videoTrack = await getVideoTrack(selectedVideo);
        if (videoTrack) {
          setSelectedVideoTrack(videoTrack);
          stream.addTrack(videoTrack);
          stream
            .getVideoTracks()
            .forEach((track) => (track.enabled = isVideoOn));
        }
      }
      if (effectCnt.current >= 2) setStream(stream);
      else ++effectCnt.current;
    };
    changeStream();
  }, [selectedVideo]);

  useEffect(() => {
    const changeStream = async () => {
      stream.getAudioTracks().forEach((track) => {
        track.stop();
        stream.removeTrack(track);
      });
      let audioTrack;
      if (selectedAudio) {
        audioTrack = await getAudioTrack(selectedAudio);
        if (audioTrack) {
          setSelectedAudioTrack(audioTrack);
          stream.addTrack(audioTrack);
          stream
            .getAudioTracks()
            .forEach((track) => (track.enabled = isAudioOn));
        }
      }
      if (effectCnt.current >= 2) setStream(stream);
      else ++effectCnt.current;
    };
    changeStream();
  }, [selectedAudio]);

  // 장치를 선택할 때 상태값을 바꾸는 이벤트핸들러
  const selectVideo = (e) => {
    setSelectedVideo(e.target.value);
  };

  const selectAudio = (e) => {
    setSelectedAudio(e.target.value);
  };

  const selectSpeaker = (e) => {
    setSelectedSpeaker(e.target.value);
  };

  const toggleVideo = (e) => {
    setIsVideoOn(!isVideoOn);
    stream.getVideoTracks().forEach((track) => (track.enabled = !isVideoOn));
  };

  const toggleAudio = (e) => {
    setIsAudioOn(!isAudioOn);
    stream.getAudioTracks().forEach((track) => (track.enabled = !isAudioOn));
  };

  const goNext = () => {
    setTap('class');
  };

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  return (
    <div className="totalContainer">
      <div className="parent">
        <div className="child">
          <div className="container">
            <div className="circles">
              <div className="circle1" />
              <div className="circle2" />
              <div className="circle3" />
            </div>
            <hr />
            <div className="main">
              <div className="RoomName">
                <h2>
                  {classTitle} - {teacherName}
                </h2>
              </div>
              <div className="preview">
                <video ref={previewFace} autoPlay />
              </div>
              <div className="settingSection">
                <div className="settingVideo">
                  <p>비디오 </p>
                  <select onChange={selectVideo}>
                    {videos.map((video, i) => (
                      <option value={video.deviceId} key={i}>
                        {video.label}
                      </option>
                    ))}
                  </select>
                  <button onClick={toggleVideo}>
                    {isVideoOn ? <Videocam /> : <VideocamOff />}
                  </button>
                </div>
                <div className="settingAudio">
                  <p>마이크 </p>
                  <select onChange={selectAudio}>
                    {audios.map((audio, i) => (
                      <option value={audio.deviceId} key={i}>
                        {audio.label}
                      </option>
                    ))}
                  </select>
                  <button onClick={toggleAudio}>
                    {isAudioOn ? <Mic /> : <MicOff />}
                  </button>
                </div>
                <div className="settingSpeaker">
                  <p>스피커 </p>
                  <select onChange={selectSpeaker}>
                    {speakers.map((speaker, i) => (
                      <option value={speaker.deviceId} key={i}>
                        {speaker.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="next">
                <button className="nextBtn" onClick={goNext}>
                  입장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupComponent;
