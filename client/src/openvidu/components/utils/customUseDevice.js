// name: 오석호
// date: 2022/08/07
// desc: Device에 관련된 유틸 함수들을 한 군데 모아둠

// 권한 가져오는 함수
export const initStream = async () => {
  try {
    // 처음 권한 가져오기
    const newStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // 사용중인 트랙은 종료시키자 (권한만이 목적)
    newStream.getTracks().forEach((track) => {
      track.stop();
      newStream.removeTrack(track);
    });
    throw new Error('Got Permissioned!');
  } catch (e) {
    return true;
  }
};

// 스트림 만드는 함수
export const createStream = ({ audioTrack, videoTrack }) => {
  const stream = new MediaStream();
  if (audioTrack) stream.addTrack(audioTrack);
  if (videoTrack) stream.addTrack(videoTrack);
  return stream;
};

// 비디오 오디오 트랙 가져오는 함수들
export const getVideoTrack = async (deviceId) => {
  try {
    if (!deviceId) throw new Error('Get VideoTracks: No Device ID');

    const videoStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { deviceId: { exact: deviceId } },
    });
    const tracks = videoStream.getVideoTracks();
    if (!tracks?.length) return null;

    return tracks[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAudioTrack = async (deviceId) => {
  try {
    if (!deviceId) throw new Error('Get AudioTracks: No Device ID');

    const audioTrack = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: { exact: deviceId } },
      video: false,
    });
    const tracks = audioTrack.getAudioTracks();
    if (!tracks?.length) return null;

    return tracks[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

// 전체 장치 불러오는 함수들
export const getVideos = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput',
    );
    return videoDevices;
  } catch (e) {
    console.error(e);
  }
};

export const getAudios = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioDevices = devices.filter(
      (device) => device.kind === 'audioinput',
    );
    return audioDevices;
  } catch (e) {
    console.error(e);
  }
};

export const getSpeakers = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const speakerDevices = devices.filter(
      (device) => device.kind === 'audiooutput',
    );
    return speakerDevices;
  } catch (e) {
    console.error(e);
  }
};
