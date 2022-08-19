import { css } from '@emotion/react';
import React, { useRef, useEffect } from 'react';
import {
  getVideos,
  getVideoTrack,
  getAudios,
  createStream,
} from '@openvidu/components/utils/customUseDevice';
import useUpdateStream from '@openvidu/components/utils/useUpdateStream';

const StorePreview = ({ isCameraOn, cameraLoading, setCameraLoading }) => {
  // 프리뷰 화면용 스트림
  const previewFace = useRef(null);
  const stream = useRef(new MediaStream());
  useUpdateStream(previewFace, stream.current);

  useEffect(() => {
    const getMyDevices = async () => {
      setCameraLoading(true);
      const newVideos = await getVideos();
      if (newVideos && newVideos[0]) {
        const newVideoTrack = await getVideoTrack(newVideos[0].deviceId);
        if (newVideoTrack) stream.current.addTrack(newVideoTrack);
      }
      setCameraLoading(false);
    };
    getMyDevices();

    return () =>
      stream.current.getTracks().forEach((track) => {
        track.stop();
        stream.current.removeTrack(track);
        setCameraLoading(false);
      });
  }, []);

  return (
    <div css={Preview}>
      <video ref={previewFace} autoPlay />
    </div>
  );
};

const Preview = css`
  height: 100%;
  background-color: black;
`;

export default StorePreview;
