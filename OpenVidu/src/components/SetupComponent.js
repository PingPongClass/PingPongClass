import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import "./SetupComponent.css";
import useUpdateStream from "./utils/useUpdateStream";
import useUpdateSpeaker from "./utils/useUpdateSpeaker";
import {
  createStream,
  getVideoTrack,
  getAudioTrack,
  getVideos,
  getAudios,
  getSpeakers,
} from "./utils/customUseDevice";

const SetupComponent = (props) => {
  const { setTap, setDevices } = props;
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
  } = setDevices;

  const [isLoading, setIsLoading] = useState(true);
  const [stream, setStream] = useState(new MediaStream());
  const effectCnt = useRef(0); // 최초 마운트에 특정 useEffect가 동작하지 않게 하기 위한 트릭
  const previewFace = useRef();
  useUpdateStream(previewFace, stream);
  useUpdateSpeaker(previewFace, selectedSpeaker);

  useEffect(() => {
    const getMyDevices = async () => {
      const videos = await getVideos();
      const audios = await getAudios();
      const speakers = await getSpeakers();
      setVideos(videos);
      setAudios(audios);
      setSpeakers(speakers);
      if (videos.length) setSelectedVideo(videos[0].deviceId);
      if (audios.length) setSelectedAudio(audios[0].deviceId);
      if (speakers.length) setSelectedSpeaker(speakers[0].deviceId);
      setSelectedAudioTrack(audios[0]);
      setSelectedVideoTrack(videos[0]);
      setStream(createStream(audios[0], videos[0]));
      setIsLoading(false);
    };
    getMyDevices();
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
        }
      }
      if (effectCnt.current >= 2) setStream(stream);
      else ++effectCnt.current;
      console.log(stream.getAudioTracks());
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

  const goNext = () => {
    setTap("class");
  };

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div>
      <div className="preview">
        <video ref={previewFace} autoPlay />
      </div>
      <div className="settingSection">
        <div className="settingVideo">
          <p>비디오 : </p>
          <select onChange={selectVideo}>
            {videos.map((video, i) => (
              <option value={video.deviceId}>{video.label}</option>
            ))}
          </select>
        </div>
        <div className="settingAudio">
          <p>마이크 : </p>
          <select onChange={selectAudio}>
            {audios.map((audio, i) => (
              <option value={audio.deviceId}>{audio.label}</option>
            ))}
          </select>
        </div>
        <div className="settingSpeaker">
          <p>스피커 : </p>
          <select onChange={selectSpeaker}>
            {speakers.map((speaker, i) => (
              <option value={speaker.deviceId}>{speaker.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="next">
        <button onClick={goNext}>입장하기</button>
      </div>
    </div>
  );
};

export default SetupComponent;
