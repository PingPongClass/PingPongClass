import { css } from '@emotion/react';
import defaultProfile from '@assets/images/defaultProfile.jpeg';

const Myinfo = () => {
  return (
    <div css={totalContainer}>
      <div className="infoContainer">
        <img src={defaultProfile} alt="" />
        <div className="nameContainer">
          <h2>원재호 님 어서오세요</h2>
        </div>
      </div>
      <div className="levelContainer">
        <h2 className="level">레벨</h2>
        <div className="stickerContainer">
          <div className="soFarSticker"></div>
          <div className="currentSticker"></div>
        </div>
      </div>
      <div className="rankingContainer">
        <div className="ranking">
          <div className="rankingInfo">
            <div>1위</div>
            <div>오석호</div>
            <div>99:99:99</div>
          </div>
          <button>펼치기</button>
        </div>
        <div className="rankingLow">
          <div className="rankingInfo">
            <div>2위</div>
            <div>원재호</div>
            <div>10:11:22</div>
          </div>
          <button>수정하기</button>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 2px 2px 15px -5px;
  box-sizing: border-box;

  .infoContainer {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }
  .infoContainer img {
    display: inline-block;
    height: 80px;
    border-radius: 50px;
  }
  .nameContainer {
    margin-left: 20px;
  }

  .levelContainer {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .rankingContainer {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ranking {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .rankingLow {
    width: 100%;
    height: 50px;
    background-color: #f2f2f2;
    border-top: #d0d0d0 1px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .rankingInfo {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .level {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
  }

  .stickerContainer {
    position: relative;
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background-color: #d1d1d1;
  }
  .soFarSticker {
    position: relative;
    width: 70%;
    height: 100%;
    background-color: #ffe790;
    border-radius: 20px;
    z-index: 1;
  }
  .currentSticker {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background-color: #fdb878;
    border-radius: 20px;
    z-index: 99;
  }
`;

export default Myinfo;
