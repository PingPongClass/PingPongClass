/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function StickerBar() {
  return (
    <div css={totalContainer}>
      <div className="infoContainer">사진, 이름, 현황</div>
      <div className="stickerContainer">스티커 프로그레스바</div>
      <div className="rankingContainer">스티커 랭킹바</div>
    </div>
  );
}

const totalContainer = css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 5px 5px 15px -5px;
  box-sizing: border-box;
  gap: 10px;

  .infoContainer {
    border: solid;
    width: 100%;
    height: 30%;
  }
  .stickerContainer {
    border: solid;
    width: 100%;
    height: 20%;
  }
  .rankingContainer {
    border: solid;
    width: 100%;
    height: 40%;
  }
`;

export default StickerBar;
