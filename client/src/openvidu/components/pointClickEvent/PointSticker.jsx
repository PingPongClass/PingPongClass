import { css } from '@emotion/react';
import React, { useState } from 'react';
import './PointSticker.css';

// name: 한준수
// date: 2022/07/28
// desc: 클릭하면 포인트를 얻는 컴포넌트
// Todo: 호출 시 현재 유저의 개인 화면에 랜덤한 위치에 생성되고, 클릭한 유저에게 props로 전달받은 만큼의 포인트를 반환해준다.
const PointSticker = (props) => {
  const { stikerKey, top, left, removeSticker, localUser } = props;
  const [visible, setVisible] = useState(true);
  const size = '100px';

  const stickerCSS = css`
    position: absolute;
    top: ${top + 'px'};
    left: ${left + 'px'};
    border-radius: '50%';
    cursor: 'pointer';
    visibility: ${visible ? 'visible' : 'hidden'};
    /* color: red; */
    img {
      width: ${size};
      max-width: ${size};
      min-width: ${size};
      height: ${size};
      max-height: ${size};
      min-height: ${size};
      /* border: red solid 1px; */
      /* background-color: white; */
    }
  `;
  console.log(stickerCSS);

  const addPoint = () => {
    // removeSticker(stikerKey);
    localUser.getStreamManager().stream.session.signal({
      to: [localUser],
      type: 'point-up',
    });
    setVisible(false);
  };

  return (
    <div id="pointSticker" css={stickerCSS}>
      <img
        alt="칭찬 스티커"
        src="../levels/yellow.png"
        onClick={addPoint}
        disabled={!visible}
      />
    </div>
  );
};

export default PointSticker;
