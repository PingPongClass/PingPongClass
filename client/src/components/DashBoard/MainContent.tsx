/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HeatMap from './HeatMap';

const MainContent = () => {
  return (
    <div css={totalContainer}>
      <div className="stickerBar">stickerBar</div>
      <div className="todaysClass">todaysClass</div>
      <div className="banner">
        <HeatMap />
      </div>
    </div>
  );
};

const totalContainer = css`
  height: 100%;
  width: 100%;
  background: #c8b97c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  gap: 30px;
  .banner {
    height: 20%;
    width: 100%;
  }

  .stickerBar {
    height: 30%;
    width: 100%;
    background: #ed8a2e;
  }

  .todaysClass {
    height: 40%;
    width: 100%;
    background: #ed8a2e;
  }
`;
export default MainContent;
