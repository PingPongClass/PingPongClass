import React, { useState } from 'react';
import './PointSticker.css';
// const img = require('../levels/yellow.png');
const stickerImg =
  'https://item.kakaocdn.net/do/d46eb5180f93b19ab3d2a7275827ac0682f3bd8c9735553d03f6f982e10ebe70';
// name: 한준수
// date: 2022/07/28
// desc: 클릭하면 포인트를 얻는 컴포넌트
// Todo: 호출 시 현재 유저의 개인 화면에 랜덤한 위치에 생성되고, 클릭한 유저에게 props로 전달받은 만큼의 포인트를 반환해준다.
const PointSticker = (props) => {
  const { stikerKey, top, left, removeSticker, localUser } = props;
  const [visible, setVisible] = useState(true);
  console.log(stikerKey);
  console.log(localUser);
  console.log(top);
  console.log(left);
  console.log(visible);
  const css = {
    top: top + 'px',
    left: left + 'px',
    visibility: visible ? 'visible' : 'hidden',
    disabled: !visible,
    cursor: 'pointer',
    borderRadius: '50%',
  };

  const addPoint = () => {
    // removeSticker(stikerKey);
    localUser.getStreamManager().stream.session.signal({
      to: [localUser],
      type: 'point-up',
    });
    setVisible(false);
  };

  return (
    <div id="pointSticker">
      <img
        alt="칭찬 스티커"
        // src="../reactions/heart.gif"
        // src={stickerImg}
        src="https://item.kakaocdn.net/do/d46eb5180f93b19ab3d2a7275827ac0682f3bd8c9735553d03f6f982e10ebe70"
        onClick={addPoint}
        style={css}
      />
    </div>
  );
};

export default PointSticker;
