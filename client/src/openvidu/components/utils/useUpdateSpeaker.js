import { useEffect } from 'react';

const attachSinkId = (element, sinkId) => {
  if (!element) return console.error('No Element Exists');
  if (typeof element.sinkId === 'undefined')
    return console.error('Browser does not support output device selection.');

  element.setSinkId(sinkId).catch((error) => {
    let errorMessage = error;
    if (error.name === 'SecurityError') {
      errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
    }
    console.error(errorMessage);
  });
};

// name: 오석호
// date: 2022/08/07
// desc: Speaker를 갱신해주는 커스텀 훅
const useUpdateSpeaker = (elementRef, speakerInfo) => {
  useEffect(() => {
    const element = elementRef.current;
    const sinkId = speakerInfo;
    if (!element) return;
    attachSinkId(element, sinkId);
  }, [speakerInfo]);
};

export default useUpdateSpeaker;
